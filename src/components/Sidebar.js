import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/triangle-left';
import 'veui-theme-blue-icons/triangle-right';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            expand: 'plain-right',
            collapse: 'plain-left',
            hiddenExpand: 'triangle-right',
            hiddenCollapse: 'triangle-left'
        }
    },
    'sidebar'
);
