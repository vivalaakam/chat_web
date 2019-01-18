import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Wrapper from './Wrapper'
import Loading from './Loading'
import configureStore from './reducers/store'
import Auth from './Containers/Auth'
import Home from './Containers/Home'
import Terms from './Containers/Terms'

export function loadableFactory(loader) {
  return Loadable({
    loader,
    loading: Loading,
    render(loaded, props) {
      const Comp = loaded.default
      return <Comp {...props} />
    }
  })
}

const Chats = loadableFactory(() => import('./Containers/Chats'))

const userStore = configureStore(window.__INITIAL_STATE__ || {})

class App extends Component {
  render() {
    return (
      <Wrapper store={userStore}>
        <div id="inner">
          <Auth />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chats" component={Chats} />
            <Route path="/terms" component={Terms} />
          </Switch>
        </div>
      </Wrapper>
    )
  }
}

export default App
