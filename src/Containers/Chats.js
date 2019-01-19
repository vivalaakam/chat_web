/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import ChatsComponent from '../Components/Chats/Chats'
import { loadableFactory } from '../App'
import ChatUsers from './ChatUsers'

const mapStateToProps = state => ({
  user: state.user,
  chats: state.chats
})


const Chat = loadableFactory(() => import('./Chat'))

class ChatsContainer extends PureComponent {
  render() {
    if (!(this.props.user && this.props.user.id)) {
      return null
    }

    return (
      <ChatsComponent
        user={this.props.user}
        chats={this.props.chats}
        history={this.props.history}
        location={this.props.location.pathname}
        parentPath={this.props.match.path}
      >
        <Switch>
          <Route exact path={`/chats`} component={ChatUsers} />
          <Route path={`/chats/:chatId`} component={Chat} />
        </Switch>
      </ChatsComponent>
    )
  }
}


export default connect(mapStateToProps)(ChatsContainer)
