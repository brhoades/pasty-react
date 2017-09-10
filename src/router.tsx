import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import ViewPaste from './containers/viewpaste'
import CreatePaste from './containers/createpaste'
import createStore from './store'


ReactDOM.render((
  <Provider store={createStore()}>
    <HashRouter>
      <div>
        <Route exact path="/" component={CreatePaste}/>
        <Route exact path="/view/:id/:key" component={ViewPaste}/>
      </div>
    </HashRouter>
  </Provider>
), document.getElementById('app'))
