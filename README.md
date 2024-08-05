# Vue Forward Slots

Effortlessly forward slots to child components in Vue 3 applications.

## Features

- Easily forward all slots or specific slots to child components
- Simple and declarative syntax

## Why Vue Forward Slots?

In Vue applications, it's common to need to forward slots from a parent component to a child component. However, the
default way of doing this can be verbose and repetitive. Consider the following example:

### The Default Way

```vue
<template>
    <ChildComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </ChildComponent>
    <AnotherChildComponent>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
        </template>
    </AnotherChildComponent>
</template>
```

Verbose and hard to read!

### With Vue Forward Slots

```vue
<template>
    <ForwardSlots :slots="$slots">
        <ChildComponent/>
        <AnotherChildComponent/>
    </ForwardSlots>
</template>
```

Simple and clean!

## Installation

```bash
npm install vue-forward-slots
```

### Importing

You can import it in the component where you want to use it.

```vue
<script>
    import { ForwardSlots } from "vue-forward-slots";
    ...
</script>
```

## Usage

### Example Usage

A classic example is that of a table component with multiple levels of nested components.
We can easily define and forward slots to nested components using the `ForwardSlots` component.

#### Root Component

In this example we want the name header and role column to be customized. We define the slots like normal.

```vue
<template>
    <TableComponent>
        // Notice that we still have access to the slot data like we would normally
        <template #name-header="{ value }">
            <p class="font-bold">{{ value }}</p>
        </template>

        <template #role-column="{ value }">
            <RoleBadge :role="value"/>
        </template>
    </TableComponent>
</template>
```

#### Table Component

We forward the slots to the child components.

```vue
<template>
    <table>
        // Notice that we can wrap multiple components in the ForwardSlots component
        <ForwardSlots :slots="$slots">
            <TableHeadComponent/>
            <TableBodyComponent/>
        </ForwardSlots>
    </table>
</template>
```

#### TableHead Component

The TableHeadComponent now has access to the slots defined in the root component. If no slot is provided, it will
default to the text in the slot.

```vue
<template>
    <thead>
    <tr>
        <th>
            <slot name="name-header">
                Name
            </slot>
        </th>
        <th>
            <slot name="role-header">
                Role
            </slot>
        </th>
    </tr>
    </thead>
</template>
```

#### TableBody Component

The TableBodyComponent also has access to the slots defined in the root component. If no slot is provided, it will
default to the text in the slot.

```vue
<template>
    <tbody>
    <tr v-for="row in rows">
        <td>
            <slot name="name-column" :value="row.name">
                {{ row.name }}
            </slot>
        </td>
        <td>
            <slot name="role-column" :value="row.role">
                {{ row.role }}
            </slot>
        </td>
    </tr>
    </tbody>
</template>
```

We could even go a step further and forward the slots to the next level of child components.

```vue
<template>
    <thead>
    <tr>
        <th v-for="header in headers">
            <ForwardSlots :slots="$slots">
                <TableHeaderCellComponent/>
            </ForwardSlots>
        </th>
    </tr>
    </thead>
</template>
```

In theory, we could keep forwarding slots to as many levels of child components as we need.

### Forwarding Only Specific Slots

```vue
<template>
    // For a single slot
    <ForwardSlots :slots="$slots" only="header">
        <MyComponent/>
    </ForwardSlots>

    // For multiple slots
    <ForwardSlots :slots="$slots" :only="['header', 'footer']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

### Excluding Specific Slots

```vue
<template>
    // For a single slot
    <ForwardSlots :slots="$slots" except="sidebar">
        <MyComponent/>
    </ForwardSlots>

    // For multiple slots
    <ForwardSlots :slots="$slots" :except="['sidebar', 'footer']">
        <MyComponent/>
    </ForwardSlots>
</template>
```

