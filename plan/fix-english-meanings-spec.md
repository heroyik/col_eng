# Fix English Meanings — Spec

## 1. Objective

Firestore의 `EnglishExpressions` 컬렉션에서 **meaning 필드가 영어로 저장된 레코드를 찾아서, 한국어 구어체 번역으로 교체**한다.

- **대상 컬렉션**: `EnglishExpressions`
- **대상 필드**: `meaning` (string)
- **변환 결과**: 자연스러운 한국어 구어체 번역 (기존 데이터 톤과 일관성 유지)

---

## 2. Detection Rule — 영어 meaning 판별 기준

**기준: meaning에 한글 문자(`\uAC00`–`\uD7AF`)가 한 글자도 없으면 영어로 판단한다.**

| 예시 | 판단 |
|------|------|
| `"rush hour"` | ❌ 영어 (한글 0자) |
| `"school life"` | ❌ 영어 (한글 0자) |
| `"출퇴근 시간"` | ✅ 한국어 |
| `"학교를 다니다 (attend school)"` | ✅ 한국어 (한글 포함) |
| `""` (빈 값) | ⏭️ 스킵 |
| `undefined` / `null` | ⏭️ 스킵 |

- JavaScript 정규식: `/[\uAC00-\uD7AF]/.test(meaning)` → `false`이면 영어
- 의미적으로 판단하지 않음 (단순 규칙 기반)
- 한글이 한 글자라도 있으면 무조건 한국어로 간주

---

## 3. Data Analysis Results

### 현재 상태

| 데이터 소스 | 레코드 수 | 영어 meaning 수 |
|-------------|-----------|-----------------|
| `initial_data.json` (정적 번들) | 1,488 | **0** |
| `db/2026-01-13_prefixed.json` (백업) | 1,483 | **0** |
| Firestore (admin 패널로 추가된 레코드, ID ≥ 1484) | 미확인 | **미확인** |

> **핵심 발견**: 현재 로컬 데이터에서는 영어 meaning이 0건이다.\admin 패널을 통해 새로 추가된 레코드(ID 1484 이상)에 영어 meaning이 있을 수 있으므로, Firestore에서 직접 확인이 필요하다.

---

## 4. Architecture — 구현 방식

### 4.1 스크립트 유형: Node.js CLI

- `db/` 폴더에 Node.js 스크립트 생성
- `firebase-admin` SDK 사용 (기존 스크립트 패턴 참고: `db/update_chinese_field.js`)
- 서비스 계정 파일 경로: `../engdb-11b7f-firebase-adminsdk-fbsvc-85239282ab.json`

### 4.2 변환 방식: Gemini AI

- **Google Generative AI (Gemini)**를 사용하여 영어 meaning → 한국어 구어체 번역 생성
- 기존 `admin.js`의 `buildGenerationPrompt`와 동일한 톤 유지
- 번역 프롬프트: primary expression과 영어 meaning을 함께 넘겨서 문맥에 맞는 한국어 구어체 생성

### 4.3 처리 흐름

```
Step 1: Firestore에서 전체 레코드를 배치별로 읽기
Step 2: 규칙 기반으로 영어 meaning 레코드 필터링
Step 3: 필터링된 레코드를 배치 단위로 Gemini AI에 전송
Step 4: 번역 결과를 JSON 파일로 저장 (Firestore 직접 수정 X)
Step 5: 확인 후 별도 업로드 스크립트로 Firestore 업데이트
```

### 4.4 백업

- 변환 작업 실행 전, 대상 레코드(영어 meaning)를 JSON 파일로 백업
- 파일명 예시: `db/backup_english_meanings_YYYYMMDD.json`
- 전체 Firestore 레코드 백업은 `download_data.mjs`로 별도 실행 가능

---

## 5. Detailed Implementation Plan

### 5.1 Step 1 — 영어 meaning 레코드 스캔

```javascript
// db/scan_english_meanings.js
// 1. Firestore에서 전체 레코드 읽기 (배치 단위, limit 500)
// 2. meaning 필드가 존재하고, 한글 문자가 0개인 레코드 필터링
// 3. 필터링 결과를 JSON 파일로 저장
// 4. 콘솔에 통계 출력 (전체 레코드 수, 영어 meaning 수)
```

**출력 파일**: `db/english_meanings_to_fix.json`
```json
[
  { "docId": "expression_1500", "id": 1500, "primary": "rush hour", "meaning": "rush hour", "similar": [...], ... },
  ...
]
```

### 5.2 Step 2 — Gemini AI로 한국어 구어체 번역 생성

```javascript
// db/fix_english_meanings.js
// 1. english_meanings_to_fix.json 읽기
// 2. 배치 단위로 Gemini AI 호출 (배치 크기: 10개씩)
//    - 프롬프트: primary expression + 영어 meaning → 한국어 구어체 번역
//    - 모델: gemini-2.5-flash (안정적, 비용 효율적)
//    - temperature: 0.4 (기존 설정 유지)
// 3. 번역 결과를 JSON 파일로 저장
// 4. 진행 상황 출력 (배치별)
```

