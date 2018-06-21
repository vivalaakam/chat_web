/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import InfiniteProgress from '../UI/InfiniteProgress/InfiniteProgress'
import styles from './Loading.scss'

export default class Loading extends PureComponent {
  render() {
    return (
      <div className={styles.Loading}>
        <InfiniteProgress />
      </div>
    )
  }
}
