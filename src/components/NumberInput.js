import '../icons/chevron-up';
import '../icons/chevron-down';
import '../icons/plus';
import '../icons/minus';
import config from 'veui/managers/config';

const ICON_MAP = {
    normal: {
        increase: 'chevron-up',
        decrease: 'chevron-down'
    },
    strong: {
        increase: 'plus',
        decrease: 'minus'
    }
};

config.defaults(
    {
        ui: {
            size: {
                values: ['xs', 's', 'm'],
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
