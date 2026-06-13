# ChatGPT 구어체 표현 파싱 및 Firestore 저장 스펙

## 1. 개요

ChatGPT와 주고받은 영어 구어체 AL 관련 대화 내역을 파싱하여, 기존 프로젝트의 Firestore `EnglishExpressions` 컬렉션에 저장한다.

> ⚠️ **컬렉션명 주의**: `admin.js`와 Cloud Function(`functions/index.js`)은 `EnglishExpressions`를 사용하고, `app.js`(프론트엔드)는 `expressions`에서 읽는다. 이 스크립트는 **`EnglishExpressions`**에 써야 한다 (Cloud Function 트리거 및 관리 패널과 일치).

### 목표
- ChatGPT 대화 내역(`sources/영어AL_20251029.txt`)에서 영어 표현을 추출
- 기존 스키마(primary, meaning, similar, example, japanese, chinese, spanish, vietnamese)에 맞게 변환
- 기존 데이터와 중복 없이 Firestore에 추가 업로드

---

## 2. 데이터 소스

### 파일
- **단일 파일**: `sources/영어AL_20251029.txt`
- **형태**: ChatGPT 대화 내보내기 (텍스트 형식)
- **구조**: `You said:` / `ChatGPT said:` 형태의 대화 블록

### 대화 구조 예시 (이상적)
```
You said:
[사용자 질문 또는 표현 요청]

ChatGPT said:
1. English explanation
   [영어 설명]
2. Korean meaning
   [한국어 뜻]
3. Similar English expressions
   [비슷한 영어 표현 목록]
4. Translations
   [일본어/중국어/스페인어/베트남어 번역]
```

### 실제 데이터 복잡성 (반드시 숙지)
실제 파일은 위 구조와 다른 케이스가 많다:

1. **후속 메시지**: `"응"`, `"신문기사체로도 자세히 알려줘"` 등 — 이전 대화의 연속. 새 표현이 아님.
2. **범위가 넓은 주제 질문**: `"사람은 절대로 변하지 않아. 관련 구어 표현 조사"`, `"주방용품 관련 표현"` — 단일 표현이 아닌 여러 표현을 다룸.
3. **짧고 모호한 입력**: `"스님"` — 표현으로 쓰기 애매함.
4. **ChatGPT가 이미 JSON을 생성**: 대화 마지막에 `english_expressions` + `korean` 스키마로 JSON 출력 — 기존 스키마와 다름.
5. **일부 응답에 번호 매기기 없음**: `"1. English explanation"` 형식이 아닌 경우도 있음.

### 추출 대상 범위
- 사용자가 표현을 물어본 항목 (예: "Get a life", "No cap" 등)
- ChatGPT가 구조화된 답변을 제공한 항목
- **일부 데이터라도 있으면 추출** (번역이 없어도 포함)

---

## 3. 데이터 스키마

### Firestore 컬렉션: `EnglishExpressions`

기존 스키마와 동일하게 맞춤:

```json
{
  "id": 1484,                          // 기존 MIN_START_ID = 1484부터 자동 증가
  "primary": "No cap",                 // 사용자가 질문한 영어 표현
  "meaning": "진짜로, 거짓말 안 하고", // 한국어 자연스러운 뜻
  "similar": [                         // 비슷한 영어 표현 (최대 5개)
    "For real",
    "Not gonna lie",
    "Deadass",
    "I'm being serious",
    "On God"
  ],
  "example": "A: \"That movie was amazing, no cap.\"\nB: \"For real?\"\nA: \"I'm exhausted, no cap.\"\nB: \"Same, I'm running on fumes.\"\nA: \"He makes six figures, no cap.\"\nB: \"That's wild, no cap.\"",  // ChatGPT 예시 대화를 A:/B: 형태로 저장
  "japanese": "マジで／ガチで",           // 한국어 뜻에서 유추하여 Vertex AI로 생성
  "chinese": "真的，不骗你 (zhēn de, bù piàn nǐ)",  // Vertex AI로 생성
  "spanish": "De verdad / Sin mentir",   // Vertex AI로 생성
  "vietnamese": "Thật sự đó / Không đùa đâu"  // Vertex AI로 생성
}
```

