# qlyplayer-vue

一个音乐播放器播放界面(含歌曲列表)

基于Vue3+TypeScript+Vite,
从[NOTF-API/QLYAudioPlayer](https://github.com/NOTF-API/QLYAudioPlayer)移植而来

DEMO:[在线体验](http://player.notf.top:5000/)

## 版权问题
注:项目内 音乐/歌词/封面 仅可用于学习用途，如有侵权，请联系删除。
禁止用于商用用途，若商用，请自行购买音乐版权

## 项目安装与依赖

```sh
git clone https://github.com/NOTF-API/qlyplayer-vue
cd qlyplayer-vue
yarn
```

## 推荐安装的VSCode插件
+ TypeScript Vue Plugin (Volar)
+ Vue Language Features (Volar)

## 项目命令
+ 安装依赖
```sh
yarn
```
+ 开发环境运行
```sh
yarn dev
```

+ 打包并检查
```sh
yarn build
  ```

+ 生成新的歌曲信息 (目前该功能还正在开发)
```sh
yarn build-api
```
    注意:需要将新的歌曲/歌词/歌曲封面放置到source文件夹下，(同一音乐需要文件名相同),然后运行该指令,该命令会自动生成一个api.json以支持新的音乐会被导入并正确播放
+ 仅打包
```sh
yarn build-only
```

+ 检查类型错误
```sh
yarn type-check
```

+ Lint
```sh
yarn lint
```
# Q&A
Q: 相比原来的版本，修改了哪些内容？

A:
+ 修复了页面的适配问题，现在可以适配100%-150%缩放，并支持手机端
+ 修复了歌词会因为拖动进度条混乱的问题
+ 新增了用户友好的加载提示
+ 删除了音量条
+ 暂时删除了频谱图的显示
+ 新增了碟片的唱针的动态效果
+ 新增了可以用户自选的歌曲列表
+ 优化了在网络不佳的情况的表现
+ 修复了全屏的BUG
+ 新增了一些错误提示
+ 优化了动画效果的性能
+ 大大减小了打包体积
+ 优化UI设计,扁平化UI设计
---
Q: 为什么重构了该项目？

A: 原项目为2年前的任务所作，工期很短，有很多的不足之处，并且由于使用原生JS实现的功能，代码量大，基本不分模块，容易出错，不支持很多浏览器




