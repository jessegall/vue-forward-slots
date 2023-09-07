# Vue Forward Slots

Need to forward slots to a child component? This package makes it easy to forward slots to a child component.

**No more need for iterating over slots and passing them down to child components!**

## With vue forward slots 🚀

```vue
<script setup>
import MyComponent from '@/Components/MyComponent.vue'
import ForwardSlots from 'vue-forward-slots'
</script>

<template>
    <ForwardSlots>
        <MyComponent/> <!-- Slots will now be forwarded to MyComponent -->
    </ForwardSlots>
</template>
```

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

## Installation

```bash
npm install vue-forward-slots
```

## Usage

### Import the Component

```vue
<script setup>
import ForwardSlots from 'vue-forward-slots'
</script>
```

### Forward All Slots

```vue
<template>
    <ForwardSlots>
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Forward Specific Slots

```vue
<template>
    <ForwardSlots :slots="['slot-one', 'slot-two']">
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

| Prop      | Type  | Description                                                                                                            | Default Value |
|-----------|-------|------------------------------------------------------------------------------------------------------------------------|---------------|
| `slots`   | Array | A list of slot names you want to forward. If omitted, all slots will be forwarded (except any specified in `exclude`). | `null`        |
| `exclude` | Array | A list of slot names you don't want to forward. The `default` slot is always excluded by default.                      | `['default']` |