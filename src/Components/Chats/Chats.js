/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'

import styles from './Chats.scss'
import ChatRowComponent from './ChatRow'

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
      <ChatRowComponent location={this.props.location} chat={chat} user={this.props.user} key={chat.id} />
    ))
  }
}
