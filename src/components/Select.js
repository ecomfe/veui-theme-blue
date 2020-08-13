import '../icons/chevron-down';
import '../icons/times-circle';
import 'veui-theme-blue-icons/disc-x';
import config from 'veui/managers/config';

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

config.defaults(
    {
        icons: {
            expand: 'chevron-down',
            collapse: 'chevron-down',
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
