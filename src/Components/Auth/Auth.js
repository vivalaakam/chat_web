/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import Modal from '../Modal/Modal'

import styles from './Auth.scss'
import Btn from '../UI/Btn/Btn'
import loginPopup from '../../utils/loginPopup'

export default class Auth extends PureComponent {
  render() {
    return (
      <Modal className={styles.Auth}>
        <Btn onClick={this.onClickFacebook} scheme="facebook">
          Login with Facebook
        </Btn>
        <Btn onClick={this.onClickGoogle} scheme="google">
          Login with Google
        </Btn>
      </Modal>
    )
  }

  onClickFacebook = (e) => {
    if (e) {
      e.preventDefault()
    }
    loginPopup('facebook')
      .then((data) => {
        this.props.applyAuth(data)
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(error.message)
      })
  }

  onClickGoogle = (e) => {
    if (e) {
      e.preventDefault()
    }

    loginPopup('google')
      .then((data) => {
        this.props.applyAuth(data)
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(error.message)
      })
  }
}
