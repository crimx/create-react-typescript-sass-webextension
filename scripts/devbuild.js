'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.PUBLIC_URL = './'

const argv = require('minimist')(process.argv.slice(2))
if (argv.debug) { process.env.DEBUG_MODE = true }

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})


const version = require('../package.json').version

// Ensure environment variables are read.
require('../config/env')

const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.config.devbuild')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')
const semver = require('semver')
const chokidar = require('chokidar')

const browser = ['chrome', 'opera', 'firefox', 'edge']
  .find(name => argv[name] === true)
  || 'chrome'


const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
const useYarn = fs.existsSync(paths.yarnLockFile)

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const appBuildPath = path.join(paths.appBuild, browser)

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(appBuildPath)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(appBuildPath)

    Promise.all([copyAssets(), generateManifest()])
    .then(() => {
      watchAssets()
      watchManifest()
    })

    // Start the webpack build
    return build(previousFileSizes)
  })

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log(`Creating an development build for ${browser}...`)

  let compiler = webpack(config)

  compiler.watch({ignored: /node_modules/}, (err, stats) => {
    if (err) {
      return printBuildError(err)
    }
    const messages = formatWebpackMessages(stats.toJson({}, true))
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1
      }
      return printBuildError(messages.errors.join('\n\n'))
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'))
      console.log(messages.warnings.join('\n\n'))
      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      )
      console.log(
        'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
      )
    } else {
      console.log(chalk.green('Compiled successfully.\n'))
    }

    console.log('File sizes after gzip:\n')
    printFileSizesAfterBuild(
      stats,
      previousFileSizes,
      // only show the basename
      browser + '/', // paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    )
    console.log()
  })
}

function watchAssets () {
  chokidar
    .watch(path.join(__dirname, '../public'), {ignoreInitial: true})
    .on('all', copyAssets)
}

function copyAssets () {
  return fs.copy(paths.appPublic, appBuildPath, {
    dereference: true,
    // ignore files or dirs start with "."
    filter: file => !/[\\\/]+\./.test(file),
  }).then(() => {
    console.log(chalk.green('Assets copied\n'))
  })
}

function watchManifest () {
  chokidar
    .watch(path.join(__dirname, '../src/manifest'), {ignoreInitial: true})
    .on('all', generateManifest)
}

function generateManifest () {
  return Promise.all([
    fs.readJson(require.resolve('../src/manifest/common.manifest.json')),
    fs.readJson(require.resolve(`../src/manifest/${browser}.manifest.json`)),
  ]).then(([commonManifest, browserManifest]) => {
    fs.writeJson(
      path.join(appBuildPath, 'manifest.json'),
      Object.assign({}, commonManifest, browserManifest, { version }),
      { spaces: 2 },
    )
  }).then(() => {
    console.log(chalk.green('Manifest generated\n'))
  })
}
