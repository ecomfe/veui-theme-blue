import 'veui-theme-blue-icons/mark-minus';
import 'veui-theme-blue-icons/mark-tick';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            indeterminate: 'mark-minus',
            checked: 'mark-tick'
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
