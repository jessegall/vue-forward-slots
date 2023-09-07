<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h, useSlots } from 'vue';

export default defineComponent({
    name: "ForwardSlots",
    props: {
        slots: {
            type: Array,
            default: () => null,
        },
        exclude: {
            type: Array,
            default: () => ['default']
        }
    },
    setup(props) {
        const currentInstance = getCurrentInstance();
        const slots = useSlots();

        const childComponent = computed(() => {
            const component = slots.default?.()[0];
            return withForwardedSlots(component, currentInstance, props);
        });

        return () => h(childComponent.value);
    }
});

function withForwardedSlots(component: any, instance: any, options: any = {}): any {
    const { slots: includedSlots = null, exclude = null } = options;
    const resolvedSlots = gatherSlots(instance);

    const filteredSlots = Object.keys(resolvedSlots)
        .filter(key => (! includedSlots || includedSlots.includes(key)) && (! exclude || ! exclude.includes(key)))
        .reduce((acc, key) => {
            acc[key] = args => resolvedSlots[key](args);
            return acc;
        }, {} as Record<string, (args: any) => any>);

    return h(component, options, { ...filteredSlots, ...useSlots() });
}

function gatherSlots(instance: any): any {
    const slots = { ...instance.slots };
    if (instance.parent) {
        Object.assign(slots, instance.parent.slots);
    }
    return slots;
}
</script>