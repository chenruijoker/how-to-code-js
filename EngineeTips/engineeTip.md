# 如何书写前端工程文件

严重声明

**如果你还没阅读完其他目录内容请重新回去看其他目录再过来看这篇文章内容**

此篇暂时以 react 为例子进行工程阐述

**本文目录**

-   [组件概念以及如何设计](#组件概念以及如何设计)
    -   [基础组件](#基础组件)
    -   [私有组件](#私有组件)
    -   [公共组件](#公共组件)
-   [如何书写 React 组件](#如何书写-react-组件)

---

## 组件概念以及如何设计

### 基础组件

一个组件大概会有组件主体，渲染静态数据，方法包，样式等，大概一个完整的组件目录如下

```text
|---A // 组件名称
|   |---index.jsx // 组件主体
|   |---index.scss // 组件样式
|   |---utils.js // 组件方法包
|   |---renderData.js //组件静态数据
```

### 私有组件

有时候组件之间是有嵌套关系的，但是组件和组件之间又应该是互相解耦的就算删除掉某个子组件也应该保证页面是正常的,甚至于整个私有组件单独拿出来复制粘贴都可以独立去使用

```text
|---Father // 组件名称
   |---index.jsx // 组件主体
   |---index.scss // 组件样式
   |---utils.js // 组件方法包
   |---renderData.js //组件静态数据
   |---components // 私有组件包
        |---Son
            |---index.jsx // 组件主体
            |---index.scss // 组件样式
            |---utils.js // 组件方法包
            |---renderData.js //组件静态数据

```

### 公共组件

对于经常被使用的组件，我们可以单独放在工程的公共组件池里，大致的工程目录如下：

```text
|---src
    |---api // api管理
    |---assets // 静态文件
    |---mock // mock数据管理
    |---router // 路由管理
    |---store // 全局数据管理
    |---utils // 全局公共函数管理
    |---components // 公共组件管理
        |---CommonSon // 公共组件
            |---index.jsx
            |---index.scss
            |---utils.js
            |---renderData.js
    |---pages // 页面管理
```

公共组件一定要用 `Common+组件名` 去声明，这样敲代码维护的时候可以马上判断修改这个组件是否会对其他使用这个组件的地方产生影响，而且也能判断该组件是私有组件还是公共组件了

## 如何书写 React 组件

很多时候我们的开发过程中某些交互是比较复杂的，视图交互逻辑也往往伴随着 {&& 渲染} 或者 三元运算符 {!!A? <div>A</div>:<div>B</div>}
这种类似的格式，但往往会为我们快速定位问题造成干扰，找答案就得耗费大量的时间
首先我们要有一个共识，就是逻辑的关系一定是清晰的，所以理想状态下我们一个标准的组件应该是这样的：

```javascript
import React, {
    useState,
    useMemo,
    useImperativeHandle,
    useEffect,
    forward,
} from "react";
import Son from "./Son";
import { getA } from "./utils"; // 工具方法放在外层
import { staticA } from "renderData.js"; // 常量渲染数据放在外层

function App(props, ref) {
    const SRef = useRef();
    const { lala = "" } = props; // props的变量获取放在首位
    const [A, setA] = useState(""); // useState的变量声明放在次位
    useImperativeHandle(ref, () => {
        // 暴露给外层的放在第三层
        return {
            A,
            setA,
        };
    });
    useEffect(() => {
        // useEffect放在第四层
        getA();
    }, []);
    const func = () => {};
    const renderA = useMemo(() => {
        return staticA.map((item) => {
            return <div key={item.id}>{item.name}</div>;
        });
    }, [staticA]);
    const renderB = (A) => {
        if (!A.xx) {
            return null;
        }
        return <div>xxx</div>;
    };
    // 这部分为主视图视图,但依然解除了渲染部分的逻辑，更加快速锁定到应该关注那部分的渲染逻辑
    return (
        <div>
            App
            <Son ref={SRef} />
            {renderA}
            {renderB(A)}
        </div>
    );
}

export default forward(App);
```

能够看得出,我们主视图部分代码量是非常直接的，一旦出现什么难以找到的 bug，检查错误的时候完全可以注释掉对应的部分，快速锁定，然后一路追溯,方便我们快速定位错误，处理问题
