/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import AuthComponent from '../Components/Auth/Auth'
import { userApply } from '../reducers/user'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispathToProps = dispatch => ({
  applyAuth(data) {
    dispatch(userApply(data))
  }
})

class Auth extends PureComponent {
  render() {
    if (this.props.user.id) {
      return null
    }

    return (
      <AuthComponent applyAuth={this.props.applyAuth} />
    )
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Auth)
