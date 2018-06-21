/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import styles from './Chats.scss'
import ChatRowComponent from './ChatRow'
import { loadableFactory } from '../../App'

const Chat = loadableFactory(() => import('../../Containers/Chat'))


export default class ChatsComponent extends PureComponent {
  render() {
    return (
      <div className={styles.Chats}>
        <div className={styles.list}>
          {this.renderChats()}
        </div>
        <Route path={`/chats/:chatId`} component={Chat} />
      </div>
    )
  }

  renderChats() {
    return this.props.chats.map(chat => (
      <ChatRowComponent parentUri={this.props.parentUri} chat={chat} user={this.props.user} key={chat.id} />
    ))
  }
}
