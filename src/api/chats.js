/**
 * Created by vivalaakam on 07.05.2018.
 *
 * @flow
 */
import Rest from './rest'
import queryString from 'query-string'

export default class Chats extends Rest {
  constructor() {
    super('api/chats')
  }

  messages(id, last_message = null) {
    return this.getQuery(this.getUrl(`/${id}/messages`, queryString.stringify({ last_message })))
  }

  message(id, message) {
    return this.postQuery(`${this.getUrl()}/${id}/message`, { message: { message } })
  }
}
