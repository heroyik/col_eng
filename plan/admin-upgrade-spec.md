# Admin.html 최신 Gemini 모델 지원 스펙

## 1. 개요

admin.html (Colloquial English Intake)의 LLM 설정을 최신 Gemini 모델에 맞게 업데이트하고, 상태 박스 스크롤 개선, 기타 비기능적 개선을 수행한다.

### 핵심 이슈
- **모델 404 에러**: 현재 기본 선택된 `gemini-3-pro-preview` 모델 ID가 Vertex AI에서 찾을 수 없음
  - 에러: `Publisher Model projects/engdb-11b7f/locations/global/publishers/google/models/gemini-3-pro-preview was not found`
- **상태 박스 스크롤 불가**: 로그가 누적되지만 스크롤이 작동하지 않음 (CSS에 overflow 미설정)
- **종료된 모델 포함**: 2026년 6월 1일에 종료된 gemini-2.0-flash/exp 모델이 목록에 남아있음

---

## 2. 변경 대상 파일

| 파일 | 변경 내용 |
|------|----------|
| `admin.html` | 모델 select 옵션 업데이트, 버전 캐시버스팅 업데이트 |
| `admin.js` | Vertex AI 설정 개선, 상태 박스 스크롤 로직, 타임스탬프, SDK 버전 업데이트 |
| `admin.css` | 상태 박스 스크롤 CSS 추가 |

---

## 3. 상세 변경 사항

### 3.1 모델 목록 업데이트 (`admin.html`)

#### 제거할 모델
- `gemini-2.0-flash` (2026-06-01 종료)
- `gemini-2.0-flash-exp` (2026-06-01 종료)

#### 유지할 모델
- `gemini-2.5-flash-lite`

#### 신규 추가 모델
| 모델 ID | 상태 | 비고 |
|---------|------|------|
| `gemini-3.5-flash` | Stable | **기본 선택** |
| `gemini-3-flash-preview` | Preview | 최신 flash preview |
| `gemini-3.1-pro-preview` | Preview | 최신 pro preview |
| `gemini-3.1-flash-lite` | Stable | 최신 flash-lite |
| `gemini-2.5-pro` | Stable | pro stable |
| `gemini-2.5-flash` | Stable | flash stable |

#### 최종 모델 드롭다운 (순서)
1. `gemini-3.5-flash` (기본 선택)
2. `gemini-3-flash-preview`
3. `gemini-3.1-pro-preview`
4. `gemini-3.1-flash-lite`
5. `gemini-2.5-pro`
6. `gemini-2.5-flash`
7. `gemini-2.5-flash-lite`

### 3.2 SDK 버전 업데이트 (`admin.js`)

> **⚠️ 3.14에서 `HarmCategory`, `HarmBlockThreshold` import가 제거됨. 아래 예시의 import문은 최종본과 다름.**

현재: `firebase-vertexai 11.10.0`
변경: **v12.14.0** (2026-05-28 릴리즈)

#### 핵심 변경: Firebase Vertex AI → Firebase AI Logic 리브랜딩
- v11.8.0 (2025-05): `@firebase/ai` 도입
- **v12.0.0 (2025-07): `getVertexAI()` 등 모든 구 API 별칭 제거**
- 현재 코드의 `getVertexAI()`는 v12+에서 사용 불가

```javascript
// 현재 (v11.10.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getVertexAI, getGenerativeModel, HarmCategory, HarmBlockThreshold } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-vertexai.js";
const vertexAI = getVertexAI(app, { location: "global" });

// 변경 (v12.14.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAI, getGenerativeModel, HarmCategory, HarmBlockThreshold } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-ai.js";
const ai = getAI(app, { location: "global" });
```

#### `responseMimeType` 속성명 변경
현재 코드에서 `response_mime_type` (snake_case)를 사용 중이나, Firebase JS SDK는 **`responseMimeType`** (camelCase)를 사용한다.

```javascript
// 현재 (snake_case - Google API wire format, SDK에서 무시될 수 있음)
generationConfig: {
  response_mime_type: "application/json"
}

// 변경 (camelCase - Firebase JS SDK 올바른 속성명)
generationConfig: {
  responseMimeType: "application/json",
  responseSchema: {  // JSON 스키마 정의 (선택사항이 권장)
    type: "OBJECT",
    properties: {
      primary: { type: "STRING" },
      meaning: { type: "STRING" },
      similar: { type: "ARRAY", items: { type: "STRING" } },
      example: { type: "STRING" },
      japanese: { type: "STRING" },
      chinese: { type: "STRING" },
      spanish: { type: "STRING" },
      vietnamese: { type: "STRING" }
    },
    required: ["primary", "meaning", "similar", "example", "japanese", "chinese", "spanish", "vietnamese"]
  }
}
```

