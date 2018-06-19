/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { updateState } from '../reducers/outer'
import createReducers from './index'
import { hasWindow } from '../utils/helpers'
import history from '../utils/history'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()


const middleware = [
  thunk,
  sagaMiddleware,
]

if (process.env.NODE_ENV === 'development' && hasWindow) {
  const { createLogger } = require('redux-logger')

  const logger = createLogger({
    actionTransformer: action => ({
      ...action,
      type: String(action.type)
    })
  })


  middleware.push(logger)
}

export default function configureStore(initialState) {
  const middle = [...middleware]
  if (history) {
    const router = require('react-router-redux')
    middle.push(router.routerMiddleware(history))
  }

  const store = createStore(
    createReducers(),
    {},
    compose(applyMiddleware(...middle))
  )

  store.updateState = (state) => {
    const keys = Object.keys(store.getState())
    const filtered = keys.reduce((st, key) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        st[key] = state[key]
      }
      return st
    }, {})

    return store.dispatch(updateState(filtered))
  }
  store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}

  store.updateState(initialState)

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./index', () => {
      import('./index').then((reducerModule) => {
        const createReducersLoaded = reducerModule.default
        const nextReducers = createReducersLoaded({ ...store.asyncReducers })

        store.replaceReducer(nextReducers)
      })
    })
  }

  sagaMiddleware.run(sagas)

  return store
}