### 필드 매핑 규칙

| 필드 | ChatGPT 대화에서 추출 방법 |
|------|--------------------------|
| `id` | 자동 증가 (`fetchNextId()` 로직과 동일, 기존 데이터와 중복 없이) |
| `primary` | 사용자가 질문한 영어 표현 (상세 규칙은 4.3절 참조) |
| `meaning` | ChatGPT의 "Korean meaning" 섹션에서 자연스러운 한국어 뜻 추출 (상세 규칙은 4.4절 참조) |
| `similar` | ChatGPT의 "Similar English expressions" 섹션에서 표현 목록 추출 |
| `example` | ChatGPT의 예시 대화를 A:/B: 형태로 변환 (없으면 빈 값) |
| `japanese` | Vertex AI로 자동 생성 (한국어 뜻 + 영어 표현 기반) |
| `chinese` | Vertex AI로 자동 생성 (한국어 뜻 + 영어 표현 기반) |
| `spanish` | Vertex AI로 자동 생성 (한국어 뜻 + 영어 표현 기반) |
| `vietnamese` | Vertex AI로 자동 생성 (한국어 뜻 + 영어 표현 기반) |

### 번역 필드 생성 규칙
- `japanese`: 2개 표현을 ` / `로 구분, 한자 사용 시 훈가나(ふりが나) 포함
- `chinese`: 2개 표현을 ` / `로 구분, 병음(pinyin) 포함
- `spanish`: 2개 표현을 ` / `로 구분 (학습자 수준)
- `vietnamese`: 3개 표현을 ` / `로 구분 (OPIC IM2 수준)

---

## 4. 파싱 로직

### 4.1 텍스트 파싱

ChatGPT 대화 블록을 파싱하여 다음을 추출:

1. **대화 블록 분리**: `You said:` / `ChatGPT said:` 기준으로 블록 분리
2. **표현 추출**: 사용자가 입력한 영어 표현을 `primary`로 사용
3. **한국어 뜻 추출**: "Korean meaning" 또는 "2. Korean meaning" 섹션에서 자연스러운 뜻 추출
4. **비슷한 표현 추출**: "Similar English expressions" 또는 "3. Similar English expressions" 섹션에서 표현 목록 추출
5. **예시 대화 추출**: ChatGPT 응답에서 A:/B: 형태의 대화 추출

### 4.2 후속 메시지 및 주제 질문 처리

실제 데이터에는 단일 표현이 아닌 케이스가 많다:

| 케이스 | 예시 | 처리 방법 |
|--------|------|------------|
| 확인/동의 메시지 | `"응"` | **스킵** — 새 표현 없음 |
| 후속 요청 | `"신문기사체로도 자세히 알려줘"` | **스킵** — 이전 표현의 보충 |
| 범위가 넓은 주제 질문 | `"사람은 절대로 변하지 않아. 관련 구어 표현 조사"` | **스킵** — 단일 표현이 아님 |
| 짧고 모호한 입력 | `"스님"` | **스킵** — 표현으로서 불완전 |
| 직접적인 표현 질문 | `"Get a life"`, `"No cap"` | **추출** — primary로 저장 |
| 영어 표현 + 한국어 설명 | `"40,50대에 자연스럽게 생기는 권태기와 같은 정신적 변화, 갈등은?"` | ChatGPT 응답에서 핵심 표현 추출 시도. 추출 불가하면 스킵 |

### 4.3 `primary` 추출 규칙

