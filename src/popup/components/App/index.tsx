import * as React from 'react'
import './style/index.scss'
const logo = require('../../../assets/logo.svg')

class Comp extends React.Component<{}, any> {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Create React Typescript Sass Webextension</h2>
        </div>
        <p className='App-intro'>
          Check <a href='https://github.com/crimx/create-react-typescript-sass-webextension' target='_blank' rel='noopener'>README</a> for instructions.
        </p>
      </div>
    )
  }
}

export default Comp
