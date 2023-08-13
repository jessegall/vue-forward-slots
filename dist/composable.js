"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForwardSlots = void 0;
const vue_1 = require("vue");
function useForwardSlots() {
    function forwardSlotsTo(component) {
        const render = component.render;
        const slots = (0, vue_1.useSlots)();
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
exports.useForwardSlots = useForwardSlots;
