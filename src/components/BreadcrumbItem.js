import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            separator: 'chevron-right'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 'm'
            },
            style: {
                values: ['normal', 'strong'],
                inherit: true
            }
        }
    },
    'breadcrumbitem'
);
