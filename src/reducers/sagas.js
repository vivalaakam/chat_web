/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { all, call, fork } from 'redux-saga/effects'
import { router } from 'redux-saga-router'
import history from '../utils/history'

import { onChatInit, watcher as chatWatcher } from './chat'
import { watcher as userWatcher } from './user'
import { watcher as chatsWatcher } from './chats'
import { watcher as usersWatcher } from './users'

const routes = {
  * '/chats/:chatId'({ chatId }) {
    yield call(onChatInit, { payload: chatId })
  }
}

export default function* rootSaga() {
  const sagas = [
    chatWatcher(),
    userWatcher(),
    chatsWatcher(),
    usersWatcher()
  ]

  if (history) {
    sagas.unshift(router(history, routes))
  }

  yield fork(all, sagas)
}
