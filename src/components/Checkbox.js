import '../icons/minus';
import '../icons/check';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            indeterminate: 'minus',
            checked: 'check'
        },
        ui: {
            size: {
                values: ['s', 'm', 'l'],
                default: 's',
                inherit: true
            }
        }
    },
    'checkbox'
);
