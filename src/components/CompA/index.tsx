/**
 * Shared component
 */
import * as React from 'react'
import './style/index.scss'

class Comp extends React.Component<{}, any> {
  _greet = () => {
    browser.runtime.sendMessage({ type: 'GREETING' })
      .then(response => alert(`Background Script: "${response}"`))
      .catch(console.error)
  }

  render () {
    return (
      <div className='comp-a'>
        <h1 className='comp-a-title'>This is a shared component</h1>
        <button onClick={this._greet}>Say Hi to Background Script!</button>
      </div>
    )
  }
}

export default Comp
