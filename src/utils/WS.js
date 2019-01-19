/**
 * Created by vivalaakam on 19.01.2019.
 *
 * @flow
 */
import { Socket } from 'phoenix'
import token from './token'

export default class WS {
  static single = new WS()

  constructor() {
    this._socket = null
    this._connections = []
  }

  connect() {
    if (!this._socket) {
      const guardian_token = token.getToken()
      this._socket = new Socket(`${process.env.PROXY_SERVER.replace(/^http/, 'ws')}/socket`, {
        params: { guardian_token }
      })
    }

    this._socket.connect()
  }

  disconnect() {
    if (this._socket) {
      this._socket.disconnect()
    }
  }

  join(name, params = {}) {
    if (!this._socket) {
      this.connect()
    }

    const chan = this._socket.channel(name, params)
    chan.join()

    this._connections.push(chan)

    return chan
  }

  leave(chan) {
    if (this._connections.length) {
      this._connections = this._connections.filter((curr) => curr !== chan)

      if (!this._connections.length) {
        this.disconnect()
      }
    }
  }
}