> **참고**: `responseSchema` 미사용 시에도 `responseMimeType: "application/json"`은 모델에게 JSON 출력을 지시하지만, 스키마 검증은 수행하지 않는다. 현재 프롬프트 기반 JSON 생성 방식을 유지하려면 `responseSchema` 없이 `responseMimeType`만 설정해도 됨.

### 3.3 상태 박스 스크롤 개선

#### CSS 변경 (`admin.css`)
```css
/* 현재 상태 */
.status-box {
  min-height: 140px;
  /* overflow 없음 → 스크롤 불가 */
}

/* 변경 */
.status-box {
  min-height: 80px;
  max-height: 240px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
```

#### JS 변경 (`admin.js`)
스마트 자동 스크롤 구현:
```javascript
function appendStatusLine(message) {
  const line = document.createElement("div");
  line.className = "status-line";
  line.textContent = message;
  statusBox.appendChild(line);
  
  // 스마트 자동 스크롤: 사용자가 하단에 있을 때만 자동 스크롤
  const isAtBottom = statusBox.scrollHeight - statusBox.scrollTop - statusBox.clientHeight < 30;
  if (isAtBottom) {
    statusBox.scrollTop = statusBox.scrollHeight;
  }
}
```

### 3.4 실행 로그 타임스탬프 추가 (`admin.js`)

```javascript
function appendStatusLine(message) {
  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  
  const line = document.createElement("div");
  line.className = "status-line";
  line.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${escapeHtml(message)}`;
  statusBox.appendChild(line);
  
  // 스마트 자동 스크롤
  const isAtBottom = statusBox.scrollHeight - statusBox.scrollTop - statusBox.clientHeight < 30;
  if (isAtBottom) {
    statusBox.scrollTop = statusBox.scrollHeight;
  }
}
```

CSS 타임스탬프 스타일:
```css
.status-line .timestamp {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-right: 0.5rem;
  opacity: 0.7;
}
```

### 3.5 Vertex AI 설정 개선 (`admin.js`)

#### `getVertexAI` 위치 변경
현재: `getVertexAI(app, { location: "global" })`
변경 불필요 - `global`이 권장 위치임.

#### `response_mime_type` 지원 확인
Firebase Vertex AI SDK에서 `response_mime_type: "application/json"`을 지원하는지 확인 필요.
- 지원 시: 변경 불필요
- 미지원 시: `responseSchema`를 사용한 JSON 응답 파싱 방식으로 변경

#### 에러 핸들링 개선

> **⚠️ safetySettings는 SDK v12.14.0 호환성 문제로 제거됨 (→ 3.13 참조). 아래는 변경 전 예시.**

```javascript
async function callVertexAI({ model, temperature, prompt }) {
  console.log(`[Vertex AI] Starting generation for model: ${model}`);
  appendStatusLine(`Calling ${model}...`);
  
  try {
    const generativeModel = getGenerativeModel(vertexAI, {
      model,
      generationConfig: {
        temperature,
        maxOutputTokens: 4096,
        // response_mime_type: "application/json"  // 지원 여부 확인 필요
      },
      safetySettings: [
        { category: HarmCategory.HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ]
    });

    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from model.");
    }

    const text = response.text();
    appendStatusLine(`Response received (${text.length} chars)`);
    return text;
  } catch (err) {
    appendStatusLine(`Error: ${err.message}`);
    throw err;
  }
}
```

### 3.6 미사용 코드 정리 (`admin.js`)

#### 제거 대상
```javascript
// 제거: deprecated된 callGemini() 함수 (API key 방식 미사용)
async function callGemini({ apiKey, model, temperature, prompt }) {
  // ... 전체 함수 삭제
}
```

#### 주석 처리된 코드 정리
```javascript
// 제거: 주석 처리된 getApiKey() 함수
// function getApiKey() {
//   ...
// }

// 제거: 주석 처리된 STORAGE_KEY 상수
// const STORAGE_KEY = "GEMINI_API_KEY"; // DEPRECATED
```

### 3.7 HTML 구조 수정 (`admin.html`)

#### 중복 DOM element 제거
현재 `saveMessage`가 두 번 정의되어 있음:
```html
<!-- 중복 1 -->
<p id="saveMessage" class="status-text"></p>
</section>

