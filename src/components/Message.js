import 'veui-theme-blue-icons/disc-tick';
import 'veui-theme-blue-icons/disc-x';
import 'veui-theme-blue-icons/disc-exclamation';
import 'veui-theme-blue-icons/disc-info';

import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            success: 'disc-tick',
            error: 'disc-x',
            warning: 'disc-exclamation',
            info: 'disc-info',
            aux: 'disc-info'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true,
                default: 'm'
            }
        }
    },
    'message'
);
