/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React from 'react'
import style from './InfiniteProgress.scss'

export default function InfiniteProgress() {
  return (
    <div className={style.InfiniteProgress}>
      <i className={style.dot}>&nbsp;</i>
    </div>
  )
}
