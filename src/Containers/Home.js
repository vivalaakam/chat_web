/**
 * Created by vivalaakam on 18.01.2019.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

class HomeContainer extends PureComponent {
  render() {
    return (
      <Redirect to="/chats" />
    )
  }
}


export default HomeContainer
