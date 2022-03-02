import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expandable: 'chevron-right'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true
            }
        }
    },
    'optiongroup'
);
