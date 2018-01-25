import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CompA from '../../../src/components/CompA'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CompA />, div)
})
