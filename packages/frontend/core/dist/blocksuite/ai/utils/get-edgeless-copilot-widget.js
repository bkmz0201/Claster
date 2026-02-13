import { AFFINE_EDGELESS_COPILOT_WIDGET } from '../widgets/edgeless-copilot/constant';
export function getEdgelessCopilotWidget(host) {
    const rootBlockId = host.store.root?.id;
    const copilotWidget = host.view.getWidget(AFFINE_EDGELESS_COPILOT_WIDGET, rootBlockId);
    return copilotWidget;
}
//# sourceMappingURL=get-edgeless-copilot-widget.js.map