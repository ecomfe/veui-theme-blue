<template>
    <article>
        <h1><code>&lt;veui-badge&gt;</code></h1>
        <section>
            <veui-checkbox v-model="hidden">Hidden</veui-checkbox>
        </section>
        <section>
            <h2>圆点徽标：</h2>
            <veui-badge
                :hidden="hidden"
                type="success"
            >
                <veui-button>绿点徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                type="info"
            >
                <veui-button>蓝点徽标</veui-button>
            </veui-badge>
            <veui-badge :hidden="hidden">
                <veui-button>红点徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                type="warning"
            >
                <veui-button>橙点徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                type="aux"
            >
                <veui-button>灰点徽标</veui-button>
            </veui-badge>
        </section>
        <section>
            <h2>数字徽标：</h2>
            <veui-badge
                :hidden="hidden"
                value="1"
                type="success"
            >
                <veui-button>数字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="10"
                type="info"
            >
                <veui-button>数字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="99+"
            >
                <veui-button>数字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="68"
                type="warning"
            >
                <veui-button>数字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="1000"
                type="aux"
            >
                <veui-button>数字徽标</veui-button>
            </veui-badge>
        </section>
        <section>
            <h2>文字徽标</h2>
            <veui-badge
                :hidden="hidden"
                value="new"
                type="success"
            >
                <veui-button>文字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="hot"
                type="info"
            >
                <veui-button>文字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="new"
            >
                <veui-button>文字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="count"
                type="warning"
            >
                <veui-button>文字徽标</veui-button>
            </veui-badge>
            <veui-badge
                :hidden="hidden"
                value="count"
                type="aux"
            >
                <veui-button>文字徽标</veui-button>
            </veui-badge>
        </section>
        <section>
            <h2>状态徽标</h2>
            <veui-badge
                :hidden="hidden"
                type="success"
            />
            <veui-badge
                :hidden="hidden"
                type="info"
            />
            <veui-badge :hidden="hidden"/>
            <veui-badge
                :hidden="hidden"
                type="error"
            />
            <veui-badge
                :hidden="hidden"
                type="warning"
            />
            <veui-badge
                :hidden="hidden"
                type="aux"
            />
        </section>
        <section>
            <veui-badge
                :hidden="hidden"
                type="success"
                value="成功"
            />
            <veui-badge
                :hidden="hidden"
                type="info"
                value="进行中"
            />
            <veui-badge
                :hidden="hidden"
                value="失败"
            />
            <veui-badge
                :hidden="hidden"
                type="warning"
                value="警告"
            />
            <veui-badge
                :hidden="hidden"
                type="aux"
                value="置灰"
            />
        </section>
    </article>
</template>

<script>
import {Badge, Button, Checkbox} from 'veui';
import 'veui-theme-blue-icons/check';
import 'veui-theme-blue-icons/edit';
import 'veui-theme-blue-icons/search';
import 'veui-theme-blue-icons/times';

export default {
    name: 'badge-demo',
    components: {
        'veui-badge': Badge,
        'veui-button': Button,
        'veui-checkbox': Checkbox
    },
    data() {
        return {
            hidden: false
        };
    }
};
</script>

<style scoped>
section {
  margin-bottom: 40px;
}

.veui-badge {
  margin-right: 28px;
}
</style>
