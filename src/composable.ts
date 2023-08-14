import { defineComponent, getCurrentInstance, h } from "vue";

export function useForwardSlots() {

    function forwardSlotsTo(component: any, instance = getCurrentInstance()): void {
        if (! instance) {
            return;
        }

        const slots = { ...instance.slots };

        if (component.uid) {
            if (! component.__v_isForwardSlot) {
                const originalRender = component.render;

                component.render = (context: any, ...args: any) => {
                    return originalRender(
                        new Proxy(context, {
                            get(target, prop) {
                                if (prop === '$slots') {
                                    return { ...slots, ...context.$slots };
                                }

                                return target[prop];
                            }
                        }),
                        ...args
                    );
                }

                component.__v_isForwardSlot = true;
            }

            Object.assign(component.slots, slots);
        } else {
            const copy = { ...component };

            // Delete all properties from the component
            for (const prop in component) {
                delete component[prop];
            }

            Object.assign(component, defineComponent({
                name: 'ForwardSlots',
                setup: (props: any) => () => h(copy, props, slots)
            }));
        }
    }

    return {
        forwardSlotsTo,
    };
}
