<template>
    <article class="table-demo">
        <h1>
            <code>&lt;veui-table&gt;</code>
        </h1>
        <h2>尺寸</h2>
        <div class="options-desc">可选的尺寸
            <span class="bg-gray-show">ui</span>
            属性值：
            <span class="bg-gray-show">xs / s（默认，可不传） / m / l</span>
        </div>
        <section>
            <veui-form>
                <veui-field v-for="size in sizes" :key="size.value" :label="size.label" ui="multi">
                    <veui-table
                        :ui="size.value"
                        :data="data"
                        :column-filter="columns"
                        :key-field="selectSpanRow ? 'group' : 'id'"
                        selectable
                        :selected.sync="selected1"
                    >
                        <veui-table-column title="元数据">
                            <veui-table-column
                                field="id"
                                title="数据 ID"
                            />
                            <veui-table-column
                                v-if="showGroup"
                                field="group"
                                title="数据分组"
                                :span="groupSpan"
                            />
                            <veui-table-column
                                field="desc"
                                title="数据描述"
                            />
                        </veui-table-column>
                        <veui-table-column
                            field="price"
                            title="价格"
                            width="160"
                            align="right"
                        >
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="right"
                        >
                            <template slot-scope="props">
                                <span>{{props.item.updateDate | date}}</span>
                            </template>
                        </veui-table-column>
                    </veui-table>
                </veui-field>
            </veui-form>
        </section>
        <section>
            <veui-form>
                <veui-field label="支持复选和展开" ui="multi">
                    <veui-table
                        :data="data"
                        key-field="id"
                        selectable
                        expandable
                        :scroll="{ x: 1024 }"
                        bordered
                    >
                        <veui-table-column
                            field="id"
                            title="数据 ID"
                        />
                        <veui-table-column
                            field="desc"
                            title="数据描述"
                        />
                        <veui-table-column
                            field="price"
                            title="价格"
                            width="160"
                            align="right"
                        >
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="right"
                        >
                            <template slot-scope="props">
                                <span>{{props.item.updateDate | date}}</span>
                            </template>
                        </veui-table-column>
                        <template
                            slot="sub-row"
                            slot-scope="{ desc }"
                        >{{ desc }}</template>
                    </veui-table>
                </veui-field>
                <veui-field label="无边线且支持展开" ui="multi">
                    <veui-table
                        :data="data"
                        key-field="id"
                        expandable
                        :scroll="{ x: 1200 }"
                    >
                        <veui-table-column
                            field="id"
                            title="数据 ID"
                        >
                            <template
                                slot="sub-row"
                                slot-scope="{ id }"
                            >
                                <em>{{ id }}</em>
                            </template>
                        </veui-table-column>
                        <veui-table-column
                            field="desc"
                            title="数据描述"
                        />
                        <veui-table-column
                            field="price"
                            title="价格"
                            width="160"
                            align="right"
                        >
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="right"
                        >
                            <template slot-scope="props">
                                <span :ref="`time-b-${props.item.id}`">{{
                                    props.item.updateDate | date
                                }}</span>
                                <veui-tooltip :target="`time-b-${props.item.id}`">{{
                                    props.item.updateDate | time
                                }}</veui-tooltip>
                            </template>
                        </veui-table-column>
                        <template slot="foot">An awesome table foot!</template>
                    </veui-table>
                </veui-field>
                <veui-field label="内部滚动模式" ui="multi">
                    <veui-table
                        :scroll="{
                            x: 1280,
                            y: 300
                        }"
                        :data="data"
                        :column-filter="columns"
                        :key-field="selectSpanRow ? 'group' : 'id'"
                        selectable
                        :order-by="orderBy"
                        :order="order"
                        :selected.sync="selected1"
                        @select="handleSelect"
                        @sort="handleSort"
                    >
                        <veui-table-column
                            sortable
                            field="id"
                            title="数据 ID"
                            width="120"
                            fixed
                        >
                            <template slot="head">
                                <span>数据ID</span>
                            </template>
                            <template slot="foot">
                                <strong>总计</strong>
                            </template>
                        </veui-table-column>
                        <veui-table-column title="元数据">
                            <veui-table-column
                                field="typeId"
                                title="类型 ID"
                                :span="typeSpan"
                            />
                            <veui-table-column
                                v-if="showGroup"
                                field="group"
                                title="数据分组"
                                align="right"
                                :span="groupSpan"
                            />
                        </veui-table-column>
                        <veui-table-column
                            field="desc"
                            title="数据描述"
                        />
                        <veui-table-column
                            field="price"
                            width="160"
                            align="right"
                            fixed
                        >
                            <template slot="head">
                                价格(每 1000g)
                            </template>
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                            <template slot="foot">
                                <strong>{{ total | currency }}</strong>
                            </template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="center"
                        >
                            <template slot-scope="props">
                                <span>{{props.item.updateDate | date}}</span>
                            </template>
                        </veui-table-column>
                        <veui-table-column
                            field="operation"
                            title="操作"
                            fixed="right"
                            width="160"
                        >
                            <template slot-scope="props">
                                <veui-button
                                    ui="text strong"
                                    @click="log(props.item)"
                                >编辑</veui-button>
                                <veui-button
                                    ui="text strong"
                                    @click="del(props.index)"
                                >删除</veui-button>
                            </template>
                        </veui-table-column>
                    </veui-table>
                </veui-field>
                <veui-field label="基础表格" ui="multi">
                    <veui-table
                        :data="basicData"
                        bordered
                    >
                        <veui-table-column
                            field="id"
                            title="数据 ID"
                            width="120"
                            fixed
                        >
                        </veui-table-column>
                        <veui-table-column title="描述" field="desc">
                        </veui-table-column>
                        <veui-table-column
                            field="date"
                            title="更新时间"
                        />
                        <template #no-data>
                            <veui-icon name="data-file-box"/>
                            <span>
                                无数据
                            </span>
                        </template>
                    </veui-table>
                </veui-field>
                <veui-field label="加载中" ui="multi">
                    <veui-table
                        :data="basicData"
                        :loading="true"
                        bordered
                    >
                        <veui-table-column
                            field="id"
                            title="数据 ID"
                            width="120"
                            fixed
                        >
                        </veui-table-column>
                        <veui-table-column title="描述" field="desc">
                        </veui-table-column>
                        <veui-table-column
                            field="date"
                            title="更新时间"
                        />
                        <template #no-data>
                            <veui-icon name="data-file-box"/>
                            <span>
                                无数据
                            </span>
                        </template>
                    </veui-table>
                </veui-field>
                <veui-field label="暂无数据" ui="multi">
                    <veui-table
                        :data="[]"
                        :style="{
                            height: '400px'
                        }"
                    >
                        <veui-table-column
                            field="id"
                            title="数据 ID"
                            width="120"
                            fixed
                        >
                        </veui-table-column>
                        <veui-table-column title="元数据">
                            <veui-table-column
                                field="typeId"
                                title="类型 ID"
                                :span="typeSpan"
                            />
                            <veui-table-column
                                v-if="showGroup"
                                field="group"
                                title="数据分组"
                                align="right"
                                :span="groupSpan"
                            />
                        </veui-table-column>
                        <veui-table-column
                            field="desc"
                            title="数据描述"
                        />
                        <veui-table-column
                            field="price"
                            width="160"
                            align="right"
                            fixed
                        >
                            <template slot="head">
                                价格(每 1000g)
                            </template>
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="center"
                        >
                            <template slot-scope="props">
                                <span>{{props.item.updateDate | date}}</span>
                            </template>
                        </veui-table-column>
                        <veui-table-column
                            field="operation"
                            title="操作"
                            fixed="right"
                            width="160"
                        >
                            <template slot-scope="props">
                                <veui-button
                                    ui="text strong"
                                    @click="log(props.item)"
                                >编辑</veui-button>
                                <veui-button
                                    ui="text strong"
                                    @click="del(props.index)"
                                >删除</veui-button>
                            </template>
                        </veui-table-column>
                        <template #no-data>
                            <veui-icon name="data-file-box"/>
                            <span>
                                无数据
                            </span>
                        </template>
                    </veui-table>
                </veui-field>
                <veui-field label="列筛选" ui="multi">
                    <veui-table
                        ui="s"
                        :data="data"
                        :column-filter="columns"
                        :key-field="selectSpanRow ? 'group' : 'id'"
                        selectable
                        :selected.sync="selected1"
                    >
                        <veui-table-column title="元数据">
                            <veui-table-column
                                field="id"
                                title="数据 ID"
                            />
                            <veui-table-column
                                v-if="showGroup"
                                field="group"
                                title="数据分组"
                                :span="groupSpan"
                            />
                            <veui-table-column
                                field="desc"
                                title="数据描述"
                            />
                        </veui-table-column>
                        <veui-table-column
                            field="price"
                            title="价格"
                            width="160"
                            align="right"
                            filter-multiple
                            :filter-value.sync="filtered"
                            :filter-options="[
                                { label: '高', value: 'high' },
                                { label: '中', value: 'mid' },
                                { label: '低', value: 'low' }
                            ]"
                        >
                            <template slot-scope="props">{{
                                props.item.price | currency
                            }}</template>
                        </veui-table-column>
                        <veui-table-column
                            field="updateDate"
                            title="更新时间"
                            align="right"
                        >
                            <template slot-scope="props">
                                <span>{{props.item.updateDate | date}}</span>
                            </template>
                        </veui-table-column>
                    </veui-table>
                </veui-field>
                <veui-field label="排序" ui="multi">
                    <div class="desc">Orders: {{ allowedOrders1 }} , Current: {{ order1 }}</div>
                    <veui-table
                        key-field="id"
                        :data="items"
                        :order="order1"
                        :order-by="orderBy1"
                        :allowed-orders="allowedOrders1"
                        @sort="(orderBy, order) => { orderBy1 = orderBy; order1 = order }"
                    >
                        <veui-table-column
                            field="id"
                            title="id"
                            sortable
                        />
                    </veui-table>
                    <div class="desc">Orders: {{ allowedOrders2 }} , Current: {{ order2 }}</div>
                    <div class="desc">
                        <veui-button @click="switchDisabled">切换disabled</veui-button>
                        <veui-button @click="switchAll">切换all</veui-button>
                    </div>
                    <veui-table
                        key-field="id"
                        :data="items"
                        selectable
                        :order="order2"
                        order-by="id"
                        :allowed-orders="allowedOrders2"
                        @sort="(_, order) => order2 = order"
                    >
                        <veui-table-column
                            field="id"
                            title="id"
                            sortable
                        />
                    </veui-table>
                </veui-field>
            </veui-form>
        </section>
    </article>
