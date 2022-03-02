import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 's'
            }
        },
        icons: {
            collapse: 'chevron-right',
            expand: 'chevron-right'
        }
    },
    'collapse'
);
