## 0.13.2-dev(veui版本为1.0.0-alpha.18)

### 💡 主要变更

* [+] `Table`组件新增`ui=alt`主题

### 🐞 问题修复

* [^] 修改 `Input``组件在Form组件中使用，文本不居中，长度不是100%的样式错误问题
* [^] 修改 `Pagination``组件分页下拉按钮样式
* [^] 修改 `dropdown`组件增加split后对宽度影响，调整为只有使用split命令时，才宽度限制才生效
* [^] 去除无效package文件`wicg-focus-ring@2.x`

## 0.13.0-dev(veui版本为1.0.0-alpha.18)

### 💡 主要变更

* [+] `Alert`组件新增`ui=limit`样式（限制宽度为340px）
* [+] `Button`组件新增`ui=dark`黑色按钮样式
* [^] `Icon`组件中的`Minus-small`更名为`Minus`
* [^] 更改`NumberInput`组件样式
* [+] `Pagination`组件新增`ui=info`展示条数信息样式
* [+] `Uploader`组件去除`ui=horizontal`,默认为横向展示，新增`ui=vertical`纵向排列展示，新增`ui=bottom`提示文字在下方
* [+] 新增`InfoImg`样式，显示数据在不同状态下的图片

### 🐞 问题修复

* [^] 修改 `ButtonGroup``CheckButtonGroup``RadioButtonGroup` 组件禁用状态时无边框问题
* [^] 去除 `Input` 组件中样式采用`!important`的部分

## 0.12.1-dev(veui版本为1.0.0-alpha.14)

### 🐞 问题修复

* [^] 修改 `Calendar` 组件间距问题，参考最新设计稿 （fix#42）

## 0.12.0-dev(veui版本为1.0.0-alpha.14)

### 🐞 问题修复

* [^] 修改 `Breadcrumb` 组件分隔符图标类名为separator （fix#54）
* [^] 修改 `Transfer` 组件选中状态图标类名为checked （fix#54）
* [^] 修改 `Dropdown` 组件ui=link时disable状态的样式
* [^] 修改 `Pagination` 组件选择每页条数下拉框样式
* [^] 修改 `Select` 组件多层级选择时的样式
* [^] 修改 `Switch` 组件14版本更新后的样式问题（fix#54）
* [^] 修改 `Calendar` 组件年月选择时会出现灰色横线的问题（fix#55）
* [^] 修改 `Searchbox` 组件内部高度超出定义高度的问题

## 0.11.0-dev(veui版本为1.0.0-alpha.13)

### 💡 主要变更

* [+] 新增 `Table` 组件样式，包括字体大小以及行内容超出省略号隐藏
* [+] 更新 `NumberInput` 组件样式

### 🐞 问题修复

* [^] 更新 `Uploader` 组件样式
* [^] 修改 `Datepicker` 组件年月选择框箭头上方可以看到被遮挡文字的问题（fix#50）
* [^] 修改 `Form` 组件验证信息展示的问题（fix#51）

## 0.10.0-dev(veui版本为1.0.0-alpha.12)

### 🐞 问题修复

* [^] 修改 `Searchbox` 组件重构后引起的样式问题
* [^] `Checkbox` 组件增加切换选择时的动画效果
* [^] 修改 `Input` 组件删除按钮默认和hover状态样式
* [^] 修改 `Pagnination` 组件非路由跳转时，选中页字体颜色为灰色问题
* [^] `Radio` 组件增加切换选择时的动画效果
* [^] 修改 `Select` 组件样式错乱问题

## 0.9.0-dev(veui版本为1.0.0-alpha.11)

### 🐞 问题修复

* [^] 修改 `Switch` 组件在open状态时按钮偏移问题
* [^] 修改 `Datepicker` 组件可清除选择时清除按钮位置出现偏差
* [^] 修改 `Button` 组件的配置文件size选项
* [^] 修改 `Textarea` 组件行号和文字不对齐问题
* [^] `Textarea` 组件增加ui="line"类型
* [^] 修改 `Pagnination` 组件页数为一位数时的按钮大小

## 0.8.0-dev

### 🐞 问题修复

