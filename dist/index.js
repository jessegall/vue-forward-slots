import { forwardSlotsDirective } from "./directive";
export { useForwardSlots } from './composable';
export const VueForwardSlots = {
    install(app) {
        app.directive('forward-slots', forwardSlotsDirective);
    }
};