- `primary`는 **ChatGPT 응답의 "1. English explanation" 섹션에서 핵심 영어 표현을 추출**
- 사용자 입력이 명확한 영어 표현인 경우 (예: "Get a life", "Nonchalant") → 입력 그대로 사용
- 사용자 입력이 한국어 질문인 경우 → ChatGPT 응답에서 핵심 영어 표현을 추출하여 `primary`로 사용
- `primary`가 **8단어를 초과**하는 경우 → 경고 로그 후 스킵 (기존 데이터 예: "I've been meaning to tell you" = 5단어)
- 기존 데이터에 이미 존재하는 유사 표현이 있는 경우 → 스킵 (중복 체크)
- ChatGPT가 생성한 JSON의 `primary` 필드를 참고용으로 활용할 수 있음

### 4.4 `meaning` 추출 규칙

- `"2. Korean meaning"` 섹션에서 첫 번째 자연스러운 한국어 뜻 추출
- 여러 뜻이 있는 경우: 가장 짧고 명확한 것을 선택
- 섹션 형식이 다른 경우 (예: `"2. Korean meaning (자연스럽게)"`, `"2. Korean meaning (자연스러운 말투)"`) → 동일하게 처리
- 한국어 뜻이 없는 경우: 빈 값으로 두고 나중에 Vertex AI로 채움

### 4.5 `similar` 추출 규칙

- `"3. Similar English expressions"` 섹션에서 표현 목록 추출
- `"3. Similar trendy expressions (used online / casually)"` 등 변형 형식도 처리
- **최대 5개**까지만 저장 (이상으면 잘라냄)
- 0개여도 저장 가능 — `meaning`이 있으면 `similar`는 빈 배열 `[]`로 저장

### 4.6 `example` 추출 규칙

- ChatGPT 응답에서 A:/B: 형태의 대화 블록 추출
- 한국어 번역이 포함된 경우 → **영어 부분만** 추출 (한국어 블록 제거)
- 대화가 없는 경우: 빈 문자열 `""`
- 대화 라인이 6줄을 초과하는 경우: 처음 6줄만 사용
- **6줄 미만인 경우**: 있는 그대로 저장 (`admin.js`의 `validatePayload()`는 6줄을 요구하지만, Admin SDK로 직접 쓰므로 검증 우회)
- ChatGPT가 생성한 JSON의 `english_expressions` 배열을 참고용으로 활용할 수 있음

### 4.7 엣지 케이스 처리

- **단어 하나만 질문한 경우** (예: "Nonchalant", "Bestie"): 해당 단어가 primary로 저장
- **문장으로 질문한 경우** (예: "I'm waiting to get on board"): 그대로 primary로 저장 (단, 8단어 이하)
- **번역이 없는 경우**: 해당 필드를 빈 값으로 두고 나중에 Vertex AI로 채움
- **similar 표현이 5개 미만인 경우**: 있는 것만 저장
- **예시 대화가 6줄 미만인 경우**: 있는 그대로 저장 (Admin SDK 직접 쓰기)
- **예시 대화가 없는 경우**: example 필드를 빈 문자열로 둠
- **이미 존재하는 표현과 유사한 경우**: Levenshtein 거리 기반 중복 체크
- **ChatGPT가 이미 JSON을 생성한 경우**: 해당 JSON은 **참고용으로만 활용** (스키마가 다름). 텍스트 응답에서 직접 추출하는 것이 우선.
- **시스템 프롬프트 블록** (첫 번째 `You said:` / `ChatGPT said:` — Mr. Jack 설정): **스킵** — 표현이 아님

---

## 5. 중복 제거

### 자동 제거 알고리즘
기존 `admin.js`의 Levenshtein 거리 기반 유사도 체크와 동일:

```javascript
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isFuzzySimilar(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 6 || Math.abs(a.length - b.length) > 10) return false;
  const distance = levenshtein(a, b);
  const score = 1 - distance / maxLen;
  return score >= 0.84;
}
```

- `normalizeText()`로 소문자 + 특수문자 제거 후 비교
- 기존 Firestore 데이터의 모든 `primary` 필드와 비교
- 유사도 84% 이상이면 중복으로 판단하여 스킵
- 새로운 표현만 Firestore에 추가
- **파싱된 표현끼리도** 중복 체크 (같은 대화에서 유사 표현이 나올 수 있음)

