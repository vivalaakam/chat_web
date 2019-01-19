/**
 * Created by vivalaakam on 19.01.2019.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { usersPrivateChat } from '../reducers/users'
import ChatUsers from '../Components/ChatUsers/ChatUsers'

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = dispatch => ({
  onPressUser(id) {
    dispatch(usersPrivateChat({ id }))
  }
})

class ChatUsersContainer extends PureComponent {
  render() {
    return (
      <ChatUsers users={this.props.users} onPressUser={this.props.onPressUser} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUsersContainer)
