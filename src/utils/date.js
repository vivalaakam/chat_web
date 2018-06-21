/**
 * Created by vivalaakam on 20.06.2018.
 *
 * @flow
 */
export function getCurrentDateTime(date) {
  var tzoffset = (date).getTimezoneOffset() * 60000 //offset in milliseconds
  var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 19).replace('T', ' ')
  var mySqlDT = localISOTime
  return mySqlDT
}
