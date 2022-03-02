import '../icons/chevron-left';
import '../icons/chevron-down';
import '../icons/chevron-right';
import '../icons/chevron-double-left';
import '../icons/chevron-double-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            prev: 'chevron-left',
            next: 'chevron-right',
            backward: 'chevron-double-left',
            forward: 'chevron-double-right',
            expand: 'chevron-down'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        },
        parts: {
            nav: 'icon aux',
            toggle: 'text'
        }
    },
    'calendar'
);
