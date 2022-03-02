import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        ui: {
            size: {
                values: ['m', 's'],
                default: 's',
                inherit: true
            },
            'checkbox-after': {
                boolean: true
            }
        },
        icons: {
            collapse: 'chevron-right',
            expand: 'chevron-right'
        }
    },
    'tree'
);
