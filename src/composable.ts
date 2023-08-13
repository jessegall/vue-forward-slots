import { useSlots } from "vue";

export function useForwardSlots() {

    function forwardSlotsTo(component: any): void {
        const render = component.render;

        const slots = useSlots();

        component.render = (context: any, ...args: any) => {
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
