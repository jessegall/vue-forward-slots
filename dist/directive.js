import { useForwardSlots } from "./composable";
function forwardSlots(vnode) {
    const { forwardSlotsTo } = useForwardSlots();
    forwardSlotsTo(vnode.ctx, vnode.ctx.parent);
}
export const forwardSlotsDirective = {
    created(el, binding, vnode) {
        forwardSlots(vnode);
    },
    updated(el, binding, vnode) {
        forwardSlots(vnode);
    },
};
const VueForwardSlots = {
    install(app) {
        app.directive('forward-slots', forwardSlotsDirective);
    }
};
export default VueForwardSlots;