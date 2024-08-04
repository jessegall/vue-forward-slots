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

function makeForwardSlotsComponent(instance: ComponentInternalInstance) {
    const component = defineComponent({
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

            return () => {
                component.__forwardSlotsInitialized = true;

                return children.value.map(vNode => withForwardedSlots(vNode, props, {
                    ...(vNode as any).children,
                    ...instance.slots,
                }));
            }
        },
    });

    component.__forwardSlotsInitialized = false;

    component.__forwardSlotsParentUid = instance.uid;

    return component;
}

let current: ReturnType<typeof makeForwardSlotsComponent> | null = null;

export const ForwardSlots = new Proxy({}, {
    get(_, prop: string) {
        const instance = getCurrentInstance();

        if (! instance) {
            return current[prop];
        }

        if (! current || (current.__forwardSlotsInitialized && current.__forwardSlotsParentUid !== instance.uid)) {
            current = makeForwardSlotsComponent(instance);
        }

        return current[prop];
    }
});

export default ForwardSlots;