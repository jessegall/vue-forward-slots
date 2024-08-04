import { computed, defineComponent, getCurrentInstance, h, PropType, useSlots, VNode } from 'vue';

type SlotOption = string | string[];

interface ForwardSlotsProps {
    slot?: SlotOption;
    exclude?: SlotOption;
}

const isValidSlotOption = (value: any): value is SlotOption =>
    typeof value === 'string' || Array.isArray(value);

const normalizeToArray = (input: SlotOption | undefined): string[] =>
    Array.isArray(input) ? input : input ? [input] : [];

const createSlots = (slots: Record<string, Function>, options: ForwardSlotsProps) => {
    const include = normalizeToArray(options.slot);
    const exclude = normalizeToArray(options.exclude);

    return Object.entries(slots)
        .filter(([key]) =>
            (! include.length || include.includes(key)) &&
            (! exclude.length || ! exclude.includes(key))
        )
        .reduce((acc, [key, slot]) => ({ ...acc, [key]: (args: any) => slot(args) }), {});
};

const withForwardedSlots = (component: VNode | undefined, slots: Record<string, Function>, options: ForwardSlotsProps): VNode =>
    h(component, options, createSlots(slots, options));

const ForwardSlotsComponent = defineComponent({
    name: "ForwardSlots",
    props: {
        slot: {
            type: [String, Array] as PropType<SlotOption>,
            default: () => [] as SlotOption,
            validator: isValidSlotOption,
        },
        exclude: {
            type: [String, Array] as PropType<SlotOption>,
            default: () => 'default',
            validator: isValidSlotOption,
        }
    },
    setup(props: ForwardSlotsProps, ctx) {
        const childComponents = computed(() => ctx.slots.default?.() || []);

        return () => childComponents.value.map(component =>
            withForwardedSlots(component, (ctx as any).__slots || {}, props)
        );
    }
})

let lastInstanceId: number = null;
let currentSlots = {} as Record<string, Function>;

const originalSetup = ForwardSlotsComponent.setup;
ForwardSlotsComponent.setup = (props, ctx) => originalSetup(props, { ...ctx, __slots: currentSlots } as any)

export const ForwardSlots = new Proxy(ForwardSlotsComponent, {
    get(target: any, prop: string | symbol) {

        // The __v_isRef property is accessed when Vue initializes the component.
        // We use this as a hook to capture the correct slots for forwarding.
        // At this point, useSlots() still references the context where ForwardSlots is used,
        // allowing us to capture the intended parent slots before they're overwritten.
        if (prop === '__v_isRef') {
            const instance = getCurrentInstance();

            if (instance && instance.uid !== lastInstanceId) {
                currentSlots = useSlots();
                lastInstanceId = instance.uid;
            }
        }

        return target[prop];
    }
});


export default ForwardSlots;
