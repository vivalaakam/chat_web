/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import createHistory from 'history/createBrowserHistory'
import { hasWindow } from './helpers'

export default hasWindow && createHistory()
