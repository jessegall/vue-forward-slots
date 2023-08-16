<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, h, useSlots } from 'vue';

interface Props {
    slots?: string[];
    exclude?: string[];
}

const props = defineProps<Props>()

const child = computed(() => {
    const instance = getCurrentInstance();
    const slots = useSlots();
    const component = slots.default?.()[0];
    return withForwardSlots(component, instance, props)
})

function withForwardSlots(
    component: any,
    instance = getCurrentInstance(),
    options: Props = {}
): any {
    const { slots = null, exclude = ['default'] } = options;

    const resolved = findSlotsRecursive(instance);

    const filtered = Object.keys(resolved)
        .filter((key) => ! slots || slots.includes(key))
        .filter((key) => ! exclude || ! exclude.includes(key))
        .reduce((acc, key) => {
            acc[key] = (args) => resolved[key](args);
            return acc;
        }, {} as Record<string, (args: any) => any>);

    return defineComponent({
        name: "ForwardSlots",
        setup(props, { slots }) {
            return () => h(component, props, { ...filtered, ...slots });
        },
    });
}

function findSlotsRecursive(instance: any): any {
    const slots = {};

    if (instance?.parent) {
        Object.assign(slots, findSlotsRecursive(instance.parent))
    }

    if (instance?.slots) {
        Object.assign(slots, instance.slots)
    }

    return slots;
}

</script>

<!-- ForwardSlots.vue -->
<template>
	<component :is="child"/>
</template>
