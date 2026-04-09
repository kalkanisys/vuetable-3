[![npm](https://img.shields.io/npm/v/vuetable-3.svg)](https://www.npmjs.com/package/vuetable-3)
[![npm](https://img.shields.io/npm/dt/vuetable-3.svg)](https://www.npmjs.com/package/vuetable-3)
[![npm](https://img.shields.io/npm/l/vuetable-3.svg?maxAge=2592000)](https://github.com/ratiw/vuetable-2/blob/master/LICENSE)

# Vuetable-3 — data table simplified

**Vuetable-3** is a datatable component for **Vue 3.x**, continuing from [vuetable-2](https://github.com/ratiw/vuetable-2) (Vue 2.x). For Vue 1.x, use [`vuetable`](https://github.com/ratiw/vue-table).

---

### Documentation and tutorial (upstream Vuetable-2)

Documentation is still under development, but you can view it at [https://ratiw.github.io/vuetable-2](https://ratiw.github.io/vuetable-2). Thanks to @cristijora for the help.

Meanwhile, check out:

- the [Tutorial](https://github.com/ratiw/vuetable-2-tutorial/wiki)
  with follow-along project [here](https://github.com/ratiw/vuetable-2-tutorial). It should be enough to get you started.

- [Sample project](https://github.com/ratiw/vuetable-2-with-laravel-5.4) using Vuetable-2 with Laravel 5.4 and Laravel-Mix

If you've been using Vuetable for Vue 1.x before, checkout [what's changed](https://github.com/ratiw/vuetable-2/blob/master/changes.md) for info on changes from Vuetable for Vue 1.x and the [upgrade guide](https://github.com/ratiw/vuetable-2/blob/master/upgrade-guide.md) on how you could upgrade from Vuetable for Vue 1.x.

You can make use of Vue’s scoped slots with the `__slot` special field, thanks to @sjmarve. That means you are able to define action buttons per instance of a data table without depending on a globally defined component.

Use a scoped slot in the parent when defining the actions ([Vue 3 — Scoped slots](https://vuejs.org/guide/components/slots.html#scoped-slots))

e.g.

```html
<template #actions="props">
  <div class="table-button-container">
    <button
      class="btn btn-default"
      @click="onClick('edit-item', props.rowData)"
    >
      <i class="fa fa-edit"></i> View</button
    >&nbsp;&nbsp;
    <button
      class="btn btn-danger"
      @click="onClick('delete-item', props.rowData)"
    >
      <i class="fa fa-remove"></i> Edit</button
    >&nbsp;&nbsp;
  </div>
</template>
```

The `onClick` handler can be defined in the parent; the parent has access to `rowData` and `rowIndex` via the slot props.

The original functionality still works.

# Breaking changes

## v1.6.0

- The `icons` prop of VuetablePagination is now moved into the `css` prop object. See this [codepen](https://codepen.io/ratiw/pen/GmJayw).

# Example code

- Clone the project
- Go into the cloned directory
- `npm install` or `yarn`
- `npm run dev` or `yarn dev`
- Open the browser to `http://localhost:8080`

# Usage

## npm

```shell
npm install vuetable-3 --save
```

Or with Yarn:

```shell
yarn add vuetable-3
```

In a Vue 3 app, register the bundled components with the exported `install` helper:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { install } from "vuetable-3";

const app = createApp(App);
app.use({ install });
app.mount("#app");
```

You can also import individual components (e.g. `Vuetable`, `VuetablePagination`) from `vuetable-3` and register them locally instead of using `install`.

## JavaScript via CDN

Thanks to @cristijora for providing help on this.

```html
<!-- Vue 3 and dependencies -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/vuetable-3/dist/vuetable-3.css"
/>
<script src="https://unpkg.com/vuetable-3"></script>
```

```javascript
const { createApp } = Vue;
const app = createApp(/* your root component */);
app.use(Vuetable);
app.mount("#app");
```

The UMD build exposes the bundle as the global `Vuetable` (includes an `install` method for `app.use`).

The `install` function registers these tag names globally (`vuetable`, `vuetable-pagination`, `vuetable-pagination-dropdown`, `vuetable-pagination-info`). See [`src/index.js`](src/index.js).

With the UMD global `Vuetable`, named exports are available as properties (e.g. `Vuetable.Vuetable`, `Vuetable.VuetablePagination`, `Vuetable.install`).

# Contributions

Any contribution to the code (via pull request would be nice) or any part of the documentation and any idea and/or suggestion are very welcome.

> **Note**
> For any bug fix, the PR should be forked from the `master` branch. And for any suggestion or additional feature, the PR should be forked from the `develop` branch, where it can be integrated and rolled out in the next release.
>
> If you are not sure, please ask by openning a new issue.

However, please do not feel bad if your pull requests or contributions do not get merged or implemented into Vuetable.

Your contributions can, not only help make Vuetable better, but also push it away from what I intend to use it for. I just hope that you find it useful for your use or learn something useful from its source code. But remember, you can always fork it to make it work the way you want.

# License

Vuetable is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
