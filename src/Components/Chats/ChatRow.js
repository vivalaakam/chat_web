/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import styles from './ChatRow.scss'

export default class ChatRowComponent extends PureComponent {
  getTitle() {
    if (!this.props.chat.is_private) {
      return this.props.chat.name
    }

    return this.props.chat.users.filter(u => u.id !== this.props.user.id).map(u => u.name).join(', ')
  }

  render() {
    const link = `/chats/${this.props.chat.id}`
    const style = classnames(styles.ChatRow, {
      [styles.active]: link === this.props.location
    })
    return (
      <Link to={link} className={style}>
        <div className={styles.title}>{this.getTitle()}</div>
        {this.props.chat.last_message && <div className={styles.text}>{this.props.chat.last_message.message}</div>}
      </Link>
    )
  }
}
