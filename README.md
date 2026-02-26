



# Wine Community Service

와인 애호가를 위한 커뮤니티 플랫폼입니다. 와인을 탐색하고, 리뷰를 작성하며, AI 기반 와인 추천을 받을 수 있습니다.



## 주요 기능

- **3D 랜딩 페이지** — Three.js를 활용한 와인 보틀 3D 애니메이션과 스크롤 연동 카메라 효과
- **와인 목록 & 필터** — 와인 종류(RED/WHITE/SPARKLING), 가격대, 평점별 필터링 및 검색
- **와인 상세 정보** — 맛 프로필(바디감·탄닌·당도·산도), 아로마 Top 4, 평점 분포, 리뷰 목록
- **리뷰 작성** — 별점, 맛 스펙트럼, 아로마 태그 선택이 가능한 리뷰 작성 모달
- **AI 와인 추천 챗봇** — Cerebras LLaMA 모델 기반의 대화형 와인 추천
- **추천 와인 캐러셀** — 사용자 맞춤 추천 와인을 Swiper 캐러셀로 제공
- **회원가입 / 로그인** — 이메일 인증 및 카카오 OAuth 지원
- **마이 프로필** — 내가 쓴 리뷰, 등록한 와인 관리, 닉네임 수정


**👥 팀 소개**

| 팀장 | 팀원 | 팀원 |
|:---:|:---:|:---:|
| <b>김준석</b><br>`리드FE`<br><br>랜딩페이지<br>로그인페이지<br>회원가입페이지<br>와인목록페이지 |<b>박예성</b><br>`FE`<br><br>와인상세페이지 | <b>이지선</b><br>`FE`<br><br>마이페이지 |




## 기술 스택

| 분류                 | 기술                                |
| -------------------- | ----------------------------------- |
| **Framework**        | Next.js 16, React 19, TypeScript 5  |
| **Styling**          | Tailwind CSS 4, Sass, Framer Motion |
| **3D**               | Three.js, React Three Fiber, Drei   |
| **상태 관리**        | Zustand                             |
| **폼 / 유효성 검사** | formik, Yup                         |
| **HTTP**             | Axios                               |
| **AI**               | Cerebras Cloud SDK (LLaMA 3.3-70B)  |
| **UI 컴포넌트**      | Swiper, react-range                 |
| **개발 도구**        | ESLint, Prettier                    |

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/<your-org>/wine_community_service.git
cd wine_community_service
npm install
```

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 값을 설정합니다.

```env
CEREBRAS_API_KEY=<Cerebras API 키>
```

### 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 보안 아키텍처

토큰이 브라우저에 직접 노출되지 않도록 **Next.js API Route를 프록시**로 활용합니다.

### 인증 흐름 (로그인)

```
Client                    Next.js Server                   External API
  │                            │                                │
  │  POST /api/auth/signIn     │                                │
  │  { email, password }       │                                │
  │ ──────────────────────────>│                                │
  │                            │  POST /auth/signIn             │
  │                            │  { email, password }           │
  │                            │ ──────────────────────────────>│
  │                            │                                │
  │                            │  { accessToken, refreshToken } │
  │                            │ <──────────────────────────────│
  │                            │                                │
  │                            │  Set-Cookie:                   │
  │                            │    access_token  (httpOnly)    │
  │                            │    refresh_token (httpOnly)    │
  │                            │                                │
  │  { user }                  │                                │
  │ <──────────────────────────│                                │
  │  (토큰은 반환하지 않음)      │                               │
```

### API 프록시 흐름 (데이터 요청)

```
Client (Axios)            Next.js Proxy                    External API
  │                            │                                │
  │  GET /api/wines            │                                │
  │  (쿠키 자동 포함)            │                               │
  │ ──────────────────────────>│                                │
  │                            │  쿠키에서 access_token 추출     │
  │                            │  GET /wines                    │
  │                            │  Authorization: Bearer <token> │
  │                            │ ──────────────────────────────>│
  │                            │                                │
  │                            │            200 OK              │
  │                            │ <──────────────────────────────│
  │  JSON 응답                  │                               │
  │ <──────────────────────────│                                │
  │                            │                                │
  │              ── 401 발생 시 자동 갱신 ──                     │
  │                            │                                │
  │                            │  POST /auth/refresh-token      │
  │                            │  { refreshToken }              │
  │                            │ ──────────────────────────────>│
  │                            │  { accessToken }               │
  │                            │ <──────────────────────────────│
  │                            │  새 토큰으로 원래 요청 재시도    │
  │                            │ ──────────────────────────────>│
```

### 핵심 보안 포인트

| 방어 대상       | 적용 기법              | 설명                                      |
| --------------- | ---------------------- | ----------------------------------------- |
| **XSS**         | `httpOnly` 쿠키        | JavaScript에서 토큰 접근 불가             |
| **CSRF**        | `sameSite: strict`     | 크로스 사이트 요청 시 쿠키 미전송         |
| **도청**        | `secure` 플래그        | 프로덕션 환경에서 HTTPS 전용 전송         |
| **토큰 노출**   | 서버 사이드 프록시     | 토큰이 브라우저에 노출되지 않음           |
| **토큰 만료**   | 자동 갱신              | 401 응답 시 refresh token으로 자동 재발급 |
| **미인증 접근** | Middleware 라우트 보호 | `/myprofile` 등 보호 페이지 접근 차단     |

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/              # 로그인 / 회원가입
│   ├── wines/               # 와인 목록 & 상세
│   │   ├── [id]/            # 와인 상세 페이지
│   │   └── _components/     # 필터, 챗봇, 추천, 등록 폼
│   ├── myprofile/           # 마이 프로필
│   ├── oauth/               # OAuth 콜백 처리
│   ├── api/                 # API 라우트 (프록시, 인증, AI 챗봇)
│   └── _components/         # 랜딩 페이지 (3D 모델 포함)
├── components/              # 공통 컴포넌트 (Header, Footer, Modal, Toast 등)
├── libs/                    # API 클라이언트, Zustand 스토어, 유틸리티
├── types/                   # TypeScript 타입 정의
└── styles/                  # 글로벌 스타일
```


