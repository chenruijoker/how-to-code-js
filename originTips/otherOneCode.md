# 如何让其他程序员按照你的预期使用你的函数

说白了，就是对于一些必传递的参数做一些类型或者取真校验，这个例子就比较实在：

```javascript
export const getObjectFinalValue = (obj = {}, str = "") => {
    if (!obj || JSON.stringify(obj) === "{}") {
        return undefined;
    }
    if (!str) {
        throw new Error("getObjectFinalValue():没有传递第二个参数");
    }
    let arr = str.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    let newObj = obj;
    for (let i of arr) {
        newObj = newObj[i];
        if (typeof newObj != "number" && !newObj) {
            return undefined;
        }
    }
    return newObj;
};
```
