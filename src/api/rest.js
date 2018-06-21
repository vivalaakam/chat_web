/**
 * Created by vivalaakam on 04.05.2018.
 *
 * @flow
 */

import token from '../utils/token'

export default class Rest {
  url = process.env.PROXY_SERVER

  constructor(url) {
    this.base_url = url
  }

  getUrl = (subpath = '', params = null) => {
    if (!params) {
      return `${this.url}/${this.base_url}${subpath}`
    }

    return `${this.url}/${this.base_url}${subpath}?${params}`
  }

  create(data) {
    return this.postQuery(`${this.getUrl()}`, data)
  }

  update(id, data) {
    return this.putQuery(`${this.getUrl()}/${id}`, data)
  }

  fetch(id) {
    return this.getQuery(`${this.getUrl()}/${id}`)
  }

  all() {
    return this.getQuery(`${this.getUrl()}`)
  }

  remove(id) {
    return this.deleteQuery(`${this.getUrl()}/${id}`)
  }

  async getQuery(url) {
    const jwt = token.getToken()
    const resp = await fetch(url, this.options(jwt))
    const response = Rest.afterQuery(resp)
    return response.json()
  }

  async postQuery(url, data) {
    const jwt = token.getToken()

    const resp = await fetch(url, this.options(jwt, {
      method: 'POST',
      body: JSON.stringify(data)
    }))
    const response = Rest.afterQuery(resp)
    return response.json()
  }

  async putQuery(url, data) {
    const jwt = token.getToken()

    const resp = await fetch(url, this.options(jwt, {
      method: 'PUT',
      body: JSON.stringify(data)
    }))
    const response = Rest.afterQuery(resp)
    return response.json()
  }

  async deleteQuery(url) {
    const jwt = token.getToken()

    const resp = await fetch(url, this.options(jwt, {
      method: 'DELETE'
    }))
    const response = Rest.afterQuery(resp)
    return true
  }

  static async handleError(response) {
    const resp = await response.json()
    throw new Error(resp.message)
  }

  static afterQuery(response) {
    if (!response.ok) {
      return Rest.handleError(response)
    }

    return response
  }

  options(token, params = {}) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return {
      headers,
      mode: 'cors',
      credentials: 'include',
      ...params
    }
  }
}
