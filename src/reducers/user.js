/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { createAction } from 'redux-actions'
import { fork, put, takeLatest } from 'redux-saga/effects'
import token from '../utils/token'
import PushManager from '../utils/PushManager'

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
    yield put(userUpdate(payload))
    token.setToken(payload.token)

    const subscription = yield PushManager.single.subscribeUser()

    if (subscription) {
      localStorage.setItem('subscription', subscription.data.id)
    }

  } catch (e) {
    console.log('userApplyAction', e.message)
  }
}

export function getUser(state) {
  return state.user
}

export function* watcher() {
  yield fork(takeLatest, USER_APPLY, userApplyAction)
}
