export async function clickSideBarSettingButton(page) {
    return page.getByTestId('slider-bar-workspace-setting-button').click();
}
export async function clickSideBarAllPageButton(page) {
    return page.getByTestId('all-pages').click();
}
export async function clickSideBarCurrentWorkspaceBanner(page) {
    return page.getByTestId('current-workspace-card').click();
}
export async function clickSideBarUseAvatar(page) {
    return page.getByTestId('sidebar-user-avatar').click();
}
export async function clickNewPageButton(page) {
    return page.getByTestId('sidebar-new-page-button').click();
}
export async function openRightSideBar(page, tab) {
    await page.getByTestId('right-sidebar-toggle').click();
    tab && (await page.getByTestId(`sidebar-tab-${tab}`).click());
}
//# sourceMappingURL=sidebar.js.map