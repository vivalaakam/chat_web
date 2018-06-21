/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */

import React from 'react'
import PropTypes from 'prop-types'

import style from './TextArea.scss'

export default function TextArea({ onChange, onBlur, onKeyDown, value, link, name, placeholder = '' }) {
  return (
    <textarea
      className={style.TextArea}
      ref={c => (link && link(c))}
      {...{ name, value, placeholder, onChange, onBlur, onKeyDown }}
    />
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func,
  type: PropTypes.string
}
