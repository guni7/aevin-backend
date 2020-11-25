'use strict'

import config from './config'

export default
function markActiveFavicon (favicons, minSize) {
  for (let i = 0; i < config.predicates.length; i++) {
    const result = favicons.find((favicon) => config.predicates[i](favicon, minSize))
    if (result) {
      result.active = true
      break
    }
  }
}
