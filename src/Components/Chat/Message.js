/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import styles from './Message.scss'

export default class MessageComponent extends PureComponent {
  render() {
    const style = classnames(styles.Message, this.props.user.id === this.props.item.sender_id ? styles.outgoing : styles.incomming)

    return (
      <div className={style}>{this.props.item.message}</div>
    )
  }
}
