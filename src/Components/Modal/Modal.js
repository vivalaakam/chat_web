/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './Modal.scss'

const modalRoot = document.getElementById('modal')

export default class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.renderWrapper(),
      this.el
    )
  }

  renderWrapper() {
    const style = classnames(styles.wrapper, this.props.className)
    return (
      <div className={styles.Modal}>
        <div className={style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