<!-- 중복 2 -->
<p id="saveMessage" class="status-text"></p>
```

변경: 첫 번째 `saveMessage`만 유지, 두 번째 제거.

#### HTML 구조 개선
```html
<section class="panel-card output-card">
  <h2>4) Generated JSON</h2>
  <textarea
    id="jsonOutput"
    rows="14"
    placeholder="Generated JSON will appear here"
  ></textarea>
  <div class="button-row">
    <button id="validateBtn" class="btn btn-ghost">Validate JSON</button>
    <button id="saveBtn" class="btn btn-accent" disabled>
      Save to Firestore
    </button>
  </div>
  <p id="saveMessage" class="status-text"></p>
</section>
```

### 3.8 베트남어 표현 수 변경 (3 → 2)

모든 번역 필드가 동일하게 2개씩 생성되도록 통일:

- **프롬프트**: `vietnamese: EXACTLY 2 expressions` (3 → 2)
- **검증 (`validatePayload`)**: `vietnamese count: 2` (3 → 2)
- **자동수정 (`sanitizePayload`)**: `vietnamese count: 2` (3 → 2)
- **CRITICAL self-check**: `vietnamese has exactly 2 parts` (3 → 2)

> **참고**: sanitizePayload는 비슷한 유사 항목의 non-array 타입이나 예시의 array 타입을 처리하지 않음. 이 엣지 케이스는 validatePayload에서 처리됨.

### 3.9 프롬프트 강화 (`buildGenerationPrompt`)

모델이 규칙을 따르도록 더 명확하고 강력한 프롬프트로 교체:

- 각 필드별로 **"EXACTLY N"** 명시 (유사: 5, 예시: 6, 일본어/중국어/스페인어/베트남어: 각 2개)
- 각 필드의 **정확한 형식 예시** 포함 (A:/B: 형식, ` / ` 구분자 등)
- **CRITICAL self-check** 지시문 추가: 출력 전 반드시 검증

### 3.10 자동수정 기능 (`sanitizePayload`)

검증 실패 시 자동으로 수정하는 `sanitizePayload()` 함수 추가:

- **similar**: 6개 이상이면 5개로 잘라냄 (빈 문자열 패딩 ❌)
- **example**: 대화 형식이 아닌 라인 제거, 6개 초과 시 잘라냄 (가짜 데이터 삽입 ❌)
- **번역 필드**: 구분자(` / `) 수정, 정확한 개수로 잘라냄 (2개 또는 3개)

### 3.11 UI 카드 병합 + 섹션 번호 재설정 (`admin.html`)

Admin Access 카드와 LLM Settings 카드를 하나로 병합하고, 섹션 번호를 재설정:

- 0) Admin & LLM Settings (병합)
- 1) Primary Expression
- 2) Status
- 3) Generated JSON

```html
<!-- 변경 전: 두 개의 별도 카드 -->
<div class="panel-card auth-card">
  <h2>0) Admin Access</h2>
  ...
</div>
<div class="panel-card">
  <h2>2) LLM Settings</h2>
  ...
</div>

<!-- 변경 후: 하나의 카드 -->
<div class="panel-card auth-card">
  <h2>0) Admin & LLM Settings</h2>
  <p class="hint">Sign in with Google, then pick a model.</p>
  <!-- 인증 버튼 + 모델 선택 + 온도 조절 포함 -->
