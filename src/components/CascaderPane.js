import 'veui-theme-blue-icons/plain-right';
import ui from 'veui/managers/ui';

const CHECKBOX_SIZE_MAP = {
    xs: 's',
    s: 's',
    m: 'm',
    l: 'm'
};

ui.defaults(
    {
        icons: {
            expandable: 'plain-right'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            checkbox: ({size}) => CHECKBOX_SIZE_MAP[size] || size
        }
    },
    'cascaderpane'
);
