import '../icons/chevron-left';
import '../icons/chevron-right';
import '../icons/chevron-double-left';
import '../icons/chevron-double-right';
import '../icons/ellipsis';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            prev: 'chevron-left',
            next: 'chevron-right',
            backward: 'chevron-double-left',
            forward: 'chevron-double-right',
            more: 'ellipsis'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm'],
                inherit: true
            }
        }
    },
    'pagination'
);
