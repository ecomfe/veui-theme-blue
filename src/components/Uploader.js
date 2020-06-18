import 'veui-theme-blue-icons/upload';
import 'veui-theme-blue-icons/trash';
import 'veui-theme-blue-icons/check-circle';
import 'veui-theme-blue-icons/times-circle';
import 'veui-theme-blue-icons/file';
import 'veui-theme-blue-icons/image-add';
import 'veui-theme-blue-icons/exclamation-circle';
import 'veui-theme-blue-icons/loading';
import 'veui-theme-blue-icons/eye';
import 'veui-theme-blue-icons/question-circle';
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
            alert: 'exclamation-circle',
            loading: 'loading',
            preview: 'eye',
            message: 'question-circle'
        },
        ui: {
            size: {
                values: ['m', 's'],
                inherit: true,
                default: 'm'
            }
        },
        parts: {
            remove: 'icon',
            progress: 's',
            control: 'icon s',
            preview: 'auto'
        }
    },
    'uploader'
);
