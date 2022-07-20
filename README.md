# how-to-code-js(中文版)

## 前言

最近带团队，发现了各种各样的 js-coder 的开发习惯问题,正常来说，作为一个有追求的 Coder，写完代码合上笔记本应当有武士收刀入鞘的干净利落，但往往因为各种各样的不良习惯,导致测试人员和开发者徒增工作量,这个文档就是用来为一些习惯不好的同学来一点点规范自己书写代码的习惯，然后让低级 bug 飞走不再困扰！本文章属于 `1.0.0` 版本，后期会随之提供 React 工程、工作方法论等相关文档。

本文档是一个引子，看官可先了解基本原则和 bug 概念，以及对应的不良习惯，然后按照索引去逐步阅读用以不断活用，干掉自己当下写代码的缺陷和问题。

**本文目录**

-   [开发原则](#开发原则)
-   [bug 分类](#bug-的分类)

    -   [低级 bug](#低级-bug)
    -   [高级 bug](#高级-bug)

-   [程序员常见陋习](#程序员常见陋习)
-   [目录索引](#目录索引)

---

## 开发原则

-   **数据来源不信任原则:** 即对传入函数的参数结构类型不信任，后端传递的数据结构类型不信任，所以我们一定会对传入数据来源做数据的预期数据类型转换
-   **代码兜底原则：** 该原则与数据来源不信任原则有耦合关系，正因为不信任，所以我们对来源数据进行兜底，以及我们书写函数的时候对函数的吐出数据进行兜底
-   **不自测不提交原则:** 开发人员在写完代码的时候不应该想当然地直接提交代码，然后把责任一次性撇给测试人员（因为测试人员测出来了你还是得改），测试人员的作用应该是检测高级 bug 而不是随便几下操作就能暴露的低级操作，更重要的是，在代码管理上，别人合并你发上去的 bug 代码也会导致预料之外的不可控风险
-   **如非必要，勿增实体原则:** 写代码总会有各种尝试和纰漏，提交代码之前，一些不曾使用过的变量实体方法就直接删除，让代码尽可能简洁，至于有时候为了赶业务而注释的代码，也应当在测试稳定后直接删除，避免后来的开发人员陷入过度思考的问题，该原则的更优美的处理方式则是需要开发人员具有一定的设计思想和算法能力，要求相对较高

## bug 的分类

### **低级 bug**

```text
一般来说就算是普通人员随便点击导致的数据显示异常，黑屏，web 控制台或者终端的报错以及业务理解错误导致交互数据错误都属于低级 bug，这种问题完全不需要测试人员去耗费心力去测试，这也是需要程序员在自测环节需要做好的事情
```

### **高级 bug**

```text
此类 bug 就完全看测试人员会用何种刁钻的角度去测试内容信息了，往往都是关于极限值，边缘值，非法操作异常操作等等导致的各类隐藏 bug，甚至于因为某种操作导致，或者数据导入导致内存溢出等等
```

## 程序员常见陋习

1. 不经过自测，写完代码就指望测试反馈
2. 着急怼业务逻辑，结果测试反馈越来越多，代码越堆越多
3. 不理解业务就写组件代码
4. 强调过的事情还是会反复犯错，反复强调反复犯错
5. 私下与后端或者其他团队开发人员妥协开发方式，导致项目管理者发现问题后难以计划，亦或者导致白白浪费人力
6. 代码不兜底
7. 不清楚虚拟树 dom 和真实树 dom 到底是怎么回事
8. 全面基础知识有问题

这些问题会在目录索引中指出是可以看哪里去改变这些毛病

## 目录索引

-   工作方法论（陋习 1，2，3，4，5，8）
-   如何声明变量
-   [如何判断数据求真](./originTips/booleanCode-cn.md)
-   [如何做数据兜底](./originTips/safeCode-cn.md)（陋习 6，7）
-   [如何让其他程序员按照你的预期使用你的函数](./originTips/otherOneCode.md)
-   如何书写优雅代码（设计模式）
-   如何写好优雅的前端工程文件（组件关系等）
