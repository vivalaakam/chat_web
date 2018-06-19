/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { all, fork } from 'redux-saga/effects'
import { router } from 'redux-saga-router'
import history from '../utils/history'

import { watcher as userWatcher } from './user'

const routes = {}

export default function* rootSaga() {
  const sagas = [
    userWatcher()
  ]

  if (history) {
    sagas.unshift(router(history, routes))
  }

  yield fork(all, sagas)
}
