/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './utils/history'

export default function Wrapper({ store, children }) {
  if (history) {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
