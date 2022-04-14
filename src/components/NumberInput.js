import 'veui-theme-blue-icons/plain-up';
import 'veui-theme-blue-icons/plain-down';
import 'veui-theme-blue-icons/mark-plus';
import 'veui-theme-blue-icons/mark-minus';
import ui from 'veui/managers/ui';

const ICON_MAP = {
    normal: {
        increase: 'plain-up',
        decrease: 'plain-down'
    },
    strong: {
        increase: 'mark-plus',
        decrease: 'mark-minus'
    }
};

ui.defaults(
    {
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l', 'xl'],
                default: 's',
                inherit: true
            },
            style: {
                values: ['normal', 'strong'],
                default: 'normal'
            }
        },
        parts: {
            spinner: 'normal'
        },
        icons: {
            increase: ({style}) => ICON_MAP[style].increase,
            decrease: ({style}) => ICON_MAP[style].decrease
        }
    },
    'numberinput'
);
