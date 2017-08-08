import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import ViewPaste from './containers/viewpaste'
import CreatePaste from './containers/createpaste'


ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path="/" component={CreatePaste}/>
      <Route path="/view" component={ViewPaste}/>
    </div>
  </HashRouter>
), document.getElementById('app'))