**Gemini 번역 프롬프트 (안):**
```
Translate the following English meaning into natural Korean colloquial language.
The expression is used in everyday conversation (OPIC AL/IM level).

Primary: "{primary}"
English meaning: "{english_meaning}"

Output ONLY the Korean translation, no explanation.
```

### 5.3 Step 3 — 결과 검증 및 백업

- 번역 결과가 한글로 변환되었는지 검증
- 원본 영어 meaning 백업 파일 생성
- 변환 결과를 `db/fixed_meanings_YYYYMMDD.json`으로 저장

### 5.4 Step 4 — Firestore 업로드 (별도 실행)

```javascript
// db/upload_fixed_meanings.js
// 1. fixed_meanings_YYYYMMDD.json 읽기
// 2. 배치 단위로 Firestore update (batch size: 400, 기존 패턴 따름)
// 3. 각 레코드의 meaning 필드만 업데이트
// 4. 진행 상황 및 완료 출력
```

**Firestore 업데이트 쿼리:**
```javascript
batch.update(docRef, { meaning: newMeaning });
```

---

## 6. AI 호출 상세

### 6.1 모델 선택

| 모델 | 타입 | 용도 |
|------|------|------|
| `gemini-2.5-flash` | Stable | ✅ 기본 사용 (비용 효율적) |
| `gemini-3.5-flash` | Stable | 대안 (더 최신) |

### 6.2 호출 방식

- **firebase-admin** SDK의 Vertex AI API 사용
- 또는 `@google/generative-ai` 패키지 사용 (기존 스크립트 패턴에 따라 결정)
- **배치 크기**: 한 번에 10개 레코드씩 처리
- **Rate limit 대응**: 배치 간 1초 대기 (`sleep(1000)`)
- **에러 핸들링**: API 실패 시 최대 3회 재시도, 실패 시 로그 후 다음 배치로 진행

### 6.3 프롬프트 설계

- **목적**: 영어 meaning을 자연스러운 한국어 구어체로 변환
- **톤**: 기존 admin.js의 "Natural Korean colloquial translation" 톤 유지
- **컨텍스트**: primary expression도 함께 전달하여 문맥 파악
- **출력**: 한국어 번역 텍스트만 출력 (JSON 형식 불필요)

---

## 7. 파일 구조

```
db/
├── scan_english_meanings.js          # Step 1: 영어 meaning 스캔
├── fix_english_meanings.js           # Step 2: Gemini AI 번역
├── upload_fixed_meanings.js          # Step 4: Firestore 업로드
├── english_meanings_to_fix.json      # Step 1 출력: 영어 meaning 레코드
├── backup_english_meanings_*.json    # 백업: 원본 영어 meaning
└── fixed_meanings_*.json             # Step 3 출력: 번역 완료 결과
```

---

## 8. Edge Cases & 처리 방식

| 상황 | 처리 |
|------|------|
| `meaning`이 `undefined` / `null` / `""` | 스킵 (변환 불필요) |
| `meaning`에 한글 1자 이상 포함 | 스킵 (이미 한국어) |
| Gemini API 호출 실패 | 최대 3회 재시도, 실패 시 로그 후 건너뜀 |
| Gemini가 영어로 번역 결과 반환 | 검증 후 재시도 또는 수동 확인 필요 |
| 의미적으로 영어인데 한글이 섞인 경우 | 규칙상 스킵 (한글 포함 = 한국어) |
| 번역 결과가 기존 데이터 톤과 다를 수 있음 | 테스트 단계에서 확인 후 전체 실행 |

---

## 9. 검증 방법

1. **Step 1 스캔 결과 확인**: `english_meanings_to_fix.json`에서 실제 영어 meaning인지 육안 확인
2. **Step 2 테스트**: 처음 5~10개 레코드만 번역하여 결과 품질 확인
3. **Step 3 검증**: 번역 결과가 한글인지, 의미가 적절한지 확인
4. **Step 4 업로드 전**: `DRY_RUN = true`로 먼저 테스트

---

## 10. 실행 순서

```
1. node db/scan_english_meanings.js          → 영어 meaning 레코드 스캔
2. [사용자가 결과 확인]                         → english_meanings_to_fix.json 검토
3. node db/fix_english_meanings.js           → Gemini AI로 번역 (테스트 모드)
4. [사용자가 번역 결과 확인]                     → fixed_meanings.json 검토
5. node db/upload_fixed_meanings.js          → Firestore 업로드
6. node download_data.mjs                    → initial_data.json 업데이트
```

---

## 11. 주의사항

- Firestore 레코드를 직접 수정하는 작업이므로 **백업 필수**
- Gemini API 비용이 발생할 수 있음 (배치 크기와 레코드 수에 따라 다름)
- 기존 데이터와 톤이 일관되도록 프롬프트에 주의
- 업로드 후 `download_data.mjs`로 initial_data.json을 업데이트해야 정적 번들 동기화
