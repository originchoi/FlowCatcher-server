<div align="center">

<h1>FlowCatcher</h1>

<img width="400" src="https://github.com/originchoi/FlowCatcher-client/blob/main/public/assets/FlowCatcher_logo.png?raw=true" alt="FlowCatcher 로고">

<h3> "내 웹사이트 사용자들의 흐름을 살펴보세요" </h3>

웹사이트 사용자 행동 데이터를 기반으로 페이지 이동 흐름을 시각화 해주는 서비스

<br />

내 웹사이트를 통해 어떤 사용자 행동이 일어나고 있는지,

그리고 이러한 행동이 전환율에 어떤 영향을 미치는지

시각적으로 확인해보세요✨

</br>

[🔗 FlowCatcher 사용해보기](https://web.flow-catcher.com/)
<br/>
[Client Repository](https://github.com/originchoi/FlowCatcher-client)
<br/>
[Server Repository](https://github.com/originchoi/FlowCatcher-server)

</div>

<br />
<br />

# 목차

- [🙋🏻 프로젝트 소개](#-프로젝트-소개)
  - [FlowCatcher를 만들게 된 계기](#flowcatcher를-만들게-된-계기)
  - [주요 기능 설명](#주요-기능-설명)
- [🛠 기술 스택](#-기술-스택)
- [💪🏻 기술적 경험](#-기술적-경험)
  - [1. 어떻게 웹사이트 방문자의 페이지 이동 흐름을 추적할 수 있을까](#1-어떻게-웹사이트-방문자의-페이지-이동-흐름을-추적할-수-있을까)
    - [1-1. History API란](#1-1-history-api란)
    - [1-2. 메서드 오버라이딩](#1-2-메서드-오버라이딩)
  - [2. 세션 종료를 어떻게 판단할 수 있을까](#2-세션-종료를-어떻게-판단할-수-있을까)
    - [2-1. Google Analytics 에서의 세션 종료 판단기준](#2-1-Google-Analytics-에서의-세션-종료-판단기준)
    - [2-2. AWS Lambda 를 이용한 세션 종료 판단](#2-2-AWS-Lambda-를-이용한-세션-종료-판단)
  - [3. 데이터를 어떻게 시각화 할 것인가](#3-데이터를-어떻게-시각화-할-것인가)
    - [3-1. D3.js](#3-1-d3js)
- [📋 회고](#-회고)
  - [프로젝트를 마치며](#프로젝트를-마치며)
  - [개발 기록](#개발-기록)
- [🙇🏻‍♂️ 내 소개](#-내-소개)

<br />
<br />

# 🙋🏻 프로젝트 소개

## FlowCatcher를 만들게 된 계기

비즈니스 웹사이트 사용자들은 모두 제각기 다른 흐름으로 페이지를 탐색합니다.

그 흐름들을 눈으로 볼 수 있다면 얼마나 좋을까요?

기업과 개인 사업자 모두 자신의 서비스와 제품을 온라인으로 홍보하고 판매하는데 의존하고 있고

이러한 환경에서 웹사이트의 사용자 경험과 전환율은 비즈니스 성공의 핵심 요소가 되었습니다.

그러나 많은 비즈니스가 자신의 웹사이트를 통해 어떤 사용자 행동이 일어나고 있는지 파악하지 못하고 있습니다.

저는 **웹페이지 사용자의 페이지 이동 흐름을 시각화할 수 있는 서비스**를 만들고 싶었습니다.

그래서 **웹사이트 내 사용자 흐름을 시각화 해주는 서비스 FlowCatcher** 를 만들게 되었습니다.

<br />
<br />

## 주요 기능 설명

### [프로젝트 생성 및 추적 서비스 코드 발급 및 적용]

![servicecode_issued](https://github.com/originchoi/FlowCatcher-client/assets/116258834/e5f47d98-3842-464c-8786-5606cb3c4a7e)

- 본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해 사용자는 프로젝트를 만들 수 있습니다.
- 프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로 복사할 수 있습니다.

<br />
<br />

![servicecode_apply](https://github.com/originchoi/FlowCatcher-client/assets/116258834/031924a5-8a35-47a7-b412-4c691a7965f5)

- 발급받은 서비스 코드(스크립트 코드)를 사용자의 비즈니스 웹사이트에 붙여넣기 하여 사용합니다.

<br />
<br />

### [웹사이트 사용자 행동 데이터를 기반으로 페이지 이동 흐름을 시각화 (행동 흐름 분석)]

![analytics_behavior](https://github.com/originchoi/FlowCatcher-client/assets/116258834/04a68277-2059-4002-9c68-cb64b8982db5)

- 행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내 방문자들의 페이지 이동 흐름을 볼 수 있습니다.
- 가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로 나열되어 그래프와 함께 나타냅니다.
- 총 세션 수(방문자 수), 총 방문 횟수, 총 새로 고침 횟수, 총 이탈 횟수를 수치로 나타냅니다.
- 가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다.
  - 사용자는 각 url 별로 분류된 방문 페이지 노드를 드래그 할 수 있습니다.
  - 각 노드(방문 페이지)는 이탈 횟수와 방문 횟수 수치를 나타냅니다.
  - 이탈 횟수는 30분 이상 활동이 없는 방문자를 이탈로 간주하여, 마지막 방문페이지를 확인하여 나타냅니다.
  - 노드와 노드 사이 화살표로 링크로 페이지 간 이동 관계를 나타냅니다.
  - 화살표 링크에 호버 시, 어느 source(이동 전 페이지)에서 어느 target(이동 후 페이지)를 나타냅니다.
  - 새로고침의 경우 이동 전, 후 페이지가 같기 때문에 자기 자신에게 링크가 연결되어집니다. 마찬가지로 호버 시, source와 target을 볼 수 있습니다.

<br />
<br />

# 🛠 기술 스택

### **FrontEnd**

<div style="display:flex;">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=D3.js&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
</div>

### **BackEnd**

<div style="display:flex;">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

### **Deployment**

<div style="display:flex;">
  <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">
  <img src="https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
</div>

### **Test**

<div style="display:flex;">
  <img src="https://img.shields.io/badge/React%20Dom%20Testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white">
</div>

<br />
<br />

# **💪🏻 기술적 경험**

## 1. 어떻게 웹사이트 방문자의 페이지 이동 흐름을 추적할 수 있을까

유저의 페이지 이동 흐름을 추적하는 코드를 작성하기 위해 HISTORY API를 사용했습니다.

### 1-1. **History API**란

<p align="center">
  <img width="773" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/6940c2ba-f4c6-4ec8-8d56-f1675fd1689e">
</p>

HISTORY API는 history 글로벌 오브젝트를 이용하여 브라우저의 세션 히스토리에 대한 접근과 조작 기능을 제공해줍니다.

이 API는 브라우저의 세션 히스토리, 즉 사용자가 방문한 페이지의 기록을 스크립트를 통해 조작할 수 있게 해줍니다. 이를 통해 개발자는 브라우저의 뒤로 가기 및 앞으로 가기 버튼의 기능을 효과적으로 제어할 수 있으며, 페이지 리로드 없이 URL을 변경할 수 있습니다.

브라우저에서 페이지 로딩을 하면, 세션 히스토리를 갖으며, 브라우저는 이 히스토리를 stack으로 관리합니다.

세션 히스토리는 페이지를 이동할 때마다 쌓이며, 이를 통해 뒤로 가기 또는 앞으로 가기 같은 이동이 가능합니다.

즉, "어떤 페이지를 탐색했는지에 대해서 history를 쌓는 것" 이라고 생각하면 됩니다.

제가 사용한 History API의 핵심 기능으로는

1. history.pushState(): 새로운 상태를 히스토리 스택에 추가합니다. 이 메서드를 사용하면, 사용자가 뒤로 가기 버튼을 클릭했을 때 이전 상태로 돌아갈 수 있습니다.
2. history.replaceState(): 현재 상태를 새로운 상태로 대체합니다. 이 메서드는 페이지의 상태를 변경하고 싶지만, 그 변경이 히스토리 스택에 새로운 항목을 추가하지 않길 원할 때 유용합니다.

<br />
<br />

### 1-2. 메서드 오버라이딩

<p align="center">
  <img width="500px" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/4542f4d1-37dd-4119-a7b2-b43e29e0a679">
</p>

<br />

사용자의 페이지 이동 흐름을 추적하는 코드를 제공하고, 이를 위해 history.pushState와 history.replaceState 메서드를 오버라이딩하고, popstate 이벤트에 리스너를 추가하여, 페이지의 URL이 변경될 때마다 이를 감지합니다.

위의 이미지와 같은 방법을 통해, 사용자의 동적인 페이지 이동을 포함하여 모든 유형의 페이지 이동을 추적할 수 있었습니다.

history.pushState와 history.replaceState 메서드를 오버라이딩하는 주된 이유는, 이 메서드들이 호출될 때마다 사용자 정의 기능을 실행하여 페이지의 URL 변경을 추적할 수 있도록 하기 위함입니다.

이러한 오버라이딩을 통해 원래의 메서드 기능을 유지하면서도, 페이지 이동이 발생할 때마다 추가적인 페이지뷰 추적 로직 실행을 할 수 있습니다.

<br />
<br />

## 2. 세션 종료를 어떻게 판단할 수 있을까

### 2-1. **Google Analytics** 에서의 세션 종료 판단기준

<p align="center">
  <img width="489" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/3115d106-1390-4209-bb87-d273fdd46c5e">
</p>

세션 종료 판단에 대한 기준을 세워보았습니다.

데이터 준비 단계에서 구글 애널리틱스를 보면 여러 세션 판단기준 중 시간 기반 완료 조건을 참고하여 진행하였습니다.

사용자 한 명이 여러 세션을 시작할 수도 있고, 이러한 세션은 하루 동안 집중적으로 발생할 수도 있고, 며칠, 몇주 또는 몇 개월에 걸쳐 발생할 수도 있습니다.

세션이 종료되는 방식에는 시간 기반 완료가 있고, 이 중 방문자 활동이 30분 이상 없을 경우 세션을 종료판단 하고 있습니다. 이를 기준으로 삼았습니다.

<br />
<br />

### 2-2. **AWS Lambda** 를 이용한 세션 종료 판단

<p align="center">
  <img width="669" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/a9b9e773-973c-49e3-aea2-1853208ef8d5">
</p>

따라서 마지막 페이지가 업데이트 된지 30분이 지난 세션은 활성이 안 되어있다고 판단하였습니다.

이에따라, AWS Lamda의 Event-Bridge를 통해 5분 간격으로 30분 이상 지난 세션을 판단해 주었습니다.

그리고 이렇게 종료가 되었다고 판단되면 이는 페이지 이탈로 간주하였습니다.

<br />
<br />

## 3. 데이터를 어떻게 시각화 할 것인가

### 3-1. **D3.js**

<p align="center">
  <img width="783" alt="image" src="https://github.com/originchoi/FlowCatcher-client/assets/116258834/8b3dba0f-da5c-4501-885d-8784ad9cfb80">
</p>

데이터 중심의 문서 (Data - Driven Documents)의 약자로 자바스크립트 기반의 라이브러리 언어입니다.

사용자가 입력한 시각화 규칙을 바탕으로 데이터를 반영해 시각화 결과물을 생성해 줍니다.

데이터 시각화 프레임워크로 잘 알려져 있고 HTML5의 SVG를 통하여 다양한 화면 해상도에서도 깨짐없는 시각화가 가능합니다.

어떠한 흐름으로 그래프를 구성해 볼지 고민해 봤고 그 결과는 Force-Directed Graph 였습니다.

Force-Directed Graph는 복잡한 네트워크 상의 관계를 시각적으로 표현하는 데 매우 유용합니다. 웹 사이트 내에서 사용자의 이동 경로를 나타내는 노드와 링크를 통해, 어떤 페이지가 다른 페이지로 이어지는지, 어떤 페이지가 사용자들 사이에서 중심적인 역할을 하는지 등을 한눈에 볼 수 있습니다.

<br />
<br />

# 📋 회고

## 프로젝트를 마치며

이번 프로젝트는 제 개인적인 성장에 있어 매우 중요한 계기가 되었습니다. FlowCatcher 개발 과정에서 저는 사용자 행동 데이터를 시각화하는 기능의 구현에서 큰 도전을 맞이했습니다.

### 선택과 집중의 중요성

프로젝트 초기, 다양한 기능과 아이디어 사이에서 우선순위를 정하는 것이 어려웠습니다. 모든 기능을 완벽하게 구현하고자 하는 욕심이 결국 프로젝트 진행을 더디게 했습니다. 이러한 경험을 통해, 선택과 집중의 중요성을 깨닫고 핵심 기능에 집중하기로 결정했습니다. 이 결정은 프로젝트를 시간 안에 성공적으로 완료하는 데 결정적인 역할을 했습니다.

### 기술적 문제 해결

프로젝트 중 가장 도전적이었던 부분은 사용자의 페이지 이동 흐름을 실시간으로 추적하고 시각화하는 기능이었습니다. HISTORY API와 같은 브라우저의 내장 기능을 활용하여 이 문제를 해결했습니다. 이 과정에서 많은 기술적 장벽에 부딪혔으나, 문제 해결을 위해 지속적으로 학습하고 실험하는 자세가 큰 도움이 되었습니다.

### 개인적 느낀점

프로젝트를 통해 스스로에게 많은 질문을 던지며 고민했습니다. "이 기술이 정말 이 상황에 최적인가?", "사용자 경험을 더 향상시킬 수 있는 방법은 무엇인가?" 등의 질문을 통해 제한된 자원 내에서 최적의 결과를 도출하려 노력했습니다. 이러한 과정들이 저를 더 성숙한 개발자로 성장시키는 데 큰 역할을 했습니다.

<br />
<br />

## 개발 기록

자세한 개발 과정은 다음 링크에서 확인하실 수 있습니다:

- [노션 정리, 프로젝트 시작부터 마무리까지..](https://fanatical-medicine-ad9.notion.site/FlowCatcher-69b4ed4ef38f4bf59392b156d2d70980?pvs=74)

이 회고를 통해 프로젝트의 각 단계에서의 학습 사항과 성장 과정을 돌아보며, 앞으로의 개발 경력에 적용할 중요한 교훈을 얻을 수 있었습니다. 모든 경험은 저를 더 나은 개발자로 만드는 밑거름이 되었습니다.

<br />
<br />

# 🙇🏻‍♂ 내 소개

<div style="display:flex">
  <table>
    <tr height="50px">
      <td align="center" colspan="2">
        <a href="https://github.com/originchoi">🐣 최기원 (Origin Choi)</a>
      </td>
    </tr>
    <tr height="130px">
      <td align="center" width="130px">
        <a href="https://github.com/originchoi"><img src="https://avatars.githubusercontent.com/u/116258834?v=4" style="border-radius:50%"/></a>
      </td>
      <td align="left">
        - Github: https://github.com/originchoi
        <br />
        - Gmail: kyun4525@gmail.com
        <br />
        - Hi, I am trying to become a nice developer ☺️
      </td>
    </tr>
  </table>
</div>
