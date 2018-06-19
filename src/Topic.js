/**
 * Created by vivalaakam on 19.06.2018.
 *
 * @flow
 */

import React from 'react'

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default Topic
