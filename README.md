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
    import {ForwardSlots} from "vue-forward-slots";

    ...
</script>
```

## Usage

### Example Usage

A classic example is that of a table component with multiple levels of nested components.
We can easily define and forward slots to nested components using the `ForwardSlots` component.

#### Root Component

We define the slots in the root component.

```vue
<template>
    <TableComponent>
        <template #name-header>
            <p class="font-bold">
                Name
            </p>
        </template>

        // We still have access to the slot data like we would normally
        <template #status-cell="{ user }">
            <StatusBadge :status="user.status"/>
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
                Some default text
            </slot>
        </th>
        <th>
            <slot name="status-header">
                Some default text
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
    <tr v-for="user in users">
        <td>
            <slot name="name-column" :user="user">
                {{ user.name }}
            </slot>
        </td>
        <td>
            <slot name="status-column" :user="user">
                {{ user.status }}
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
                <TableHeaderCell :header="header"/>
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

