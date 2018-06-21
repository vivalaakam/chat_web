/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
import React from 'react'
import styles from './CloseBtn.scss'

export default function CloseBtn({ onClick }) {
  return (
    <button className={styles.CloseBtn} onClick={onClick}></button>
  )
}
