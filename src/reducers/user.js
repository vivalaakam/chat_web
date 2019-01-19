/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { createAction } from 'redux-actions'
import { fork, put, select, take, takeLatest } from 'redux-saga/effects'
import token from '../utils/token'
import PushManager from '../utils/PushManager'
import { eventChannel } from 'redux-saga'
import WS from '../utils/WS'
import { chatsUpdate } from './chats'

const $$initialState = {
  loaded: false
}

export const USER_UPDATE = 'USER_UPDATE'
const USER_APPLY = 'USER_APPLY'


export default function user($$state = $$initialState, { type, payload }) {
  switch (type) {
    case USER_UPDATE:
      return {
        ...$$state,
        ...payload
      }
    default:
      return $$state
  }
}

export const userUpdate = createAction(USER_UPDATE)
export const userApply = createAction(USER_APPLY)

function* userApplyAction({ payload }) {
  try {
    token.setToken(payload.token)

    const subscription = yield PushManager.single.subscribeUser()

    if (subscription) {
      localStorage.setItem('subscription', subscription.data.id)
    }
    yield fork(userSubscribe)
    yield put(userUpdate(payload))
  } catch (e) {
    console.log('userApplyAction', e.message)
  }
}

function* userSubscribe() {
  let subscription
  try {
    const user = yield select(getUser)
    subscription = eventChannel((emitter) => {
      const chan = WS.single.join(`user:${user.id}`, {})
      chan.on('on_chat', emitter)

      return () => {
        WS.single.leave(chan)
      }
    })

    while (true) {
      const data = yield take(subscription)
      yield put(chatsUpdate(data))
    }

  } catch (e) {
    console.log('chatSubscribe', e.message)
  } finally {
    if (subscription.close) {
      subscription.close()
    }
  }
}

export function getUser(state) {
  return state.user
}

export function* watcher() {
  yield fork(takeLatest, USER_APPLY, userApplyAction)

  if (token.getToken()) {
    yield fork(userSubscribe)
  }
}
