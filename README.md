# Vue Forward Slots

**Vue Forward Slots** is a Vue utility to effortlessly forward slots to child components. If you've ever been in a
situation where you needed to forward slots from a parent to a child component, this package makes that a breeze.

## Features

1. Forward all slots with ease.
2. Choose specific slots to forward.
3. Exclude certain slots from being forwarded.

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