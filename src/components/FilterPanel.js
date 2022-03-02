import ui from 'veui/managers/ui';

ui.defaults(
    {
        parts: {
            search: 'icon'
        },
        ui: {
            size: {
                values: ['s', 'm'],
                inherit: true
            }
        }
    },
    'filterpanel'
);
