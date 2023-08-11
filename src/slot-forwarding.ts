import { useSlots } from "vue";

export function useSlotForwarding() {

    function forwardSlotsTo(component: any) {
        const render = component.render;

        const slots = useSlots();

        return component.render = (context: any, ...args: any) => {
            return render(
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
    }

    return {
        forwardSlotsTo,
    }

}
