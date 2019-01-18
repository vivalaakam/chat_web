import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import Wrapper from './Wrapper'
import Loading from './Loading'
import configureStore from './reducers/store'
import Auth from './Containers/Auth'

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
          {/*<Redirect to="/chats" />*/}

          <Route path="/chats" component={Chats} />
        </div>
      </Wrapper>
    )
  }
}

export default App
