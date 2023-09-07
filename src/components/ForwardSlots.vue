<script lang="ts">
import { ForwardSlotsProps } from "@/vue-forward-slots";
import { computed, defineComponent, getCurrentInstance, h, PropType, useSlots, VNode } from 'vue';


function validator(value: any): boolean {
    return typeof value === 'string' || Array.isArray(value);
}

export default defineComponent({
    name: "ForwardSlots",
    props: {
        slot: {
            type: [String, Array] as PropType<string | string[]>,
            default: () => [],
            validator,
        },
        exclude: {
            type: [String, Array] as PropType<string | string[]>,
            default: () => 'default',
            validator,
        }
    },
    setup(props: ForwardSlotsProps, ctx) {
        // Allow backwards compatability
        if (ctx.attrs.slots) {
            props = new Proxy(props, {
                get(target, prop) {
                    if (prop === 'slot') {
                        return ctx.attrs.slots;
                    }

                    return target[prop];
                }
            });
        }

        const currentInstance = getCurrentInstance();
        const slots = useSlots();

        const childComponents = computed(() => slots.default?.().map(
            component => withForwardedSlots(component, currentInstance, props)) || []
        );

        return () => childComponents.value.map(childComponent => h(childComponent));
    }
});

function withForwardedSlots(component: VNode | undefined, instance: any, options: ForwardSlotsProps = {}): VNode {
    let include = normalizeToArray(options.slot);
    let exclude = normalizeToArray(options.exclude);

    const slots = resolveSlots(instance);

    const filteredSlots: Record<string, (args: any) => any> = Object.keys(slots)
        .filter(key => (! include.length || include.includes(key)) && (! exclude.length || ! exclude.includes(key)))
        .reduce((acc, key) => {
            acc[key] = args => slots[key](args);
            return acc;
        }, {});

    return h(component, options, filteredSlots);
}

function normalizeToArray(input: string | string[] | undefined) {
    if (Array.isArray(input)) return input;
    return input ? [input] : [];
}

function resolveSlots(instance: any): any {
    const slots = { ...instance.slots };
    if (instance.parent) {
        Object.assign(slots, instance.parent.slots);
    }
    return slots;
}
</script>
