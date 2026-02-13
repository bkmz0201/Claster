import {} from '@playwright/test';
export async function clickCollaborationPanel(page) {
    await page.click('[data-tab-key="collaboration"]');
}
export async function clickPublishPanel(page) {
    await page.click('[data-tab-key="publish"]');
}
export async function openSettingModal(page) {
    await page.getByTestId('settings-modal-trigger').click();
}
export async function openAppearancePanel(page) {
    await page.getByTestId('appearance-panel-trigger').click();
}
export async function openEditorSetting(page) {
    await page.getByTestId('settings-modal-trigger').click();
    await page.getByTestId('editor-panel-trigger').click();
}
export async function openShortcutsPanel(page) {
    await page.getByTestId('shortcuts-panel-trigger').click();
}
export async function openAboutPanel(page) {
    await page.getByTestId('about-panel-trigger').click();
}
export async function openEditorInfoPanel(page) {
    await page.getByTestId('header-info-button').click();
}
export async function openExperimentalFeaturesPanel(page) {
    await page.getByTestId('experimental-features-trigger').click();
}
export async function confirmExperimentalPrompt(page) {
    await page.getByTestId('experimental-prompt-disclaimer').click();
    await page.getByTestId('experimental-confirm-button').click();
}
export async function openWorkspaceSettingPanel(page) {
    await page
        .getByTestId('settings-sidebar')
        .getByTestId('workspace-setting:preference')
        .click();
}
export async function clickUserInfoCard(page) {
    await page.getByTestId('user-info-card').click({
        delay: 50,
    });
}
export async function closeSettingModal(page) {
    await page
        .getByTestId('setting-modal')
        .getByTestId('modal-close-button')
        .click();
}
//# sourceMappingURL=setting.js.map