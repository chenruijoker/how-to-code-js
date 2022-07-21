# 如何判断 if 数据求真

我们在书写

**本文目录**

-   [禁用 ==](#禁用)
-   [如何求真](#如何求真)

---

## 禁用 ==

其实行业当中已经有很多语言都是规范了程序员禁用 `==`,首先我们需要解释 `==` 会造成代码的类型转换，举个例子：

```javascript
var x = 1;
var obj = {
    valueOf: function () {
        x = 2;
        return 0;
    },
};
console.log(obj == 0, x); // true, 2
```

不仅如此还会产生异常:

```javascript
var x = 1;
var obj = {
    valueOf: function () {
        return {};
    },
    toString: function () {
        return {};
    },
};
console.log(obj == 0); // Error: Cannot convert object to primitive value
```

所以根据 **[数据来源不信任原则](../README.md#开发原则)** 我们基本还是采用 `===` 去进行数据的比较判断

## 如何求真
