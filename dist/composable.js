import { defineComponent, getCurrentInstance, h } from "vue";
export function useForwardSlots() {
    function forwardSlotsTo(component, instance = getCurrentInstance()) {
        if (!instance) {
            return;
        }
        const slots = Object.assign({}, instance.slots);
        if (component.uid) {
            if (!component.__v_isForwardSlot) {
                const originalRender = component.render;
                component.render = (context, ...args) => {
                    return originalRender(new Proxy(context, {
                        get(target, prop) {
                            if (prop === '$slots') {
                                return Object.assign(Object.assign({}, slots), context.$slots);
                            }
                            return target[prop];
                        }
                    }), ...args);
                };
                component.__v_isForwardSlot = true;
            }
            Object.assign(component.slots, slots);
        }
        else {
            const copy = Object.assign({}, component);
            // Delete all properties from the component
            for (const prop in component) {
                delete component[prop];
            }
            Object.assign(component, defineComponent({
                name: 'ForwardSlots',
                setup: (props) => () => h(copy, props, slots)
            }));
        }
    }
    return {
        forwardSlotsTo,
    };
}