---

## 6. 실행 방식

### Node.js 스크립트
- `db/` 폴더에 스크립트 생성 (기존 패턴과 동일)
- Firebase Admin SDK 사용
- `serviceAccountKey.json` 또는 환경변수로 인증

### 배치 처리
- AI 번역 생성은 **10~20개씩 배치**로 병렬 처리
- Firestore 저장은 **500개씩 배치** (Firestore write batch 제한)
- 파싱은 한 번에 수행

### 처리 순서
1. `sources/영어AL_20251029.txt` 파일 읽기
2. ChatGPT 대화 블록 파싱 (4.1~4.7절 규칙 적용)
3. 파싱된 표현 필터링 (후속 메시지, 주제 질문, 시스템 프롬프트 제외)
4. 기존 Firestore `EnglishExpressions` 데이터 로드 (중복 체크용)
5. 파싱된 표현들에서 중복 제거 (텍스트 파싱 결과끼리 + 기존 데이터와)
6. `fetchNextId()` 호출하여 `startId` 획득 → N개 표현에 `startId`, `startId+1`, ... , `startId+N-1` 할당
7. 번역이 필요한 모든 항목에 Vertex AI 호출하여 번역 생성 (배치: 10~20개씩)
8. Firestore에 500개씩 배치 저장 (`admin.js`의 `setDoc` 패턴 사용)
9. `SystemMetadata/sync` 문서 업데이트

---

## 7. Firestore 저장 규칙

### 컬렉션
- **`EnglishExpressions`** (admin.js, Cloud Function과 일치)

### ID 생성
- 기존 `fetchNextId()` 로직과 동일
- `MIN_START_ID = 1484` (기존 데이터와 겹치지 않도록)
- 기존 컬렉션의 최대 ID보다 큰 값에서 시작
- 형식: `expression_${paddedId}` (4자리 zero-padding)

### 문서 구조
```javascript
{
  id: nextId,
  primary: "표현",
  meaning: "한국어 뜻",
  similar: ["유사표현1", "유사표현2", "유사표현3", "유사표현4", "유사표현5"],
  example: "A: ...\nB: ...",
  japanese: "日本語訳 / 日本語訳",
  chinese: "中文翻译 (pinyin) / 中文翻译",
  spanish: "traducción / traducción",
  vietnamese: "dịch thuật / dịch thuật / dịch thuật"
}
```

### 메타데이터 업데이트
- 저장 후 `SystemMetadata/sync` 문서 업데이트
- `totalCount` 필드에 **최신 ID 값** 저장 (기존 코드 패턴: `totalCount: nextId`)
- `lastUpdatedAt` 필드에 ISO 타임스탬프 저장

---

## 8. 검증 사항

### 파싱 검증
- [ ] 후속 메시지 ("응" 등)가 스킵됨
- [ ] 범위가 넓은 주제 질문이 스킵됨
- [ ] 각 표현에서 `primary`, `meaning` 필드가 올바르게 추출됨
- [ ] `similar` 필드가 5개 이내로 추출됨
- [ ] 예시 대화에서 한국어 번역이 제거되고 영어만 저장됨
- [ ] ChatGPT가 생성한 JSON은 참고용으로만 활용됨

### Firestore 업로드 검증
- [ ] `EnglishExpressions` 컬렉션에 저장됨
- [ ] ID가 기존 데이터와 겹치지 않음
- [ ] 중복 표현이 스킵됨
- [ ] `SystemMetadata/sync` 문서가 업데이트됨
- [ ] 전체 저장 후 Firestore에서 검색 가능

### 스키마 검증
- [ ] 모든 필드가 올바른 타입 (string, number, array)
- [ ] 번역 필드가 ` / ` 구분자로 분리됨
- [ ] `japanese` 필드에 한자 사용 시 훈가나 포함
- [ ] `chinese` 필드에 병음 포함

