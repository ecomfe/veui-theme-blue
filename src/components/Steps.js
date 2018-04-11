import '../icons/check-large'
import config from 'veui/managers/config'

config.defaults({
  icons: {
    success: 'check'
  },
  ui: {
    direction: {
      values: ['vertical']
    },
    style: {
      values: ['full']
    },
    size: {
      values: ['small']
    }
  }
}, 'steps')
