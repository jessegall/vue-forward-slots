declare module 'vue-forward-slots' {
    import { DefineComponent } from 'vue';

    export interface ForwardSlotsProps {
        slots?: string[];
        exclude?: string[];
    }

    const ForwardSlots: DefineComponent<ForwardSlotsProps>;

    export default ForwardSlots;
}