</template>

<script>
import format from 'date-fns/format';
import bus from '../bus';
import {
    Button,
    Table,
    Column,
    Tooltip,
    VeuiForm,
    VeuiField,
    VeuiIcon
} from 'veui';
import 'veui-theme-blue-icons/data-file-box';

const tableData = [
    {
        id: '3154',
        desc: '数据描述1',
        price: 1024,
        updateDate: '20131117',
        group: '1577',
        typeId: '788',
        children: [
            {
                id: '31541',
                desc: '数据描述1-1',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            },
            {
                id: '31542',
                desc: '数据描述1-2',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            }
        ]
    },
    {
        id: '3155',
        desc: '数据描述2数据描述2',
        price: 598,
        updateDate: '20140214',
        group: '1577',
        typeId: '788',
        children: [
            {
                id: '31551',
                desc: '数据描述2-1',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            },
            {
                id: '31552',
                desc: '数据描述2-2',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            }
        ]
    },
    {
        id: '3156',
        desc: '数据描述3数据描述3数据描述3数据描述3',
        price: 820,
        updateDate: '20170610',
        group: '1578',
        typeId: '788',
        children: [
            {
                id: '31561',
                desc: '数据描述3-1',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            },
            {
                id: '31562',
                desc: '数据描述3-2',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            }
        ]
    },
    {
        id: '3157',
        desc: '数据描述4数据描述4数据描述4',
        price: 736,
        updateDate: '20180109',
        group: '1578',
        typeId: '788',
        children: [
            {
                id: '31571',
                desc: '数据描述4-1',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            },
            {
                id: '31572',
                desc: '数据描述4-2',
                price: 1024,
                updateDate: '20131117',
                group: '1577',
                typeId: '788'
            }
        ]
    },
    {
        id: '3158',
        desc: '数据描述5',
        price: 168,
        updateDate: '20180109',
        group: '1579',
        typeId: '789'
    },
    {
        id: '3159',
        desc: '数据描述6',
        price: 820,
        updateDate: '20180109',
        group: '1579',
        typeId: '789'
    },
    {
        id: '3160',
        desc: '数据描述7',
        price: 357,
        updateDate: '20180109',
        group: '1580',
        typeId: '789'
    },
    {
        id: '3161',
        desc: '数据描述8数据描述8',
        price: 360,
        updateDate: '20180109',
        group: '1580',
        typeId: '789',
        children: [
            {
                id: '31611',
                desc: '数据描述8-1',
                price: 1024,
                updateDate: '20131117',
                group: '1580',
                typeId: '789'
            }
        ]
    }
];

