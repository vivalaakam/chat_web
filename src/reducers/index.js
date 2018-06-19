/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import outer from './outer'

export default function reducers(ext = {}) {
  return outer(combineReducers({ routing, ...ext }))
}
