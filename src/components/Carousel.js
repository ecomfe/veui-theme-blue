import '../icons/chevron-left';
import '../icons/chevron-right';
import config from 'veui/managers/config';

config.defaults(
    {
        parts: {
            control: 'translucent'
        },
        icons: {
            prev: 'chevron-left',
            next: 'chevron-right'
        }
    },
    'carousel'
);
