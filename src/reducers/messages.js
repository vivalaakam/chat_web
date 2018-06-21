/**
 * Created by vivalaakam on 07.05.2018.
 *
 * @flow
 */

import { createAction } from 'redux-actions'

const $$initialState = []

const MESSAGES_UPDATE = 'MESSAGES_UPDATE'
const MESSAGES_RESET = 'MESSAGES_RESET'

function prepareMessages($$state, payload) {
  if (payload.length === 0) {
    return $$state
  }

  const messages = payload.map(message => ({
    ...message,
    inserted_at: new Date(message.inserted_at)
  }))
  const sorted = $$state.concat(messages).sort((a, b) => a.inserted_at - b.inserted_at)

  let prev = sorted.shift()
  let curr = sorted.shift()

  const res = [prev]

  while (sorted.length) {
    curr.in_block = prev.sender_id === curr.sender_id
    res.push(curr)
    prev = curr
    curr = sorted.shift()
  }
  if (!!curr) {
    res.push(curr)
  }
  return res
}

export default function messages($$state = $$initialState, { type, payload }) {
  switch (type) {
    case MESSAGES_RESET: {
      return prepareMessages($$initialState, payload)
    }
    case MESSAGES_UPDATE: {
      return prepareMessages($$state, payload)
    }
    default:
      return $$state
  }
}

export const getMessages = state => state.messages

export const messagesUpdate = createAction(MESSAGES_UPDATE)
export const messagesReset = createAction(MESSAGES_RESET)
