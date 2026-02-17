import { DefineComponent, Slot } from 'vue';

export interface ForwardSlotsProps {
    slots: {
        [name: string]: Slot<any> | undefined;
    };
    only?: string | string[];
    except?: string | string[];
}

export const ForwardSlots: DefineComponent<ForwardSlotsProps>;