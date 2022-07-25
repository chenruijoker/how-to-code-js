# 如何做数据兜底

**本文目录**

-   [函数入参数据兜底](#函数入参数据兜底)
    -   [函数根据入参做一些交互改变操作](#函数根据入参做一些交互改变操作)
    -   [函数通过入参来返回对应的数值](#函数通过入参来返回对应的数值)
-   [长链路数据获取兜底](#长链路数据获取兜底)
-   [虚拟树兜底](#虚拟树兜底)

---

## 函数入参数据兜底

先说结论: **自己书写的函数入参一定要带默认值！**

我们在书写一些 `function` 或者 `箭头` 函数的时候无非做两种事情:

-   函数根据入参做一些交互改变操作
-   函数通过入参来返回对应的数值

### **函数根据入参做一些交互改变操作**

这里举个例子，假设我们通过入参某个数据来给浏览器补充点什么渲染内容，我们就姑且举个例子：

`bad-example`

```javascript
const Func = (content) => {
    document.write(`<div>${content}</div>`);
};
```

根据 **`数据来源不信任原则`**,我们并不知道`Func`在被使用的时候是处于哪种状态，万一这个 content 就是后端传来的数据呢？出于网络原因或者后端理解错误，或者索性没有数据,我们还有必要去渲染对应的 div 么？这个时候就需要理解对应业务去做对应的数据兜底：

`nice-example`

```javascript
// 假设A:一定要渲染这个div
const Func = (content = "暂无数据") => {
    document.write(`<div>${content}</div>`);
};
// 假设B：没有content则不渲染
// 入参至少一定要有默认值为 ""
const Func = (content = "") => {
    // 如若为假,则中止函数行为
    if (!content) {
        return;
    }
    document.write(`<div>${content}</div>`);
};
// 假设C：一定要渲染，但是入参是个对象目标，这里我们根据业务入参默认为一个空对象
const Func = (obj = {}) => {
    document.write(`<div>${obj.name || "--"}</div>`);
    document.write(`<div>${obj.age || "--"}</div>`);
    document.write(`<div>${obj.gender || "--"}</div>`);
};
```

### **函数通过入参来返回对应的数值**

假设我们需要通过一个函数针对传入的参数进行 100 倍乘法返回：

`bad-example`

```javascript
const Func = (num) => {
    return num * 100;
};
```

同样的问题，你并不知道 `Func` 传进来的参数到底长什么样子，是 `undefind` 还是 `null`,还是对应的数组或者对象，而且入参也没有默认值那应该怎么做？

`nice-example`

```javascript
// 假设允许函数可以不返回内容
const Func = (num = "") => {
    if (!num || !!isNaN(num)) {
        return "";
    }
    let newNum = Number(num);
    return num * 100;
};
// 假设函数至少返回一个特定字符串
const Func = (num = "") => {
    if (!num || !!isNaN(num)) {
        return "数据获取异常";
    }
    let newNum = Number(num);
    return num * 100;
};
```

## 长链路数据获取兜底

有时候在一些组件啊，或者后端请求打过来的时候我们所需要的业务数据链路是很长的，举个例子：

`bad-example`

```javascript
const Func = (obj) => {
    return obj.A.B.C.D.E.F;
};
```

有个比较严重的问题在于，你并不知道 ABCDEF 当中哪个属性可能是为`undefind`，导致你的程序会出现报错，当然我们也知道 js 新语法糖里还有这种写法：`obj?.xx?.xx?.xx?.xx`,但这写法并不支持 `obj[2][2].xx.xx` 这类更加复杂的写法，而且也可能在个别浏览器中编译后出现意料之外的错误问题，索性本文档就提供了对应的获取长链路的函数方法，具体在目录 `/utils-cn` 中

`nice-example`

```javascript
import { getObjectFinalValue } from "../utils-cn";
// 假设一定要返回默认值
const Func = (obj = {}) => {
    return getObjectFinalValue(obj, "A.B.C.D.E.F") || "数据异常";
};
```

## 虚拟树兜底

现在有很多前端业务都属于数据图形化,比如 echarts 或者 antV 之类的可视化插件包
根据 [`echarts 官网`](https://echarts.apache.org/handbook/zh/get-started/) 入门部分我们能看到这样一段代码

```javascript
var myChart = echarts.init(document.getElementById("main"));
```

但是请注意，echarts 的 demo 代码是基于真实树结构的，所以 `document.getElementById("main")` 是一定能够获取到对应的 dom 节点的！  
然而，我们往往是虚拟树开发，如果在组件挂载的时候直接使用这种写法，真实树可能并没有对应的 id 为 main 的 div 节点，所以我们必然会出现报错失败或者白屏黑屏的情况,所以我们需要对对应的节点产生监听行为，以`react-hooks`为例，我们先看看历史发现的一些错误写法：

`bad-example`

```javascript
const [myChart, setMyChart] = useState(null);
const chartRef = useRef();
useEffect(() => {
    if (!myChart) return;
    let cb = () => {
        myChart.resize();
    };
    window.addEventListener("resize", cb);
    return () => {
        window.removeEventListener("resize", cb);
    };
}, [myChart]);
useEffect(() => {
    if (!myChart) return;
    // 这里就是绘制对应的echarts内容
    draw(datas);
}, [myChart, datas]);
useEffect(() => {
    setMyChart(echarts.init(chartRef.current || ""));
}, []);
return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
```

先说优点吧,首先这个同学很聪明的是采用 **`ref`** 而不是 **`id`** 来获取到对应的 div 节点,而且他是在 `useEffect(()=>{},[])` 中，即组件挂载树后去渲染  
但是缺点也很直接，第一个没有必要再去设置 `myChart` 的 `useState` ,另一点，即 `useEffect` 重复监听 `myChart` 是完全没有必要的

`nice-example-first`

```javascript
import { useEffect, useRef } from "react";
const A = (props) => {
    const ERef = useRef();
    useEffect(() => {
        const myChart = echarts.init(ERef.current);  // 一定能获取到
        const option = {...} // 默认有值
        myChart.setOption(option);
    }, []);
    return <div ref={ERef}></div>;
};
```

当然在某些特殊的复杂交互中这个 dom 节点的内容会出现隐藏不渲染，交互之后又显示的情况，我们其实完全可以这么写：

`nice-example-second`

```javascript
import { useEffect, useRef } from "react";
const A = (props) => {
    const ERef = useRef();
    useEffect(() => {
        if(!!ERef.current){
            const myChart = echarts.init(ERef.current);  // 一定能获取到
            const option = {...} // 默认有值
            myChart.setOption(option);
        }
    }, [ERef.current]);
    return <div ref={ERef}></div>;
};
```

代码量更少且更加直观了。当然这里是以 echarts 作为一个例子，日后也会出现类似虚拟树使用方式理解上的问题，但一通百通，基本就可以用类似的方式解决虚拟树获取不到渲染问题了。
