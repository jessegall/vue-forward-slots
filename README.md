# Vue Forward Slots

Effortlessly forward slots to child components in Vue 3 applications.

## Features

- Easily forward all slots or specific slots to child components
- Simple and declarative syntax

## Why Vue Forward Slots?

In Vue applications, it's common to need to forward slots from a parent component to a child component. However, the default way of doing this can be verbose and repetitive. Consider the following example:

### The Default Way

```vue
<template>
    <ChildComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </ChildComponent>
</template>
```

## Installation

```bash
npm install vue-forward-slots
```

## Usage

### Basic Usage

```vue
<script setup>
    import MyComponent from '@/Components/MyComponent.vue'
    import { ForwardSlots } from 'vue-forward-slots'
</script>

<template>
    <ForwardSlots>
        <MyComponent/> <!-- All slots will be forwarded to MyComponent -->
    </ForwardSlots>
</template>
```

### Forwarding Only Specific Slots

```vue
<template>
    // For a single slot
    <ForwardSlots slot="header">
        <MyComponent/>
    </ForwardSlots>

    // For multiple slots
    <ForwardSlots :slots="['header', 'footer']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Excluding Specific Slots

```vue
<template>
    // Excluding a single slot
    <ForwardSlots :exclude="'sidebar'">
        <MyComponent/>
    </ForwardSlots>

    // Excluding multiple slots
    <ForwardSlots :exclude="['sidebar', 'footer']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

## How It Works

The `ForwardSlots` component uses some clever tricks to simplify slot forwarding:

1. It captures the parent component's slots during initialization.
2. It filters these slots based on the `slot` and `exclude` props.
3. It creates copies of the selected slots.
4. It passes these copies to the child components.

This happens automatically, allowing for easy and flexible slot forwarding without cluttering your template code.