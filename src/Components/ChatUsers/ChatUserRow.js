/**
 * Created by vivalaakam on 19.01.2019.
 *
 * @flow
 */
import React from 'react'
import styles from './ChatUserRow.scss'
import Btn from '../UI/Btn/Btn'

export default function ChatUserRow({ user, onPressUser }) {
  const onClick = () => {
    onPressUser(user.id)
  }

  return (
    <div className={styles.ChatUserRow}>
      <span>
        {user.name}
      </span>
      <Btn onClick={onClick} className={styles.create}>
        Написать
      </Btn>
    </div>
  )
}
