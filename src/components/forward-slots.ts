import {
    ComponentInternalInstance,
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    PropType,
    VNode
} from 'vue';

type SlotOption = string | string[];

interface ForwardSlotsProps {
    slot?: SlotOption;
    exclude?: SlotOption;
}

function isValidSlotOption(value: any): value is SlotOption {
    return typeof value === 'string' || Array.isArray(value);
}

function normalizeToArray(input: SlotOption | undefined): string[] {
    return Array.isArray(input) ? input : input ? [input] : [];
}

function createSlots(slots: Record<string, Function>, options: ForwardSlotsProps) {
    const include = normalizeToArray(options.slot);
    const exclude = normalizeToArray(options.exclude);

    return Object.fromEntries(
        Object.entries(slots)
            .filter(([key]) => shouldIncludeSlot(key, include, exclude))
            .map(([key, slot]) => [key, (args: any) => slot(args)])
    );
}

function shouldIncludeSlot(key: string, include: string[], exclude: string[]): boolean {
    if (include.length && ! include.includes(key)) return false;
    if (exclude.length && exclude.includes(key)) return false;
    return true;
}

function withForwardedSlots(component: VNode | undefined, options: ForwardSlotsProps, slots: Record<string, Function>): VNode {
    return h(component, options, createSlots(slots, options));
}

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
        const children = computed(() => ctx.slots.default?.() || []);

        return () => children.value.map(vNode => withForwardedSlots(vNode, props, {
            ...(vNode as any).children,
            ...(currentInstance?.slots || {})
        }));
    }
})

let currentInstance: ComponentInternalInstance = null;

export const ForwardSlots = new Proxy(ForwardSlotsComponent, {
    get(target: any, prop: string | symbol) {

        // The __v_isVNode property is accessed when Vue initializes the component.
        // We use this as a hook to capture the correct instance to forward slots from.
        // At this point, getCurrentInstance() still references the instance where ForwardSlots is used,
        // allowing us to capture the intended parent before it's overwritten.
        if (prop === '__v_isVNode') {
            updateCurrentInstance(getCurrentInstance());
        }

        return target[prop];
    }
});

function updateCurrentInstance(instance: ComponentInternalInstance) {
    if (! instance) {
        currentInstance = null;
        return;
    }

    if (! currentInstance || currentInstance.uid !== instance.uid) {
        currentInstance = instance;
    }
}

export default ForwardSlots;
