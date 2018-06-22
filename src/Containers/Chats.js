/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import ChatsComponent from '../Components/Chats/Chats'
import { loadableFactory } from '../App'

const mapStateToProps = state => ({
  user: state.user,
  chats: state.chats
})


const Chat = loadableFactory(() => import('./Chat'))

class ChatsContainer extends PureComponent {
  render() {
    return (
      <ChatsComponent
        user={this.props.user}
        chats={this.props.chats}
        location={this.props.location.pathname}
        parentPath={this.props.match.path}
      >
        <Route path={`/chats/:chatId`} component={Chat} />
      </ChatsComponent>
    )
  }
}


export default connect(mapStateToProps)(ChatsContainer)
