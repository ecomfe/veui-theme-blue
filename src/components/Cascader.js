import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/disc-x';
import ui from 'veui/managers/ui';

const TAG_SIZE_MAP = {
    xs: 's',
    s: 's',
    m: 's',
    l: 'm'
};

ui.defaults(
    {
        icons: {
            expand: 'plain-down',
            collapse: 'plain-down',
            clear: 'disc-x',
            separator: 'plain-down'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            clear: 'icon aux',
            tag: ({size}) => TAG_SIZE_MAP[size] || size
        }
    },
    'cascader'
);
