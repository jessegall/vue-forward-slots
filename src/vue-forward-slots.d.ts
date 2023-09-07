import { DefineComponent } from 'vue';

export interface ForwardSlotsProps {
    slot?: string | string[];
    exclude?: string | string[];
}

export const ForwardSlots: DefineComponent<ForwardSlotsProps>;

export default ForwardSlots;