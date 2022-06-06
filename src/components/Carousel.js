import '../icons/chevron-left';
import '../icons/chevron-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        parts: {
            control: 'translucent',
            controlOutside: 'basic'
        },
        icons: {
            prev: 'chevron-left',
            next: 'chevron-right'
        }
    },
    'carousel'
);
