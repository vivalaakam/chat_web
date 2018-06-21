/**
 * Created by vivalaakam on 07.05.2018.
 *
 * @flow
 */
import { Socket } from 'phoenix'
import { eventChannel } from 'redux-saga'
import { createAction } from 'redux-actions'
import { cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import Chats from '../api/chats'
import { getMessages, messagesReset, messagesUpdate } from './messages'
import { getUser } from './user'
import { getCurrentDateTime } from '../utils/date'

const $$initialState = {
  loaded: false,
  loading: false,
  can_load: true
}

const chatsAPI = new Chats()

export const CHAT_INIT = 'CHAT_INIT'
export const CHAT_LOAD = 'CHAT_LOAD'
export const CHAT_RESET = 'CHAT_RESET'
export const CHAT_UPDATE = 'CHAT_UPDATE'
export const CHAT_UNMOUNT = 'CHAT_UNMOUNT'
export const CHAT_MESSAGE = 'CHAT_MESSAGE'

export default function chat($$state = $$initialState, { type, payload }) {
  switch (type) {
    case CHAT_RESET:
      return {
        ...$$initialState,
        ...payload
      }
    case CHAT_UPDATE:
      return {
        ...$$state,
        ...payload
      }
    default:
      return $$state
  }
}

export const chatInit = createAction(CHAT_INIT)
export const chatLoad = createAction(CHAT_LOAD)
export const chatReset = createAction(CHAT_RESET)
export const chatUpdate = createAction(CHAT_UPDATE)
export const chatUnmount = createAction(CHAT_UNMOUNT)
export const chatMessage = createAction(CHAT_MESSAGE)

export const getChat = state => state.chat

let chatSubscription

export function* onChatInit({ payload }) {
  try {
    if (chatSubscription) {
      yield cancel(chatSubscription)
    }
    const resp = yield chatsAPI.fetch(payload)
    yield put(chatUpdate({ ...resp.data, can_load: resp.data.messages.length === 25 }))
    yield put(messagesReset(resp.data.messages))

    const user = yield select(getUser)
    chatSubscription = yield fork(chatSubscribe, resp.data.id, user.token)
  } catch (e) {
    console.log('onChatInit', e.message)
  }
}


function* chatSubscribe(chatId, guardian_token) {
  let subscription
  try {

    subscription = eventChannel((emitter) => {
      const socket = new Socket(`${process.env.PROXY_SERVER.replace(/^http/, 'ws')}/socket`, {
        params: { guardian_token }
      })

      socket.connect()

      const chan = socket.channel(`chat:${chatId}`, {})
      chan.join()
      chan.on('on_message', emitter)

      return () => {
        socket.disconnect()
      }
    })

    while (true) {
      const data = yield take(subscription)
      yield put(messagesUpdate([data]))
      yield put(chatUpdate({ last_message: data }))
    }

  } catch (e) {
    console.log('chatSubscribe', e.message)
  } finally {
    if (subscription.close) {
      subscription.close()
    }
  }
}

function* onChatMessage({ payload }) {
  try {
    const chat = yield select(getChat)
    yield chatsAPI.message(chat.id, payload.trim())
  } catch (e) {
    console.log('onChatMessage', e.message)
  }
}

function* onChatLoad() {
  try {
    yield put(chatUpdate({ loading: true }))
    const chat = yield select(getChat)
    const msgs = yield select(getMessages)
    const last = msgs[0]
    const messages = yield chatsAPI.messages(chat.id, getCurrentDateTime(last.inserted_at))
    yield put(chatUpdate({ loading: false, can_load: messages.data.length === 25, loaded: true }))
    yield put(messagesUpdate(messages.data))
  } catch (e) {
    console.log('onChatLoad', e.message)
  }
}

function* onChatUnmount() {
  try {
    yield put(chatReset({}))
    yield put(messagesReset([]))
    if (chatSubscription) {
      yield cancel(chatSubscription)
    }
  } catch (e) {
    console.log('onChatUnmount', e.message)
  }
}

export function* watcher() {
  yield fork(takeLatest, CHAT_INIT, onChatInit)
  yield fork(takeLatest, CHAT_LOAD, onChatLoad)
  yield fork(takeLatest, CHAT_UNMOUNT, onChatUnmount)
  yield fork(takeLatest, CHAT_MESSAGE, onChatMessage)
}
