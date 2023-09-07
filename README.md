# Vue Forward Slots

Need to forward slots to a child component? This package makes it easy to forward slots to a child component.

**No more need for iterating over slots and passing them down to child components!**

## With vue forward slots 🚀

```vue
<script setup>
import MyComponent from '@/Components/MyComponent.vue'
import { ForwardSlots } from 'vue-forward-slots'
</script>

<template>
    <ForwardSlots>
        <MyComponent/> <!-- Slots will now be forwarded to MyComponent -->
    </ForwardSlots>
</template>
```

You can even forward to multiple components at once!

```vue
<ForwardSlots>
    <MyComponent/>
    <MyOtherComponent/>
</ForwardSlots>
```

## Old way 💩

Without vue forward slots, you would have to do something like this:

```vue
<script setup>
import MyComponent from '@/Components/MyComponent.vue';
import MyOtherComponent from '@/Components/MyOtherComponent.vue';

...

</script>

<template>
    <MyComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </MyComponent>
    <MyOtherComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </MyOtherComponent>
</template>
```

Blegch! Bloated and ugly!

## Installation

```bash
npm install vue-forward-slots
```

## Usage

### Import the Component

```vue
<script setup>
import { ForwardSlots } from 'vue-forward-slots'
</script>
```

### Forward All Slots (Except Default)

```vue
<template>
    <ForwardSlots>
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Forward Single Slot

```vue
<template>
    <ForwardSlots slot="slotname">
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Forward Specific Slots

```vue
<template>
    <ForwardSlots :slot="['slot-one', 'slot-two']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Forward All Slots Except Some

```vue
<template>
    <ForwardSlots :exclude="['default', 'slot-two']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Forward All Slots Including Default

```vue
<template>
    <ForwardSlots :exclude="[]">
        <MyComponent/>
    </ForwardSlots>
</template>
```

## Props

| Prop      | Type          | Description                                                                                                                       | Default Value |
|-----------|---------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------|
| `slot`    | Array, String | Specifies slot names to forward, either as a string or an array. If omitted, all slots are forwarded (except those in `exclude`). | `[]`          |
| `exclude` | Array, String | Specifies slot names not to forward, either as a string or an array. The `default` slot is always excluded by default.            | `['default']` |
