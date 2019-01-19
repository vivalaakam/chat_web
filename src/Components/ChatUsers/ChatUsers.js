/**
 * Created by vivalaakam on 19.01.2019.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import ChatUserRow from './ChatUserRow'

export default class ChatUsers extends PureComponent {
  render() {
    return this.renderList()
  }

  renderList() {
    return this.props.users.map((user) => (
      <ChatUserRow key={user.id} user={user} onPressUser={this.props.onPressUser} />
    ))
  }
}
