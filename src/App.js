import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import Wrapper from './Wrapper'
import Loading from './Loading'
import configureStore from './reducers/store'

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

const Auth = loadableFactory(() => import('./Auth'))
const Home = loadableFactory(() => import('./Home'))
const About = loadableFactory(() => import('./About'))
const Topics = loadableFactory(() => import('./Topics'))
const Restricted = loadableFactory(() => import('./Restricted'))

const userStore = configureStore(window.__INITIAL_STATE__ || {})

class App extends Component {
  render() {
    return (
      <Wrapper store={userStore}>
        <Switch>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/auth">Auth</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
              <li><Link to="/restricted">Restricted</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Auth} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/Restricted" component={Restricted} />
          </div>
        </Switch>
      </Wrapper>
    )
  }
}

export default App
