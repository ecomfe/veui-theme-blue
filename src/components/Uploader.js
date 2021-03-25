import '../icons/upload';
import '../icons/trash';
import '../icons/check-circle';
import '../icons/times-circle';
import '../icons/file';
import '../icons/image-add';
import '../icons/exclamation-circle';
import '../icons/loading';
import '../icons/eye';
import '../icons/question-circle';
import 'veui-theme-blue-icons/live-broadcast-plus';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            upload: 'upload',
            clear: 'trash',
            success: 'check-circle',
            failure: 'times-circle',
            file: 'file',
            addImage: 'image-add',
            addVideo: 'live-broadcast-plus',
            addMedia: 'live-broadcast-plus',
            alert: 'exclamation-circle',
            loading: 'loading',
            message: 'question-circle',
            previewImage: 'eye',
            previewVideo: 'eye'
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
