<template>
    <article  class="input-group-demo">
        <h1><code>&lt;veui-input-group&gt;</code></h1>
        <veui-form>
            <h2>尺寸</h2>
            <div class="options-desc">
                可选的尺寸 <span class="bg-gray-show">ui</span> 
                属性值： <span class="bg-gray-show">xs / s / m / l</span>
            </div>
            <section>
                <veui-field
                    
                    label="超小号（xs）"
                >
                    <veui-input-group ui="xs">
                        <veui-select
                            :options="protocals"
                            style="width: 100px"
                            v-model="value"
                        />
                        <veui-input/>
                        <veui-select
                            :options="domain"
                            style="width: 100px"
                            v-model="value1"
                        />               
                    </veui-input-group>
                </veui-field>
                <veui-field
                    
                    label="小号（s）"
                >
                    <veui-input-group ui="s">
                        <veui-select
                            :options="protocals"
                            style="width: 100px"
                            v-model="value"
                        />
                        <veui-input/>
                        <veui-select
                            :options="domain"
                            style="width: 100px"
                            v-model="value1"
                        />               
                    </veui-input-group>
                </veui-field>
                <veui-field
                    
                    label="中号（m）"
                >
                    <veui-input-group ui="m">
                        <veui-select
                            :options="protocals"
                            style="width: 100px"
                            v-model="value"
                        />
                        <veui-input/>
                        <veui-select
                            :options="domain"
                            style="width: 100px"
                            v-model="value1"
                        />               
                    </veui-input-group>
                </veui-field>
                <veui-field
                    
                    label="大号（l）"
                >
                    <veui-input-group ui="l">
                        <veui-select
                            :options="protocals"
                            style="width: 100px"
                            v-model="value"
                        />
                        <veui-input/>
                        <veui-select
                            :options="domain"
                            style="width: 100px"
                            v-model="value1"
                        />               
                    </veui-input-group>
                </veui-field>
            </section>
            <section>
                <h4>Select + Input + Button</h4>
                <veui-input-group>
                    <veui-select
                        :options="protocals"
                        style="width: 100px"
                        v-model="value"
                    />
                    <veui-input/>
                    <veui-button ui="primary">Submit</veui-button>
                </veui-input-group>
            </section>
            <section>
                <h4>Input + Select</h4>
                <veui-input-group>
                    <veui-input/>
                    <veui-select
                        :options="money"
                        style="width: 100px"
                        v-model="value2"
                    />   
                </veui-input-group>
            </section>
            <section>
                <h4>Autocomplete + ButtonGroup</h4>
                <veui-input-group>
                    <veui-autocomplete :datasource="suggestions"/>
                    <veui-button-group
                        :items="ops"
                        ui="primary"
                    />
                </veui-input-group>
            </section>
        </veui-form>
    </article>
</template>

<script>
import {
    InputGroup,
    ButtonGroup,
    Select,
    Input,
    Button,
    Autocomplete,
    Span,
    Form,
    Field
} from 'veui';

export default {
    name: 'text-input',
    components: {
        'veui-input-group': InputGroup,
        'veui-button-group': ButtonGroup,
        'veui-input': Input,
        'veui-select': Select,
        'veui-button': Button,
        'veui-autocomplete': Autocomplete,
        'veui-field': Field,
        'veui-form': Form
    },
    data() {
        return {
            protocals: [
                {label: 'https://', value: 'https'},
                {label: 'http://', value: 'http'}
            ],
            domain: [
                {label: '.com', value: 'com'},
                {label: '.cn', value: 'cn'}
            ],
            money: [
                {label: 'RMB', value: 'RMB'},
                {label: 'JPY', value: 'JPY'}
            ],
            bid: 1024,
            width: 1024,
            height: 768,
            ops: [
                {label: 'Save', value: 'save'},
                {label: 'Submit', value: 'submit'}
            ],
            types: [
                {label: 'By ID', value: 'id'},
                {label: 'By Name', value: 'name'}
            ],
            type: 'id',
            suggestions: [
                {value: 'Steve Rogers'},
                {value: 'Tony Stark'},
                {value: 'Thor'},
                {value: 'Hulk'},
                {value: 'Stephen Strange'},
                {value: 'Natasha Romanov'},
                {value: 'Loki'}
            ],
            value: '',
            value1: '',
            value2: ''
        };
    }
};
</script>

<style lang="less">
.input-group-demo {
    .veui-form {
        .veui-field {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .veui-input-group {
            .veui-label {
                display: flex;
                line-height: 1;
            }
        }
    }
    section {
        margin-bottom: 40px;
    }
}

</style>
