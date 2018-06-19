/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

const KEY = 'jwtToken'

export default {
  getToken() {
    return typeof localStorage !== 'undefined' && localStorage.getItem(KEY)
  },
  setToken(jwt) {
    if (jwt) {
      localStorage.setItem(KEY, jwt)
      document.cookie = `Authorization=Bearer ${jwt}`
    }
  },
  removeToken() {
    localStorage.setItem(KEY, null)
    document.cookie = 'Authorization='
  }
}