* [^] 修改 `Switch` 组件ui=small时，关闭状态左侧有空隙（#38）
* [^] 修改 `Radio` 组件高度和设计稿不相同（#39）
* [^] 修改 `Checkbox` 组件的高度及按钮和文字的距离
* [^] 修改 `Dropdown` 组件ui=large和ui=small样式
* [^] 去除 `Input` 组件veui-input-input的float属性
* [^] 修改 `NumberInput` 组件向上增加按钮丢失问题
* [^] 修改 `Searchbox` 组件placeholder字体与输入字体大小不一致问题（#40）
* [^] 修改 `Input` 组件placeholder字体颜色（#40）
* [^] 修改 `Pagnination` 组件按钮间隙、字体大小、active和hover状态无border（#41）
* [^] 修改 `Datepicker` 组件选中状态样式、展开浮层大小（#42）
* [^] 更新demo左侧链接，灰色样式不可点击组件表示组件样式未完成


## 0.7.0-dev

### 💡 主要变更

* [^] 更新veui demo版本到v1.0.0-alpha.11。

### 🐞 问题修复

* [^] 修改 `Button` 组件small样式的字体大小（#35）
* [^] 修改 `Alert` 组件高度及关闭按钮距离右侧大小
* [^] 修改 `Calendar` 组件年份和月份边框被遮住1px问题
* [^] 修改 `Checkbox` 组件按钮和文字之间的距离
* [^] 修改 `Dropdown` 组件ui=link disabled状态样式
* [^] 修改 `Input` Demo以及focus状态样式
* [^] 修改 `Pagnination` 组件下拉选择一页展示数样式
* [^] 修改 `Radio` 组件按钮与文字的距离
* [^] 修改 `Searchbox` 组件样式不清楚的问题
* [^] 修改 `Textarea` 组件的最小高度
* [^] 修改 `Switch` 组件小开关的大小

## 0.6.0-dev

### 💡 主要变更

* [+] 新增 `Form` 组件样式。

### 🐞 问题修复

* [^] 修改 `Button` 组件小尺寸和禁用状态样式
* [^] 修改 `Select` 组件不同尺寸展开icon的大小

## 0.5.0-dev

### 💡 主要变更

* [+] 新增 `CheckButtonGroup` 组件样式。
* [+] 新增 `DatePicker` 组件样式。
* [+] 新增 `RadioButtonGroup` 组件样式。
* [+] 新增 `Progress` 组件样式。
* [+] 新增 `Select` 组件样式。
* [+] 新增 `Switch` 组件样式。
* [+] 新增 `Toast` 组件样式。
* [+] 新增 `Tooltip` 组件样式。
* [-] 移除 `ButtonGroup` 组件ui=primary和alt类型以及大小ui样式。

### 🐞 问题修复

* [^] 修复 `Button` 组件ui=small时的字体大小不符合设计规范问题

## 0.4.0-dev

### 💡 主要变更

* [+] 新增 `Calendar` 组件样式。
* [+] 新增 ` Radio` 组件样式。
* [+] 新增 ` Steps` 组件样式。
* [+] 新增 ` Searchbox` 组件样式。
* [+] `CheckboxGroup` 组件demo增加small、large类型样式。
* [^] 更新 `RadioGroup` 组件demo

### 🐞 问题修复

* [^] 修复 `Pagination` 组件按钮默认无背景色问题。
* [^] 修复 `Checkbox` 组件默认样式和large样式不符合规范问题

## 0.3.0-dev

### 💡 主要变更

* [+] 新增 `Input` 组件样式。
* [+] 新增 `Textarea` 组件样式。

## 0.2.2-dev

### 🐞 问题修复

* [^] 修复了 `BreadCrumb` 组件样式不符合设计规范问题。

## 0.2.1-dev

### 🐞 问题修复

* [^] 修复了 `BreadCrumb` 组件分隔符未正常显示问题。

## 0.2.0-dev

### 💡 主要变更

* [+] 新增 `Alert` 组件样式。
* [+] 新增 `Breadcrumb` 组件样式。
* [+] 新增 `ButtonGroup` 组件样式。
* [+] 新增 `Dropdown` 组件样式。
* [+] 新增 CHANGELOG 文件。
* [^] 更新veui-theme-blue demo代码与veui v1.0.0-alpha.9版本一致

## 0.1.0-dev

### 💡 主要变更

* [+] 新增 `pagination` 组件样式。
* [+] 新增 `upload` 组件样式。
* [+] 新增 `button` 组件样式。
* [+] 新增 `checkbox` 组件样式。
* [+] 新增 `font` 组件及样式。
* [^] 更新 variables.less 公共变量文件，新增或修改veui-theme-blue需要的公共变量
* [^] 更新veui-theme-blue demo代码与veui github上2.28#eacedcb版本一致
