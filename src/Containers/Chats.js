/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import ChatsComponent from '../Components/Chats/Chats'


const mapStateToProps = state => ({
  user: state.user,
  chats: state.chats
})

class ChatsContainer extends PureComponent {
  render() {
    return (
      <ChatsComponent
        user={this.props.user}
        chats={this.props.chats}
        parentUri={this.props.match.url}
        parentPath={this.props.match.path}
      />
    )
  }
}


export default connect(mapStateToProps)(ChatsContainer)
