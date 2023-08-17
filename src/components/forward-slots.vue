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
        const child = computed(() => {
            const instance = getCurrentInstance();
            const slots = useSlots();
            const component = slots.default?.()[0];
            return withForwardSlots(component, instance, props)
        });

        function withForwardSlots(
            component: any,
            instance = getCurrentInstance(),
            options: any = {}
        ): any {
            const { slots = null, exclude = null } = options;

            const resolved = findSlotsRecursive(instance);

            const filtered = Object.keys(resolved)
                .filter((key) => ! slots || slots.includes(key))
                .filter((key) => ! exclude || ! exclude.includes(key))
                .reduce((acc, key) => {
                    acc[key] = (args: any) => resolved[key](args);
                    return acc;
                }, {} as Record<string, (args: any) => any>);

            return h(component, props, { ...filtered, ...slots })
        }

        function findSlotsRecursive(instance: any): any {
            const slots: any = {};

            if (instance?.parent) {
                Object.assign(slots, findSlotsRecursive(instance.parent))
            }

            if (instance?.slots) {
                Object.assign(slots, instance.slots)
            }

            return slots;
        }

        // Return the render function
        return () => h(child.value);
    }
});
</script>
