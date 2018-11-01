import '../icons/minus';
import '../icons/check-small';
import config from 'veui/managers/config';

config.defaults({
    icons: {
        indeterminate: 'minus',
        checked: 'check-small'
    },
    ui: {
        size: {
            values: ['small', 'large']
        }
    }
}, 'checkbox');
