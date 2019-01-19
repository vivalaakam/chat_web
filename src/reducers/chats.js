/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import { fork, put, select, takeLatest } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { getUser, USER_UPDATE } from './user'
import Chats from '../api/chats'

const chatsApi = new Chats()

const $$initialState = []

const CHATS_UPDATE = 'CHATS_UPDATE'
const CHATS_RESET = 'CHATS_RESET'
const CHATS_ADD = 'CHATS_ADD'

function replace($$state, item) {
  const tmp = $$state.reduce((state, chat) => ({ ...state, [chat.id]: chat }), {})

  tmp[item.id] = item

  return sort(Object.values(tmp))
}

function sort($$state) {
  return $$state
    .map(c => ({
      ...c,
      last: c.last || new Date((c.last_message && c.last_message.inserted_at) || new Date(c.inserted_at))
    }))
    .sort((a, b) => b.last - a.last)
}

export default function chats($$state = $$initialState, { type, payload }) {
  switch (type) {
    case CHATS_UPDATE:
      return replace($$state, payload)
    case CHATS_RESET:
      return sort(payload)
    case CHATS_ADD:
      return sort($$state.concat(payload))
    default:
      return $$state
  }
}

export const chatsReset = createAction(CHATS_RESET)
export const chatsAdd = createAction(CHATS_ADD)
export const chatsUpdate = createAction(CHATS_UPDATE)

function* onChatsUpdate() {
  try {
    const { token } = yield select(getUser)
    if (token) {
      const chats = yield chatsApi.all()
      yield put(chatsReset(chats.data))
    } else {
      yield put(chatsReset([]))
    }
  } catch (e) {
    console.log('init', e.message)
  }
}

export function* watcher() {
  yield fork(onChatsUpdate)
  yield fork(takeLatest, USER_UPDATE, onChatsUpdate)
}
