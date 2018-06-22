/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import styles from './Chats.scss'
import ChatRowComponent from './ChatRow'
import Chat from '../../Containers/Chat'

export default class ChatsComponent extends PureComponent {
  render() {
    return (
      <div className={styles.Chats}>
        <div className={styles.list}>
          {this.renderChats()}
        </div>
        {this.props.children}
      </div>
    )
  }

  renderChats() {
    return this.props.chats.map(chat => (
      <ChatRowComponent parentUri={this.props.parentUri} chat={chat} user={this.props.user} key={chat.id} />
    ))
  }
}
