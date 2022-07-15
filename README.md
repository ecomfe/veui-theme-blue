# veui-theme-blue
> blue theme for veui, this is a vue.js project.

[veui-theme-blue](https://ecomfe.github.io/veui-theme-blue/#/)

## Usage

### Installation
```
pnpm install veui-theme-blue --save
```

### Load base styles for VEUI

There are two ways to load the base stylesheet:

1. Direct `import` in JavaScript

  ```js
  import 'veui-theme-blue/common.less'
  ```

2. Import from a `<style>` block in a `.vue` file

  ```vue
  <style lang="less" src="veui-theme-blue/common.less"></style>

  <!-- OR -->

  <style lang="less">
  @import "~veui-theme-blue/common.less"
  </style>
  ```

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
