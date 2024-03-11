## 🚀 "NextAuth" - dev camp

<br/>

### 🌟 프로젝트 소개

이 프로젝트는 Next.js를 사용하여 Shacdn/UI, Zod, React Hook Form, 그리고 Resolvers 라이브러리를 활용하여 간단한 회원가입 페이지와 로그인 페이지를 개발하는 것을 목표로 합니다.
<br/>

### 🛠️ 기술 스택

<div>Next.js
Shacdn/UI
Zod
React Hook Form
Resolvers</div>
<br/>

### 👥 개발자

| 이름   | 역할                 |
| ------ | -------------------- |
| 박세현 | **Frontend (React)** |

<br/>

### 📄 목적

#### week1

##### 로그인/회원가입 기능

<div>Shacdn을 활용한 UI 디자인</div>
<div>- Shacdn을 사용하여 로그인 페이지의 UI를 디자인

<div>Zod를 이용한 입력 유효성 검사</div>
<div> - Zod를 사용하여 로그인 폼의 입력값을 검증 <br/>
 - 유효하지 않은 입력에 대해 사용자에게 알림</div>

<div>React Hook Form을 활용한 상태 관리</div>
<div> - 폼의 상태를 관리<br/>
 - 폼의 제출 및 유효성 검사와 관련된 로직을 간편하게 구현할 수 있습니다.</div>

#### week2

<div>장바구니, 결제페이지 개발, 배포
Next.js, Shacdn/UI, Zod, React Hook Form, Resolvers, 토스페이먼츠 사용연습</div>

##### 쿠폰 기능

<div>쿠폰 종류</div>
<div>1. 정액제 쿠폰</div>
<div>고정된 금액으로 할인이 적용<br/>
ex: '5천 원 할인쿠폰'</div>

<div>2. 정률제 쿠폰</div>
<div>결제 금액의 일정 비율로 할인이 적용<br/>
ex: '30% 할인쿠폰'</div>

##### 결제 기능

<div>
토스페이먼츠를 사용하여 결제 기능을 구현<br/>
사용자는 결제 수단을 선택하고, 적용된 쿠폰을 확인하며, <br/>
최종 결제 금액을 확인<br/></div>
<br/>

### 🔧 프로젝트 구조

<div>
📦src<br/>
 ┣ 📂app<br/>
 ┃ ┣ 📂(islogin)<br/>
 ┃ ┃ ┣ 📂cart<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📂login<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┗ 📜layout.tsx<br/>
 ┃ ┣ 📂(logout)<br/>
 ┃ ┃ ┣ 📂signup<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┗ 📜layout.tsx<br/>
 ┃ ┣ 📂api<br/>
 ┃ ┃ ┣ 📂login<br/>
 ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┣ 📂signup<br/>
 ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┗ 📜logo<br/>
 ┃ ┣ 📜favicon.ico<br/>
 ┃ ┣ 📜globals.css<br/>
 ┃ ┣ 📜layout.tsx<br/>
 ┃ ┣ 📜not-found.tsx<br/>
 ┃ ┗ 📜page.tsx<br/>
 ┣ 📂components<br/>
 ┃ ┣ 📂ui<br/>
 ┃ ┃ ┣ 📜button.tsx<br/>
 ┃ ┃ ┣ 📜card.tsx<br/>
 ┃ ┃ ┣ 📜checkbox.tsx<br/>
 ┃ ┃ ┣ 📜dialog.tsx<br/>
 ┃ ┃ ┣ 📜form.tsx<br/>
 ┃ ┃ ┣ 📜input.tsx<br/>
 ┃ ┃ ┣ 📜label.tsx<br/>
 ┃ ┃ ┣ 📜menubar.tsx<br/>
 ┃ ┃ ┣ 📜radio-group.tsx<br/>
 ┃ ┃ ┣ 📜select.tsx<br/>
 ┃ ┃ ┗ 📜use-toast.ts<br/>
 ┃ ┗ 📜sign-up.tsx<br/>
 ┣ 📂lib<br/>
 ┃ ┗ 📜utils.ts<br/>
 ┗ 📂validators<br/>
 ┃ ┣ 📜cartSchema.ts<br/>
 ┃ ┣ 📜loginSchema.ts<br/>
 ┃ ┗ 📜signupSchema.ts<br/>
</div>
<br/>
