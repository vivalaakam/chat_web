/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import styles from './Chat.scss'
import MessagesContainer from '../../Containers/Messages'
import TextArea from '../UI/TextArea/TextArea'
import Btn from '../UI/Btn/Btn'
import CloseBtn from '../UI/CloseBtn/CloseBtn'

export default class ChatComponent extends PureComponent {
  getTitle() {
    if (!this.props.chat.is_private) {
      return this.props.chat.name
    }

    return this.props.chat.users.filter(u => u.id !== this.props.user.id).map(u => u.name).join(', ')
  }

  onSend = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.message.value)
    this.message.value = ''
  }

  refMessage = (ref) => {
    this.message = ref
  }

  render() {
    return (
      <div className={styles.Chat}>
        <div className={styles.header}>
          <div>{this.getTitle()}</div>
          <CloseBtn onClick={this.props.onClose} />
        </div>
        <MessagesContainer className={styles.messages} />
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={this.onSend}>
            <TextArea name="message" className={styles.textArea} link={this.refMessage} />
            <Btn onClick={this.onSend}>Отправить</Btn>
          </form>
        </div>
      </div>
    )
  }
}
