# 如何判断 if 数据求真

我们在书写

**本文目录**

-   [禁用 ==](#禁用)
-   [如何求真-使用 !](#如何求真-使用)

---

## 禁用 \==

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

## 如何求真-使用 \!

先看一下比较奇怪的代码

`bad-example`

```javascript
if(a == null){
    ...
}
```

我们也说过 禁用 `==` 的问题了，假如 `a = ''` 按照逻辑来说应该是可以进入 if 语句块内，但是 `a!=null` 导致逻辑错误，而且按照逻辑来说 `a=''` 、`a=undefind` 、`a=null`、`a=0`应该都是要支持进入 if 语句块，全部用 `===` 也会显得代码很重很蠢，所以我们统一使用 `!`:

`nice-example`

```javascript
// 逻辑需要a为真的时候
if(!!a){
    ...
}
// 若是逻辑需要a为假的时候
if(!a){
    ...
}
```

当然天下之大无奇不有，甚至还有人为了取假判断写成这样：

`wrong-code`

```javascript
if(!!!a){
    ...
}
```

这种写法就不应该存在了，但是现实是确实还存在三个以上 `!` 的诡异代码，看官引以为戒
