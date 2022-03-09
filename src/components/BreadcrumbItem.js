import 'veui-theme-blue-icons/plain-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            separator: 'plain-right'
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
