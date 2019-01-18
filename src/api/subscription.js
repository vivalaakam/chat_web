/**
 * Created by vivalaakam on 17.01.2019.
 *
 * @flow
 */
import Rest from './rest'

export default class Subscription extends Rest {
  constructor() {
    super('api/subscription')
  }
}
