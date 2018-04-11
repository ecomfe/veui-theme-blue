import '../icons/angle-up'
import '../icons/angle-down'
import config from 'veui/managers/config'

config.defaults({
  icons: {
    expand: 'angle-down',
    collapse: 'angle-up'
  },
  ui: {
    size: {
      values: ['large', 'small', 'tiny', 'micro']
    }
  }
}, 'select')
