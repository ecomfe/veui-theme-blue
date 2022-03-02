import ui from 'veui/managers/ui';

ui.defaults({
    ui: {
        size: {
            values: ['s', 'm'], // 12号字体s号/14号字体m号
            default: 's',
            inherit: true
        },
        style: {
            values: ['normal', 'loose', 'top'], // 常规页面紧凑样式/宽松样式/顶对齐样式
            default: 'normal'
        }
    }
}, 'form');
