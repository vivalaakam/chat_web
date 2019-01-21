/**
 * Created by vivalaakam on 08.05.2018.
 *
 * @flow
 */

import { createAction } from 'redux-actions'
import { push } from 'connected-react-router'
import { fork, put, select, takeLatest } from 'redux-saga/effects'
import Users from '../api/users'
import { getUser } from './user'
import Chats from '../api/chats'
import { chatsUpdate } from './chats'

const userApi = new Users()
const chatApi = new Chats()
const $$initialState = []

export const USERS_UPDATE = 'USERS_UPDATE'
export const USERS_FETCH = 'USERS_FETCH'
export const USERS_RESET = 'USERS_RESET'
export const USERS_PRIVATE_CHAT = 'USERS_PRIVATE_CHAT'
export const USERS_INIT = 'USERS_INIT'

export default function user($$state = $$initialState, { type, payload }) {
  switch (type) {
    case USERS_RESET:
      return payload
    case USERS_UPDATE:
      return $$state.concat(payload)
    default:
      return $$state
  }
}

export const usersUpdate = createAction(USERS_UPDATE)
export const usersReset = createAction(USERS_RESET)
export const usersFetch = createAction(USERS_FETCH)
export const usersPrivateChat = createAction(USERS_PRIVATE_CHAT)

export function* onUsersInit() {
  try {
    const user = yield select(getUser)
    const users = yield userApi.all()
    const data = users.data.filter((u) => (u.id !== user.id))
    yield put(usersReset(data))
  } catch (e) {
    console.log('onUsersInit', e.message)
  }
}

function* onUsersPrivateChat({ payload }) {
  try {
    const user = yield select(getUser)
    const chat = yield chatApi.create({ chat: { name: 'private', is_private: true, users: [payload.id, user.id] } })
    yield put(push(`/chats/${chat.data.id}`))

    yield put(chatsUpdate({
      ...chat.data,
      last: new Date()
    }))
  } catch (e) {
    console.log('onUsersPrivateChat', e.message)
  }
}

export function* watcher() {
  yield fork(takeLatest, USERS_PRIVATE_CHAT, onUsersPrivateChat)
}
