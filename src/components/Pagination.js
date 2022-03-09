import 'veui-theme-blue-icons/plain-left';
import 'veui-theme-blue-icons/plain-right';
import 'veui-theme-blue-icons/fast-left';
import 'veui-theme-blue-icons/fast-right';
import 'veui-theme-blue-icons/more-ellipsis';

import ui from 'veui/managers/ui';
import i18n from 'veui/managers/i18n';

i18n.register(
    'zh-Hans',
    {
        infoLabel: '分页导航，当前为第{page}页，共{pageCount}页',
        pageSize: '{size} 条/页',
        pageSizeLabel: '选择每页显示条数',
        total: '共{total}条',
        prev: '上一页',
        next: '下一页',
        pageLabel: '前往第{page}页',
        current: '第{page}页，当前页',
        gotoPage: '跳至{page}页',
        go: '确定'
    },
    {
        ns: 'pagination'
    }
);

ui.defaults(
    {
        icons: {
            prev: 'plain-left',
            next: 'plain-right',
            backward: 'fast-left',
            forward: 'fast-right',
            more: 'more-ellipsis'
        },
        ui: {
            size: {
                values: ['xs', 's', 'm'],
                inherit: true,
                default: 's'
            }
        }
    },
    'pagination'
);
