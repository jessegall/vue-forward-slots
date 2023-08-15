# Vue Forward Slots

Need to forward slots to a child component?
This package will help you do just that in a simple and clean way.

## Installation

```bash
npm install vue-forward-slots
```

## Usage

```vue

<script setup>
import ForwardSlots from 'vue-forward-slots'
</script>

<template>
    `// Forward all slots
    <ForwardSlots>
        <MyComponent/>
    </ForwardSlots>

    // Forward specific slots
    <ForwardSlots :slots="['slot-one', 'slot-two']">
        <MyComponent/>
    </ForwardSlots>
    
    // Forward all but some slots
    <ForwardSlots :exclude="['slot-one', 'slot-two']">
        <MyComponent/>
    </ForwardSlots>
</template>
```