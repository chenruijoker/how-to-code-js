# 如何做数据兜底

## 函数入参数据兜底

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

有个比较严重的问题在于，你并不知道 ABCDEF 当中哪个属性可能是为`undefind`
