import { DefineComponent } from 'vue';

export interface ForwardSlotsProps {
    slots: Record<string, Function>;
    only?: string | string[];
    except?: string | string[];
}

export const ForwardSlots: DefineComponent<ForwardSlotsProps>;