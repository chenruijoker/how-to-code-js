// 返回长链路对象
export function getObjectFinalValue(obj, str) {
    if (!obj || JSON.stringify(obj) === "{}") {
        return undefined;
    }
    if (!str) {
        throw new Error("getObjectFinalValue():没有传递第二个参数");
    }
    let arr = str.split(".");
    let newObj = obj;
    for (let i of arr) {
        newObj = newObj[i];
        if (typeof newObj != "number" && !newObj) {
            return undefined;
        }
    }
    return newObj;
}
