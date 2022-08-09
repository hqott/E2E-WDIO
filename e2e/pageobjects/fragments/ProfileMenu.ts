import PageFragment from '../pageFragment';

class ProfileMenu extends PageFragment {
  readonly logoutBtn: PageFragment;


  constructor() {
    super("[data-testid='profileMenu']");
    this.logoutBtn = new PageFragment(() => this.$logoutBtn);
  }

  private get $logoutBtn() {
    return $("#app-switcher-logout");
  }

  async clickLogout() {
    await this.logoutBtn.clickWhenClickable();
  } 

  async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === true &&
        (await this.logoutBtn.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The profile menu did not display'}
    );
  }
}

export default ProfileMenu;
