# Create React Typescript Sass Webextension

[![Build Status](https://travis-ci.org/crimx/create-react-typescript-sass-webextension.svg)](https://travis-ci.org/crimx/create-react-typescript-sass-webextension)
[![Greenkeeper badge](https://badges.greenkeeper.io/crimx/create-react-typescript-sass-webextension.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

Battery-included starter-kit, minimum configuration yet flexible and powerful.

[中文](https://github.com/crimx/create-react-typescript-sass-webextension/blob/master/docs/zh-CN.md)

- React, TypeScript and Sass support
- Unit testing with Jest and sinon-chrome
- Fake Webextension environment for easy-tweaking UI
- Auto-generates entries
- Separate outputs for Chrome and Firefox with different manifests

# Install

<pre>
git clone git@github.com:crimx/create-react-typescript-sass-webextension.git <strong>YourRepoName</strong>
cd <strong>YourRepoName</strong>
git remote set-url git@github.com:<strong>YourUserName</strong>/<strong>YourRepoName</strong>.git
yarn install
</pre>

# Commands

## Building

- `yarn start` for tweaking UI with fake Webextension environment
  - I mostly faked the runtime messaging and storage to mimic real api. If you need more, edit [`config/fake-env/webextension-page.js`](https://github.com/crimx/create-react-typescript-sass-webextension/blob/master/config/fake-env/webextension-page.js).
  - `popup` page is loaded by default. If you need to change to other entry, `options` page for example, run `yarn start --main=options`.
  - `background` script is always loaded (if exist).
  - Edit `config/fake-env/fake-ajax` to fake ajax calls.
- `yarn test` for Jest testing.
  - `yarn test --coverage` to show coverage.
  - `sinon-chrome` is included, and typings are all set up.
- `yarn build` for full build.
  - Outputs for Chrome and Firefox are generated in `build` directory, respectively.
  - Run `yarn release` before building to get the updated version number.
- `yarn devbuild` for building without compression.
- Append ` --debug` to enable `process.env.DEBUG_MODE`.

## Git

- `yarn commit` to commit with [conventional](https://conventionalcommits.org) commit style. You can also use [vscode-commitizen](https://github.com/KnisterPeter/vscode-commitizen) extension in VSCode.
- `yarn release` to bump version (auto-calculated) and update CHANGELOG.

# Usage

You only need to deal with things within `src` in most of the cases:

- This boilerplate comes with three common parts of a typical extension - `backgroud`, `content` and `popup`, which can be simpily deleted if you don't need them. Webpack entries are auto-generated.
- If you need to add more pages or scripts, just add a directory in `src`. The directory name will be used as entry name. Inside the directory there should be a `index.(js|jsx|ts|tsx)` file and an `index.html` for template if you need to generate HTML file too. See [popup](https://github.com/crimx/create-react-typescript-sass-webextension/tree/master/src/popup) for example.
- `background`, `components`, `assets` and `manifest` are reserved names.
  - `background` is for backgournd script. Other entries won't be loaded to the fake Webextension environment.
  - `components` is for shared components.
  - `assets` is for static assets.
  - `manifest` is for generating `manifest.json`.
- If you need to add a directory in `src` but don't want it to be an entry, prepend `_` to the directory name.

# Advanced

## Automatic Dependency Updates

You can set up [travis CI](travis-ci.org) and [greenkeeper](https://greenkeeper.io) to update dependencies automatically.

If you need to let greenkeeper update the lockfile as well, see [greenkeeper-lockfile](https://github.com/greenkeeperio/greenkeeper-lockfile).

## Commit Style

The boilerplate uses the [conventional](https://conventionalcommits.org) commit style. If you need to change that, see [commitlint](https://github.com/marionebl/commitlint#shared-configuration) and [commitizen](https://github.com/commitizen/cz-cli#adapters).

## Code Style

The boilerplate uses the TypeScript variation of [Standard](https://github.com/blakeembrey/tslint-config-standard) JavaScript code style, which can be changed in `tslint.json`.

## More Options

Supports most of the [create-reate-app](https://github.com/facebookincubator/create-react-app) options.
