# Create React Typescript Sass Webextension

[![Build Status](https://travis-ci.org/crimx/create-react-typescript-sass-webextension.svg)](https://travis-ci.org/crimx/create-react-typescript-sass-webextension)
[![Greenkeeper badge](https://badges.greenkeeper.io/crimx/create-react-typescript-sass-webextension.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

零配置 Webextension 开发脚手架，主要针对 Chrome 和 Firefox 浏览器，灵活强大。

- 支持 React, TypeScript 和 Sass
- Jest 测试，内含 sinon-chrome
- 提供虚拟浏览器扩展环境，方便开发 UI
- 自动生成 Webpack 入口
- Chrome 和 Firefox 分别输出，可以用不同的 Manifest

# 安装

```bash
git clone git@github.com:crimx/create-react-typescript-sass-webextension.git
cd create-react-typescript-sass-webextension
git remote set-url [你的仓库 git 地址]
yarn install
```

# 命令

## 构建

- `yarn start` 加载虚拟浏览器扩展环境。
  - 我主要模拟了 runtime message 和 storage 两大块，跟真实行为基本一致。如果需要更多，在 [`config/fake-env/webextension-page.js`](https://github.com/crimx/create-react-typescript-sass-webextension/blob/master/config/fake-env/webextension-page.js) 中添加。
  - 默认加载 `popup` 页面。 如果要换其它入口，比如 `options` 页面，可以运行 `yarn start --main=options`。
  - `background` 脚本会默认加载 (如果存在的话)。
  - 修改 `config/fake-env/fake-ajax` 拦截 ajax 请求。
- `yarn test` 模块测试。
  - `yarn test --coverage` 查看 coverage 结果。
  - 内含 `sinon-chrome` ，TypeScript 类型已调好，直接写代码就行。
- `yarn build` 完整构建项目。
  - 分别输出 Chrome 和 Firefox 结果到 `build` 目录中。
  - 要获得更新后的版本号，先 `yarn release` 再构建。
- `yarn devbuild` 不压缩代码快速构建项目。
- 在命令后添加 ` --debug` 可以开启 `process.env.DEBUG_MODE` 。

## Git

- `yarn commit` 使用 [conventional](https://conventionalcommits.org) 风格 commit 代码。 VSCode 用户还可以用 [vscode-commitizen](https://github.com/KnisterPeter/vscode-commitizen) 扩展。
- `yarn release` 自动计算增加版本号并更新 CHANGELOG 日志。

# 使用

大多数情况下你只需要处理 `src` 下的文件：

- 这个模板自带一个典型扩展的三个主要部分： `backgroud`, `content` 和 `popup` 。不需要的话直接删除就行，Webpack 入口会自动生成。
- 如果需要输出更多的页面或脚本，只需在 `src` 中新建目录，目录名会被用作入口名。目录中应包含一个 `index.(js|jsx|ts|tsx)` 文件。如果需要输出页面的话再添加个 `index.html` 作为模板。可以参考 [popup](https://github.com/crimx/create-react-typescript-sass-webextension/tree/master/src/popup) 页面。
- `background`, `components`, `assets` 和 `manifest` 是预留名称。
  - `background` 用于生成背景脚本，用其它的名字作入口的话虚拟扩展环境不会加载。
  - `components` 放共用的组件。
  - `assets` 放静态文件。
  - `manifest` 用于生成 `manifest.json` 。
- 如果需要在 `src` 目录下添加目录，却又不希望其生成入口，用 `_` 开头的目录名。
- `src/manifest/common.manifest.json` 中的 `version` 会在每次 `build` 后自动给 `patch` 位置加一。

# 高级配置

## 自动更新依赖

可以设置 [travis CI](travis-ci.org) 和 [greenkeeper](https://greenkeeper.io) 来自动更新依赖。

如果需要一并更新 lockfile ，使用 [greenkeeper-lockfile](https://github.com/greenkeeperio/greenkeeper-lockfile) 。

## Commit 风格

本模板使用 [conventional](https://conventionalcommits.org) 风格。如需更换，参考 [commitlint](https://github.com/marionebl/commitlint#shared-configuration) 和 [commitizen](https://github.com/commitizen/cz-cli#adapters) 配置。

## 代码风格

本模板使用 TypeScript 版本的 [Standard](https://github.com/blakeembrey/tslint-config-standard) JavaScript 代码风格，可以在 `tslint.json` 中修改。

## 更多配置

参考 [create-reate-app](https://github.com/facebookincubator/create-react-app) ，大部分支持。
