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