export default {
    name: 'table-demo',
    components: {
        'veui-button': Button,
        'veui-table': Table,
        'veui-table-column': Column,
        'veui-tooltip': Tooltip,
        VeuiForm,
        VeuiField,
        VeuiIcon
    },
    filters: {
        currency(value) {
            return '¥' + value.toFixed(2);
        },
        date(value) {
            return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        },
        time(value) {
            const date = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
            return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
        }
    },
    data() {
        return {
            s: false,
            idTitle: '#',
            showGroup: true,
            selectSpanRow: true,
            fields: [
                {name: 'id', title: 'ID'},
                {name: 'desc', title: '描述'}
            ],
            data: tableData,
            nextId: 3162,
            nextIndex: 9,
            basicData: [
                {
                    id: '1001',
                    desc: '字段1',
                    date: '2020-09-07'
                },
                {
                    id: '1002',
                    desc: '字段2',
                    date: '2020-09-07'
                },
                {
                    id: '1003',
                    desc: '字段3',
                    date: '2020-09-07'
                }
            ],
            columns: [
                'typeId',
                'id',
                'group',
                'desc',
                'price',
                'updateDate',
                'operation'
            ],
            order: false,
            orderBy: null,
            orderBy1: 'id2',
            selected1: ['3155', '3156'],
            selected2: '3156',
            groupSpan(i) {
                return {
                    row: i % 2 ? 0 : 2
                };
            },
            typeSpan(i) {
                return {
                    row: i % 4 ? 0 : 4
                };
            },
            sizes: [
                {
                    label: '超小号[ui=xs]',
                    value: 'xs',
                },
                {
                    label: '小号[ui=s]',
                    value: 's'
                },
                {
                    label: '中号[ui=m]',
                    value: 'm'
                },
                {
                    label: '大号[ui=l]',
                    value: 'l'
                }
            ],
            items: [
                {
                    id: 1,
                    type: 'fruits',
                    name: 'apple',
                    origin: 'Japan',
                    level: 'A'
                },
                {
                    id: 2,
                    type: 'fruits',
                    name: 'cherry',
                    origin: 'Chile',
                    level: 'A'
                },
                {
                    id: 3,
                    type: 'veggie',
                    name: 'tomato',
                    origin: 'China',
                    level: 'A'
                },
                {
                    id: 4,
                    type: 'veggie',
                    name: 'potato',
                    origin: 'China',
                    level: 'A'
                }
            ],
            allowedOrders1: ['asc', 'desc'],
            allowedOrders2: [false, 'asc', 'desc'],
            order1: 'desc',
            order2: false,
            filtered: null,
        };
    },
    computed: {
        total() {
            return this.data.reduce((total, item) => {
                return total + item.price;
            }, 0);
        }
    },
    watch: {
        idTitle() {
            this.s = true;
            this.$nextTick(() => {
                this.s = false;
            });
        }
    },
    mounted() {
    // for (let i = 0; i < 300; i++) {
    //   this.append()
    // }
    },
    methods: {
        log(...args) {
            bus.$emit('log', ...args);
        },
        del(index) {
            this.log(this.data.splice(index, 1)[0]);
        },
        append() {
            let item = {
                id: String(this.nextId),
                typeId: String(Math.floor(this.nextId / 4)),
                group: String(Math.floor(this.nextId / 2)),
                desc: `数据描述${this.nextIndex}`,
                price: Math.floor(Math.random() * 1280),
                updateDate: format(
                    Date.now() + Math.floor(Math.random() * 1e10),
                    'yyyyMMdd'
                )
            };
            this.nextId++;
            this.nextIndex++;
            this.data.push(item);
            this.log(item);
        },
        handleSelect(...args) {
            this.log(...args);
        },
        handleSort(orderBy, order) {
            this.orderBy = orderBy;
            this.order = order;
        },
        switchDisabled() {
            let first = this.items[0];
            this.items = [
                {
                    ...first,
                    disabled: !first.disabled
                },
                ...this.items.slice(1)
            ];
        },
        switchAll() {
            this.items = this.items.map(i => ({
                ...i,
                disabled: !i.disabled
            }));
        },
    }
};
</script>

<style lang="less">
.table-demo {
    .veui-form {
        .veui-field {
            &-content {
                flex: 1;
                overflow: auto;
                display: flex;
                flex-direction: column;
                .desc {
                    width: 100%;
                    margin-bottom: 8px;
                }
            }
        }
    }
    section {
        margin-bottom: 20px;
    }

    .veui-button + .veui-button {
        margin-left: 20px;
    }

    .veui-table {
        margin-bottom: 30px;
    }

    .container {
        width: 640px;
    }
}
</style>
