/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ChatComponent from '../Components/Chat/Chat'
import { chatMessage } from '../reducers/chat'

const mapStateToProps = state => ({
  user: state.user,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({
  onSubmit(message) {
    dispatch(chatMessage(message))
  }
})

class ChatContainer extends PureComponent {
  render() {
    return (
      <ChatComponent
        user={this.props.user}
        chat={this.props.chat}
        onSubmit={this.props.onSubmit}
        onClose={this.onClose}
      />
    )
  }

  onClose = () => {
    this.props.history.push('/chats')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
