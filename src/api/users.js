/**
 * Created by vivalaakam on 04.05.2018.
 *
 * @flow
 */
import queryString from 'query-string';
import Rest from './rest';

export default class Users extends Rest {
  constructor() {
    super('api/users');
  }

  update(data) {
    return this.postQuery(this.getUrl(), data);
  }

  fetch(full = false) {
    return this.getQuery(this.getUrl('', queryString.stringify({ full })));
  }

  list(users = []) {
    const string = queryString.stringify({ users }, { arrayFormat: 'bracket' });
    return this.getQuery(this.getUrl('/list', string));
  }
}
