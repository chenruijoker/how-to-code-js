# 如何声明变量

说白了前端三板斧：`html`、`js`、`css`,`html` 内容比较少，更多是`css`和`js`的变量声明。

**本文目录**

-   [html 标签或组件标签使用技巧](#html-标签或组件标签使用技巧s)
-   [声明 css、scss or less 变量](#声明-cssscss-or-less-变量)
-   [声明 js 变量](#声明-js-变量)

    -   [声明基本变量](#声明基本变量)
    -   [声明普通函数变量](#声明普通函数变量)
    -   [声明 API 函数变量](#声明-api-函数变量)
    -   [特殊情况入参未使用声明](#特殊情况入参未使用声明)

-   [声明 React 组件](#声明-react-组件)
    -   [滥用 fragment](#滥用-fragment)
    -   [props 解构数据](#props-解构数据)

---

## html 标签或组件标签使用技巧

不论是组件还是正常的 html 标签，说是标签内容里面没有内容我们一律使用`自闭包`写法，目的也很简单，代码更加简洁，一下子也能判断你的组件是否支持 `内部嵌套` 之类的情况

```html
<div>
    <img />
    <!-- 下面的写法避免写 -->
    <!-- <img></img> -->
</div>
```

## 声明 css、scss or less 变量

这里以 github 网页为例子

![](./imgs/example.jpg)

一般而言，我们会更根据业务用途、布局关系来进行样式变量的声明，以该图为例，首先一这是一整个顶部 header，里面有头像,搜索框，操作导航，消息提示，github 的 logo，所以这个部分的样式渲染应该是写成这样

`小写-小写`风格

```html
<div class="top-header">
    <img src="./logo.jpg" class="github-logo" />
    <input class="search-input-bar" />
    <div class="navigation-bar">
        <button class="navigation-button">Pulls</button>
        <button class="navigation-button">Issues</button>
        <button class="navigation-button">Marketplace</button>
        <button class="navigation-button">Explore</button>
    </div>
    <img src="" class="message-bell" />
    <img src="" class="avatar" />
</div>
```

至于某一些场景中我们会在头部中有两个 search 框，那也可以考虑按照位置去命名，比如`left-search-bar` 或者 `right-search-bar`

另外像是 scss 或者 less 这种预编译语法我们最好还是在组件最外层去声明一个变量，然后组件里面的 class 命名就全都包裹进里面,这样的好处也是避免了样式污染

`scss-example`

```scss
.top-header {
    .github-logo {
    }
    .search-input-bar {
    }
    .navigation-bar {
        .navigation-button {
        }
        // 由于这个button的样式是针对navigation独有的，所以甚至可以不需要navigation-button而直接使用 button
    }
    .message-bell {
    }
    .avatar {
    }
}
```

## 声明 js 变量

### 声明基本变量

我们一般声明变量基本上都是按照 **`业务内容`** 去声明变量

我们最好采用`小驼峰命名`

```javascript
let userInfo = {};
let list = [];
let fatherName = "";
```

当然并不是说所有的业务内容都适合采用这种方式,有时候我们对于某些特殊场景需要用到一些常量数据，为了快速在业务代码中分辨哪些是不可变更常量数据哪些是可变业务数据，我们往往会把常量数据单独提出来放在另一个 js 文件中，让业务代码去引用

我们采用`大写+下划线的方式`

```javascript
export const LIST = [];
export const MOCK_DATA = {};
```

当然有些时候因为一些特殊业务名称导致变量名特别长，比如集成开发环境 `Integrated Development Environment` 要是作为变量名就过于奇怪了，所以对于一些行业形成特定缩写认知的名词就可以大胆的使用缩写，也不需要拘泥于小驼峰命名

```javascript
let IDE = "";
// 假设是和IDE进行拼凑的名词
let sonOfIDE = "";
```

这样就够啦！

### 声明普通函数变量

一般情况我们都是通过 `动作+业务内容` 进行函数的变量声明,基本命名法还是按照`小驼峰命名`方式,但是，由于我们当下都是 es6 的时代了，前端工程组件里面还是尽可能使用 `const` 来声明函数，如果是组件里面，则必须使用 `const` 声明，因为自动绑定了函数的 `this` 指向

```javascript
// 如果是在 utils.js 这种文件下，并不非要强制使用 function 还是 const
const saveList = () => {};
// or
function saveList() {}

// 如果是在类似react组件里，则必须强制使用const声明函数
const A = (props) => {
    const saveList = () => {};
    return(<div>{...}</div>)
};
```

偶尔也会出现同一个组件有类似的动作，比如有两个表格，都有 `saveList` 操作，那么就补充 `具体业务对象描述` 就可以了

```javascript
const A = (props) => {
    const saveUserList = () => {};
    const saveCarList= () => {};
    return(<div>{...}</div>)
};
```

### 声明 API 函数变量

一个项目基本会有对应的 api.js 文件，但是我们往往会对 API 函数进行封装，然后在不同的页面去调用,基本上请求函数的命名依照普通函数的命名规范即可，唯一的区别就是 **`开头字母大写`**,这里也顺带给出一个 api 管理文件的规范应该长成什么样子：

```javascript
import { Request } from "./base";
const API = {
    global: {
        // 表示这是给全局页面使用的API
        Logout: (data) => {
            return Request("post", "/logout", data);
        },
        GetUserInfo: (data) => {
            return Request("get", "/getUserInfo", data);
        },
    },
    loginPage: {
        // 表示这是给登陆页使用的API
        Login: (data) => {
            return Request("post", "/login", data);
        },
    },
};
export default API;
```

这样写的好处是，能够在组件中快速理解到这是一个 API 函数还是一个普通的 js 函数，使用的效果大概是这样的：

```javascript
import API from "@api";
import { useEffect } from "react";
const {GetUserInfo} = API.global; // 这里不需要兜底，因为万一没有，一定要报错，然后补充对应的API
const A = (props) => {
    useEffect(()=>{
        let params={}
        GetUserInfo(parmas).then(res=>{...});
    },[]);
    return <div>{...}</div>;
};
export default A;
```

### 特殊情况入参未使用声明

有时候我们写一个函数并去使用它的时候，他的某些参数是没有用的，但是他又在入参的前面部分，假如是第一个参数，但是我们只需要使用第二个参数的话应该怎么办？我们这个时候就可以使用 `_` 来表示忽略使用这个入参：

```javascript
getInfo(_, username);
```

但是像是一些使用习惯`Antd Table`组件的朋友在使用 render 函数的时候，官方给出的参数是这样的：

```javascript
function(text, record, index) {}
```

但你很可能只使用 index 那个参数，这时候你就可以这么写：

```javascript
function(_, _r, index) {}
```

这样程序员就只需要关心具体的参数就够了（毕竟 shift + - 按键还挺麻烦）

## 声明 React 组件

其实我本意是不想写这个声明内容的，但无奈程序员的不良习惯是千奇百怪的,这里就一一举例映射吧！

react 分为渲染结构和逻辑结构两部分

```javascript
import React, { useState } from "react";
import Son from "./Son";

function App() {
    //  这部分为逻辑
    const [A, setA] = useState("");
    const func = () => {};
    // 这部分为视图
    return (
        <div>
            App
            <Son />
        </div>
    );
}

export default App;
```

### 滥用 fragment

我们都知道 react 有`<></>`来表示 React.Fragment 方便多根节点渲染，但是如果你的组件只有一个根 div，就完全不需要使用 `<></>` ,这里展示错误写法

`bad-example`

```javascript
import React, { useState } from "react";
import Son from "./Son";

function App() {
    //  这部分为逻辑
    const [A, setA] = useState("");
    const func = () => {};
    // 这部分为视图
    return (
        // 这里完全多此一举，画蛇添足
        <>
            <div>
                App
                <Son />
            </div>
        </>
    );
}

export default App;
```

### props 解构数据

有时候我们会通过使用 props 给子组件透传属性来执行业务但是完全可以在透传的时候就单独提取对应的属性直接使用

`nice-example`

```javascript
import { useEffect } from "react";

function Son(props) {
    // 解构透传一定要兜底
    const {onChange=()=>{},userName="",obj={}}=props;
    useEffect(()=>{
        const { name="" }=obj;
        onChange(name)
    },[userName,obj])
    // 这部分为视图
    return (
        <div>{...}</div>
    );
}

export default Son;
```
