/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import styles from './Chats.scss'
import ChatRowComponent from './ChatRow'
import Btn from '../UI/Btn/Btn'

export default class ChatsComponent extends PureComponent {
  render() {
    return (
      <div className={styles.Chats}>
        <div className={styles.list}>
          <Btn onClick={this.onCreate} className={styles.create}>
            Новый чат
          </Btn>
          {this.renderChats()}
        </div>
        <TransitionGroup className={styles.messages}  timeout={3000}>
          <CSSTransition classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.enterActive,
          }} timeout={2300}>
            {this.props.children}
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }

  renderChats() {
    return this.props.chats.map(chat => (
      <ChatRowComponent location={this.props.location} chat={chat} user={this.props.user} key={chat.id} />
    ))
  }

  onCreate = () => {
    this.props.history.push('/chats')
  }
}
