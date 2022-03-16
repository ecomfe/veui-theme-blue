import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/disc-x';
import ui from 'veui/managers/ui';

const CHECKBOX_SIZE_MAP = {
    xs: 's',
    s: 's',
    m: 'm',
    l: 'm'
};

const TAG_SIZE_MAP = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l'
};

ui.defaults(
    {
        icons: {
            expand: 'plain-down',
            collapse: 'plain-down',
            clear: 'disc-x'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            }
        },
        parts: {
            clear: 'icon aux',
            checkbox: ({size}) => CHECKBOX_SIZE_MAP[size] || size,
            tag: ({size}) => TAG_SIZE_MAP[size] || size
        }
    },
    'select'
);
