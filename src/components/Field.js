import '../icons/question-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            tip: 'question-circle'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                default: 's',
                inherit: true
            }
        },
        parts: {
            tip: 'alt'
        }
    },
    'field'
);
