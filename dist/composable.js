import { useSlots } from "vue";
export function useForwardSlots() {
    function forwardSlotsTo(component) {
        const render = component.render;
        const slots = useSlots();
        component.render = (context, ...args) => {
            return render(new Proxy(context, {
                get(target, prop) {
                    if (prop === '$slots') {
                        return Object.assign(Object.assign({}, slots), context.$slots);
                    }
                    return target[prop];
                }
            }), ...args);
        };
    }
    return {
        forwardSlotsTo,
    };
}
