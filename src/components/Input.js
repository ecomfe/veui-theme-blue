import '../icons/cross'
import config from 'veui/managers/config'

config.defaults({
  icons: {
    remove: 'cross'
  },
  ui: {
    size: {
      values: ['large', 'small', 'tiny', 'micro'],
      inherit: true
    }
  }
}, 'input')
