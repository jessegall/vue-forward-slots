import type { App, Directive } from "vue";
import { useForwardSlots } from "./composable";

function forwardSlots(vnode: any) {
    const { forwardSlotsTo } = useForwardSlots();
    forwardSlotsTo(vnode.ctx, vnode.ctx.parent);
}

export const forwardSlotsDirective: Directive = {
    created(el, binding, vnode) {
        forwardSlots(vnode);
    },
    updated(el, binding, vnode) {
        forwardSlots(vnode);
    },
};

const VueForwardSlots = {
    install(app: App) {
        app.directive('forward-slots', forwardSlotsDirective);
    }
};

export default VueForwardSlots;
