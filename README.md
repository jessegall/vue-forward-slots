# Vue Forward Slots

Need to forward slots to a child component? This package makes it easy to forward slots to a child component.

**No more need for iterating over slots and passing them down to child components!**

## Old way 💩
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

## New way 🚀
```vue
<script setup>
import MyComponent from '@/Components/MyComponent.vue'
import { useForwardSlots } from "vue-forward-slots";

const { forwardSlotsTo } = useForwardSlots();
forwardSlotsTo(MyComponent); // Jup, that easy!
</script>

<template>
    <MyComponent/> <!-- Slots will now be forwarded to MyComponent -->
</template>
```

## Installation

```bash
npm install vue-forward-slots
```
