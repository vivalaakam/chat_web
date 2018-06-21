/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import MessagesComponent from '../Components/Chat/Messages'
import { chatLoad } from '../reducers/chat'

const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user,
  chat: state.chat
})

const mapDispatchToProps = dispatch => ({
  loadMessages() {
    dispatch(chatLoad())
  }
})

class MessagesContainer extends PureComponent {
  componentDidMount() {
    this.mounted = true
  }

  render() {
    return (
      <MessagesComponent
        className={this.props.className}
        messages={this.props.messages}
        user={this.props.user}
        loadMessages={this.loadMessages}
      />
    )
  }

  loadMessages = () => {
    if (this.props.chat.can_load && !this.props.chat.loading && this.mounted) {
      this.props.loadMessages()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
