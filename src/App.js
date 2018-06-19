import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
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

const Home = loadableFactory(() => import('./Home'))
const About = loadableFactory(() => import('./About'))
const Topics = loadableFactory(() => import('./Topics'))
const Restricted = loadableFactory(() => import('./Restricted'))

const userStore = configureStore(window.__INITIAL_STATE__ || {})

class App extends Component {
  render() {
    return (
      <Wrapper store={userStore}>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/restricted">Restricted</Link></li>
          </ul>

          <hr />

          <Auth />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/Restricted" component={Restricted} />
          </Switch>
        </div>
      </Wrapper>
    )
  }
}

export default App
