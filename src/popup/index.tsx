import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './style/index.scss'
// Shared components
import CompA from '../components/CompA'
// Private components
import App from './components/App'

/**
 * Shared component
 */

ReactDOM.render(
  <div><App/><CompA/></div>,
  document.getElementById('root') as HTMLElement
)
