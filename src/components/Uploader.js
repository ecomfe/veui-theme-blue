import 'veui-theme-blue-icons/transmit-upload';
import 'veui-theme-blue-icons/trash';
import 'veui-theme-blue-icons/sign-tick';
import 'veui-theme-blue-icons/sign-x';
import 'veui-theme-blue-icons/clip';
import 'veui-theme-blue-icons/image-add';
import 'veui-theme-blue-icons/sign-exclamation';
import 'veui-theme-blue-icons/loading';
import 'veui-theme-blue-icons/visible';
import 'veui-theme-blue-icons/sign-question';
import 'veui-theme-blue-icons/live-broadcast-plus';
import ui from 'veui/managers/ui';

ui.defaults(
    {
        icons: {
            upload: 'transmit-upload',
            clear: 'trash',
            success: 'sign-tick',
            failure: 'sign-x',
            file: 'clip',
            addImage: 'image-add',
            addVideo: 'live-broadcast-plus',
            addMedia: 'live-broadcast-plus',
            alert: 'sign-exclamation',
            loading: 'loading',
            message: 'sign-question',
            previewImage: 'visible',
            previewVideo: 'visible'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm', 'l'],
                inherit: true,
                default: 's'
            },
            style: {
                values: ['vertical', 'horizon'],
                default: 'vertical'
            }
        },
        parts: {
            remove: 'icon',
            progress: 's',
            control: 'icon s',
            preview: 'auto',
            media: 'basic'
        }
    },
    'uploader'
);
