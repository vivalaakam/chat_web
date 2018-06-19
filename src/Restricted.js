/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */
import React from 'react'
import { Redirect } from 'react-router-dom'

const Restricted = (props) => {
  return (
    <Redirect
      to={{
        pathname: '/auth',
        state: { from: props.location }
      }}
    />
  )
}

export default Restricted
