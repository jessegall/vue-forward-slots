# Vue Forward Slots

Need to forward slots to a child component?
This package will help you do just that in a simple and clean way.

## Installation

```bash
npm install vue-forward-slots
```

In your main.js file:

```js
import { createApp } from 'vue';
import App from './App.vue';
import { VueForwardSlots } from 'vue-forward-slots';

const app = createApp(App);
app.use(VueForwardSlots); 
```

## Usage

Using a directive:

```vue

<MyComponent v-forward-slots/>
```

Or using a composable:

```vue

<script setup>
import MyComponent from '@/Components/MyComponent.vue'
import { useForwardSlots } from "vue-forward-slots";

const { forwardSlotsTo } = useForwardSlots();
forwardSlotsTo(MyComponent);
</script>

<template>
    <MyComponent/> <!-- Slots will now be forwarded to MyComponent -->
</template>
```

## The old default way without this package

```vue

<script setup>
import MyComponent from '@/Components/MyComponent.vue';

...

</script>

<template>
    <MyComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </MyComponent>
</template>
```