### 품질 검증
- [ ] primary가 너무 긴 항목은 경고 로그 후 스킵
- [ ] meaning이 빈 값인 항목은 Vertex AI로 자동 채움
- [ ] similar이 0개인 항목도 저장 허용 (meaning이 있으면)

---

## 9. 제약 조건

- **Firebase Admin SDK** 사용 (기존 패턴 유지)
- **Vertex AI**를 통한 번역 생성 (Firebase Vertex AI SDK, `location: "global"`)
- 기존 데이터 **읽기 전용** (추가만, 수정/삭제 없음)
- **Cloud Functions** 트리거와 별개의 독립 스크립트
- `EnglishExpressions` 컬렉션에만 쓰기 (Cloud Function 트리거 `onDocumentWritten`과 일치)
- `admin.js`의 `normalizeText()`, `levenshtein()`, `isFuzzySimilar()` 함수를 재사용
- `admin.js`의 `validatePayload()`는 관리 패널용 — 이 스크립트는 Admin SDK로 직접 쓰므로 검증 우회

### Vertex AI 실패 처리
- 번역 API 호출 실패 시: 해당 표현의 번역 필드를 빈 값으로 두고 나머지 표현 계속 처리
- 로그에 실패 항목 기록 후 다음 배치로 진행
- 전체 스크립트 종료 후 빈 번역 필드가 있는 항목 목록을 출력 (수동 보충용)

---

## 10. 참고: 실제 데이터 예시

### 유효한 추출 케이스
```
You said:
Get a life

ChatGPT said:
1. English explanation
The phrase "Get a life" is a blunt, sometimes teasing way...
2. Korean meaning (자연스럽게)
"야, 인생 좀 살아라."
3. Similar English expressions
"Do something with your life."
"You need a hobby."
"Go touch some grass."
4. Translations
Japanese: 人生（じんせい）をちゃんと生（い）きろよ。
Chinese: 赶紧过点自己的生活吧。
Spanish: Búscate una vida.
Vietnamese: Sống cho ra người đi.
```
→ 추출 결과: `primary: "Get a life"`, `meaning: "야, 인생 좀 살아라."`, `similar: ["Do something with your life.", ...]`

### 스킵해야 할 케이스
```
You said:
응

ChatGPT said:
Alright. Here's how people in New York...
```
→ 스킵: 후속 확인 메시지

```
You said:
사람은 절대로 변하지 않아. 관련 구어 표현 조사
```
→ 스킵: 범위가 넓은 주제 질문

```
You said:
스님
```
→ 스킵: 불완전한 입력

---

## 11. 참고: ChatGPT 생성 JSON 활용

대화 마지막에 ChatGPT가 생성한 JSON은 다른 스키마 (`english_expressions` 배열 + `korean` 필드)를 사용한다:

```json
{
  "primary": "Get a life",
  "english_expressions": ["Get a life", "Do something with your life", ...],
  "korean": "인생 좀 살아라, 쓸데없는 짓 그만해라"
}
```

이 JSON은 **참고용으로만 활용**한다:
- `primary` 필드를 추출 결과와 비교하여 검증
- `english_expressions` 배열을 `similar` 필드의 후보로 활용
- `korean` 필드를 `meaning` 필드의 후보로 활용
- **텍스트 파싱에서 누락된 표현이 JSON에만 있는 경우**: JSON에서 추출하지 않음 (텍스트 응답이 우선)
- **최종 저장은 텍스트 응답에서 직접 추출한 데이터**를 우선

---

## 12. 향후 확장 가능 항목

- 다른 ChatGPT 내보내기 파일도 동일 스크립트로 처리 가능
- `opical_ready.json`, `importable.json` 등 다른 소스 파일도 추가 가능
- 번역 자동 생성 스텝은 독립적으로 분리 가능
- ChatGPT가 생성한 JSON (`english_expressions` 스키마)과 기존 스키마 간 자동 매핑
