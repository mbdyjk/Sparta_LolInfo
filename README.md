# Sparta_LolInfo

Sparta_LolInfo는 `Riot Games API`와 `Data Dragon`을 활용하여 각종 데이터를 표시하는 웹 애플리케이션입니다.

---

## 🚀 배포 링크

---

## 📁 파일 구조

```
my-riot-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 글로벌 레이아웃
│   │   ├── page.tsx          # 홈 페이지
│   │   ├── champions/        # 챔피언 목록
│   │   ├── items/            # 아이템 목록
│   │   ├── rotation/         # 챔피언 로테이션
│   │   ├── api/              # Route Handlers
│   ├── components/           # 재사용 가능한 컴포넌트
│   ├── styles/               # 전역 스타일
│   ├── types/                # TypeScript 타입 정의
│   ├── utils/                # 유틸리티 함수
│   └── public/               # 정적 파일
├── .env.local                # 환경 변수
├── package.json              # 패키지 정보
└── next.config.js            # Next.js 설정
```

---

## 💻 프로젝트 실행

1️⃣ 클론 및 이동

```bash
git clone <repository-url>
cd <project-directory>
```

2️⃣ 필요한 패키지 설치

```bash
pnpm install
```

3️⃣ 개발 서버 실행

```bash
pnpm run dev
```

---

## 🧩 기술 스택

**Next.js**: `React` 기반으로 SSR, SSG를 지원하는 프레임워크

**Tanstack Query**: 클라이언트 상태 관리

**Tailwind CSS**: 반응형 UI 개발

---

## 📌 필수 기능

### 1. 프로젝트 셋업

- `Next.js`, `TypeScript`로 프로젝트 생성
- `src` 디렉토리와 `@/*` 별칭을 설정하여 구조 설정

### 2. 데이터 타입 정의 및 fetching

- `types` 디렉토리에 타입들 정의
- **Server Actions**를 활용해 데이터 페칭을 **서버 컴포넌트** 내에서 직접 처리
- **Route Handlers**는 CSR에서만 사용하는 `/api/rotation` 엔드포인트 하나만 유지
- **fetch**를 사용해 외부 API 호출 및 에러 처리 수행

### 3. Tanstack Query

- 클라이언트 사이드에서 API 호출시 **Tanstack Query** 사용

  ex) `useQuery`, `useMutation`

### 4. 렌더링 방식을 각각 다르게 하여 페이지 구현

- 챔피언 목록 페이지(`/champions`): **ISR** 방식으로 구현
- 챔피언 상세 페이지(`/champions/[id]`): **SSR** 방식으로 구현, 동적 메타데이터 생성
- 챔피언 로테이션 페이지(`/rotation`): **CSR** 방식으로 구현
- 아이템 목록 페이지(`/items`): **SSG** 방식으로 구현

### 5. 로딩 및 에러 핸들링 고도화

- **React Suspense**와 `loading.tsx`를 사용하여 서버 컴포넌트의 로딩 상태 관리
- **Streaming SSR**을 사용해 먼저 로딩된 컴포넌트부터 순차적 렌더링
- **로딩 시간 시뮬레이션**
  - 의도적으로 API 호출에 지연을 추가(`setTimeout`, 서버에서 딜레이 옵션)
- **에러 핸들링 강화**
  - `error.tsx`파일을 생성해 각 경로에서 발생하는 에러를 사용자 친화적인 메세지로 처리
  - `global-error.tsx`를 생성해 전역 에러 처리
  - 에러 컴포넌트는 **클라이언트 컴포넌트**로 작성
  - `useRouter`와 `startTransition`을 활용해 에러 발생시 **리셋 기능** 이나 **재시도 기능**을 구현

### 6. 반응형 디자인 구현

- **Tailwind CSS**의 유틸리티 클래스 활용
- 모바일 환경에서도 사용하기 편리한 인터페이스 제공

### 7. 다크 모드 기능 구현

- **Header** 컴포넌트에 다크 모드 기능 추가
- `app/layout.tsx`에서 **Header** 컴포넌트를 포함하여, 애플리케이션 전체에서 다크 모드 지원
- 다크모드 **토글 스위치** 제공

### 8. 유틸리티 타입 활용

ex) `Partial`, `Pick`, `Omit` 등

---

## 🚀 배포

### 1. Vercel로 React 앱 배포

- Vercel에 프로젝트 업로드
- 환경 변수 안전하게 관리하도록 설정

---

✨ Tailwind CSS 클래스 정렬 순서 규칙

📌 정렬 순서

1️⃣ 레이아웃 관련 (display, flex/grid 정렬) → flex, grid, hidden 등  
2️⃣ 정렬 관련 (justify, align) → justify-, items- 등  
3️⃣ 여백 관련 (padding, margin, gap) → p-, m-, gap- 등  
4️⃣ 크기 관련 (width, height) → w-, h-, max-w-_ 등  
5️⃣ 스타일 관련 (배경, 테두리, 그림자) → bg-, border-, shadow- 등  
6️⃣ 텍스트 관련 (색상, 크기, 정렬) → text-, font-, leading-_ 등  
7️⃣ 기타 효과 (opacity, transition, animation) → opacity-, transition-\* 등

📌 예제

```jsx
<header className="flex justify-between items-center w-full p-4 bg-white border-b border-gray-200 shadow-sm text-red-600">
```

---

## 🛠️ 트러블 슈팅

- **링크**:
