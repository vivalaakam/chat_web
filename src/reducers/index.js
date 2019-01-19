/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import messages from './messages'
import outer from './outer'
import users from './users'
import chats from './chats'
import user from './user'
import chat from './chat'

export default function reducers(history, ext = {}) {
  return outer(combineReducers({ router: connectRouter(history), user, chat, chats, users, outer, messages, ...ext }))
}
