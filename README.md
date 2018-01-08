# Create React Typescript Sass Webextension

Battery-included starter-kit, minimum configuration yet flexible.

[中文](https://github.com/crimx/create-react-typescript-sass-webextension/blob/master/docs/zh-CN.md)

- React, TypeScript and Sass support
- Unit testing with Jest (with jest-webextension-mock)
- Fake Webextension environment for easy-tweaking UI
- Auto-generates entries
- Separate outputs for Chrome and Firefox with different manifests

# Install

```bash
git clone git@github.com:crimx/create-react-typescript-sass-webextension.git
cd create-react-typescript-sass-webextension
git remote set-url [your repo url]
yarn install
```

# Commands

- `yarn start` for tweaking UI with fake Webextension environment
  - I mostly faked the runtime messaging and storage to mimic real api. If you need more, edit [`config/fake-env/webextension-page.js`](https://github.com/crimx/create-react-typescript-sass-webextension/blob/master/config/fake-env/webextension-page.js).
  - `popup` page is loaded by default. If you need to change to other entry, `options` page for example, run `yarn start --main=options`.
  - `background` script is always loaded (if exist).
  - Edit `config/fake-env/fake-ajax` to fake ajax calls.
- `yarn test` for Jest testing.
  - `yarn test --coverage` to show coverage.
  - `jest-webextension-mock` is included, though it's not a complete mock.
- `yarn build` for full build.
  - Outputs for Chrome and Firefox are generated in `build` directory, respectively.
- `yarn devbuild` for building without compression.
- Append ` --debug` to enable `process.env.DEBUG_MODE`.

# Usage

In most cases you should find youself only dealing with things in `src`:

- This boilerplate comes with three common parts of a typical extension - `backgroud`, `content` and `popup`, which can be simpily deleted if you don't need them. Webpack entries are auto-generated.
- If you need to add more pages or scripts, just add a directory in `src`. The directory name will be used as entry name. Inside the directory there should be a `index.(js|jsx|ts|tsx)` file and an `index.html` for template if you need to generate HTML file too. See [popup](https://github.com/crimx/create-react-typescript-sass-webextension/tree/master/src/popup) for example.
- `background`, `components`, `assets` and `manifest` are reserved names.
  - `background` is for backgournd script. Other entries won't be loaded to the fake Webextension environment.
  - `components` is for shared components.
  - `assets` is for static assets.
  - `manifest` is for generating `manifest.json`.
- If you need to add a directory in `src` but don't want it to be an entry, prepend `_` to the directory name.
- Version in `src/manifest/common.manifest.json` will add 1 to the `patch` place on every build.

# Advanced

The boilerplate uses the TypeScript variation of [Standard](https://github.com/blakeembrey/tslint-config-standard) JavaScript code style, which can be changed in `tslint.json`.

Refer to [create-reate-app](https://github.com/facebookincubator/create-react-app) for more options, may or may not works though.
