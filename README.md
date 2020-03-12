# README
## 启动

```bash
$ cd react-feature-demo
$ npm install
$ npm start
```
## 代码组织

### 问题
react常规项目文件夹结构，通常按照三部分组成：Reducer,Action,Component，分别放与之相关的代码，
Reducer放所有的reducer代码,Action放action的代码,Component放所有组件的代码，这样以技术的角度去组织代码，
随着项目的发展，大部分的代码将很难理清楚逻辑关系，系统将变得难以维护和扩展。

### 思路
按照领域模型（feature）去组织代码，以功能的划分去组织代码，将业务逻辑拆分为一个个的高内聚低耦合小功能
，具体拆分的目录结构，如下：

## 目录结构
```bash
|-script
|-config
|-public
└─src
  ├─common
  ├─features
  │  ├─examples
  │  │  └─redux
  │  ├─common
  │  │  └─redux
  │  └─home
  │      └─redux
  ├─images
  └─styles
```