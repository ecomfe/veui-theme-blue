import ui from 'veui/managers/ui';

ui.defaults(
    {
        parts: {
            self: '',
            ok: 'text strong',
            cancel: 'text'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                default: 'm'
            }
        }
    },
    'popover'
);
