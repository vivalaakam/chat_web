/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Loading from '../Components/Chat/Loading'

const mapStateToProps = state => ({
  loaded: state.chat.loaded,
  loading: state.chat.loading
})

class LoadingContainer extends PureComponent {
  render() {
    if (!(this.props.loaded && this.props.loading)) {
      return null
    }
    return (
      <Loading />
    )
  }
}

export default connect(mapStateToProps)(LoadingContainer)
