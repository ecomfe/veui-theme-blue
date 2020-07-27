import '../icons/question-circle';
import config from 'veui/managers/config';

config.defaults(
    {
        icons: {
            tip: 'question-circle'
        },
        ui: {
            size: {
                values: ['s', 'm'], // 12号字体s号/14号字体m号
                default: 's',
                inherit: true
            },
            direction: {
                values: ['left', 'right'], // 左对齐/右对齐
                default: 'right'
            },
            style: {
                values: ['long', 'few', 'special'], // 字段较多/少量且文字不长/特殊情况
                default: 'few'
            }
        },
        parts: {
            tip: 'alt'
        }
    },
    'field'
);