</div>
```

### 3.12 에러 라우팅 개선 (`admin.html` + `admin.js`)

Primary Expression 카드에 `resultMessage` 요소를 추가하여, 에러가 아닌 처리 결과를 표시:

- **비에러 메시지** (성공, 경고) → Primary Expression 카드의 `resultMessage`
- **에러 메시지** → Status 카드의 `statusBox` (타임스탬프 포함)

```javascript
// handleCheck, handleGenerate에서 결과를 라우팅
setStatusMessage(resultMessage, "No similar expression found.", "success");  // Primary 카드
appendStatusLine(`Error: ${error.message}`);  // Status 카드
```

### 3.13 SafetySettings 제거 (`admin.js`)

Firebase AI Logic SDK v12.14.0에서 `HarmCategory` enum 값이 변경되어 기존 코드가 호환되지 않음:

- **에러**: `element predicate failed: $.category in (HARM_CATEGORY_HATE_SPEECH, ...)`
- **해결**: `safetySettings` 전체 제거 (기본값으로 동작)
- **영향 없음**: 원래 `BLOCK_NONE` 설정이 가장 관대한 값이었으므로 차이 없음

```javascript
// 변경 전
const generativeModel = getGenerativeModel(ai, {
  model,
  generationConfig: { temperature, maxOutputTokens: 4096, responseMimeType: "application/json" },
  safetySettings: [
    { category: HarmCategory.HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    ...
  ]
});

// 변경 후
const generativeModel = getGenerativeModel(ai, {
  model,
  generationConfig: { temperature, maxOutputTokens: 4096, responseMimeType: "application/json" }
});
```

### 3.14 미사용 Import 정리 (`admin.js`)

`safetySettings` 제거에 따라 `HarmCategory`, `HarmBlockThreshold` import도 함께 제거:

```javascript
// 변경 전
import { getAI, getGenerativeModel, HarmCategory, HarmBlockThreshold } from "...firebase-ai.js";

// 변경 후
import { getAI, getGenerativeModel } from "...firebase-ai.js";
```

### 3.15 window.onerror 제거 (`admin.html`)

전역 에러 핸들러 스크립트 블록 제거. 에러는 이제 `appendStatusLine()`을 통해 Status 카드에 표시됨.

### 3.16 Status 카드 풀와이드 (`admin.html` + `admin.css`)

Status 카드를 `panel-grid` 밖으로 이동하여 Generated JSON 카드와 동일한 풀와이드로 표시:

- `panel-grid` 밖의 별도 `<section>`으로 이동
- Status box `max-height: 240px` → `300px`으로 증가

### 3.17 버전 업데이트

```javascript
// admin.js
const APP_VERSION = "20260607.02";
```

```html
<!-- admin.html -->
<link rel="stylesheet" href="admin.css?v=20260607.01" />
<script src="env_config.js?v=20260607.01"></script>
<script type="module" src="admin.js?v=20260607.01"></script>
```

---

## 4. 구현 순서

1. **SDK 버전 확인 및 업데이트**
   - Firebase JS SDK 최신 버전 확인
   - `response_mime_type: "application/json"` 지원 여부 확인
   - 필요 시 `responseSchema` 방식으로 변경

2. **모델 목록 업데이트** (`admin.html`)
   - 종료된 모델 제거
   - 신규 모델 추가
   - 기본 모델을 `gemini-3.5-flash`로 변경

3. **상태 박스 스크롤 개선** (`admin.css` + `admin.js`)
   - CSS에 `max-height`, `overflow-y: auto` 추가
   - JS에 스마트 자동 스크롤 로직 구현

4. **타임스탬프 추가** (`admin.js` + `admin.css`)
   - `appendStatusLine()`에 타임스탬프 포맷 추가
   - CSS 스타일 추가

5. **미사용 코드 정리** (`admin.js`)
   - `callGemini()` 함수 삭제
   - 주석 처리된 코드 삭제

6. **HTML 구조 수정** (`admin.html`)
   - 중복 `saveMessage` 제거

7. **버전 업데이트** (`admin.js` + `admin.html`)

---

## 5. 검증 사항

- [ ] admin.html에서 모델 드롭다운에 새 모델이 표시됨
- [ ] `gemini-3.5-flash`가 기본 선택됨
- [ ] 모든 모델에서 Vertex AI 호출이 정상 작동함
- [ ] 상태 박스에서 새 로그가 추가될 때 자동 스크롤됨
- [ ] 사용자가 상태 박스를 위로 스크롤하면 자동 스크롤이 중단됨
- [ ] 각 로그에 `[HH:MM:SS]` 타임스탬프가 표시됨
- [ ] 미사용 코드가 정리됨
- [ ] HTML 구조 오류가 수정됨
- [ ] 버전 캐시버스팅이 적용됨
- [ ] Vietnamese가 2개로 생성됨 (3 아님)
- [ ] 프롬프트가 all 필드에 "EXACTLY N" 규칙을 명시
- [ ] sanitizePayload가 similar 6개 이상을 5개로 잘라냄
- [ ] sanitizePayload가 example 비대화 라인을 제거함
- [ ] Admin Access + LLM Settings 카드가 하나로 병합됨
- [ ] 비에러 결과가 Primary Expression 카드에 표시됨
- [ ] 에러만 Status 카드에 표시됨
- [ ] safetySettings 제거로 SDK 호환성 확보
- [ ] HarmCategory/HarmBlockThreshold 미사용 import 제거됨
- [ ] window.onerror 글로벌 에러 핸들러 제거됨
- [ ] Status 카드가 풀와이드로 표시됨

---

## 6. 제약 조건

- 기존 Firebase 프로젝트 설정 (engdb-11b7f) 유지
- Vertex AI API 활성화 상태 유지
- `location: "global"` 유지 (최신 모델 지원)
- 기존 기능 (인증, 생성, 검증, 저장) 유지

---

## 7. 참고 자료

- [Firebase AI Logic - Supported Models](https://firebase.google.com/docs/ai-logic/models)
- [Firebase Vertex AI SDK](https://firebase.google.com/docs/vertex-ai)
- 변경 후 admin.js 버전: `20260607.02`
- 변경 후 Firebase SDK: `12.14.0`
