import {
    computed,
    defineComponent,
    h,
    PropType,
    VNode,
} from 'vue';

type SlotOption = string | string[];
type Slots = Record<string, Function>;

interface ForwardSlotsProps {
    slots: Slots;
    only?: SlotOption;
    except?: SlotOption;
}

function isValidSlotOption(value: any): value is SlotOption {
    return typeof value === 'string' || Array.isArray(value);
}

function wrap(input: any): string[] {
    if (! Array.isArray(input)) {
        input = [input];
    }

    return input.filter(Boolean);
}

function createSlots(slots: Slots, options: ForwardSlotsProps) {
    const include = wrap(options.only);
    const exclude = wrap(options.except);

    return Object.entries(slots)
        .filter(([slotName]) => shouldIncludeSlot(slotName, include, exclude))
        .reduce((result, [slotName, slotFunction]) => {
            result[slotName] = (args: any) => slotFunction(args);
            return result;
        }, {} as Slots);
}

function shouldIncludeSlot(key: string, include: string[], exclude: string[]): boolean {
    if (include.length && ! include.includes(key)) {
        return false
    }

    return ! exclude.includes(key);
}

function createComponent(component: VNode | undefined, options: ForwardSlotsProps, slots: Slots): VNode {
    return h(component, {}, createSlots(slots, options));
}

export const ForwardSlots = defineComponent({
    name: "ForwardSlots",
    props: {
        slots: {
            type: Object as PropType<Slots>,
            default: () => ({}),
            required: true
        },
        only: {
            type: [String, Array] as PropType<SlotOption>,
            default: () => [] as SlotOption,
            validator: isValidSlotOption,
        },
        except: {
            type: [String, Array] as PropType<SlotOption>,
            default: () => [] as SlotOption,
            validator: isValidSlotOption,
        }
    },
    setup(props: ForwardSlotsProps, ctx) {
        const children = computed(() => ctx.slots.default?.() || []);

        return () => children.value.map((node: VNode) => {
            const slots = Object.assign({}, node.children, props.slots);
            return createComponent(node, props, slots)
        });
    }
})
