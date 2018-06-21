/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import styles from './Messages.scss'
import MessageComponent from './Message'
import Loading from '../../Containers/Loading'

export default class MessagesComponent extends PureComponent {

  componentDidMount() {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  getSnapshotBeforeUpdate() {
    return this.messages.scrollHeight - this.messages.scrollTop
  }

  componentDidUpdate(prevProps, prevStaet, snapshot) {
    this.messages.scrollTop = this.messages.scrollHeight - snapshot
  }

  setRefMessages = (ref) => {
    this.messages = ref
  }

  onScroll = (e) => {
    if (this.messages.scrollTop < 100) {
      this.props.loadMessages()
    }
  }

  render() {
    const style = classnames(styles.Messages, this.props.className)
    return (
      <div className={style} ref={this.setRefMessages} onScroll={this.onScroll}>
        <Loading />
        {this.renderMessages()}
      </div>
    )
  }

  renderMessages() {
    return this.props.messages.map(message => (
      <MessageComponent item={message} user={this.props.user} key={message.id} />))
  }
}
