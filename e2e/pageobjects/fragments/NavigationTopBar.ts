import PageFragment from '../pageFragment';
import ProfileMenu from './ProfileMenu';

class NavigationTopBar extends PageFragment {
  readonly profileMenu: ProfileMenu;
  readonly profileBtn: PageFragment;


  constructor(selector) {
    super(selector);
    this.profileBtn = new PageFragment(() => this.$profileBtn);
    this.profileMenu = new ProfileMenu();
  }

  private get $profileBtn() {
    return $("[data-testid='top-bar-profile-button']");
  }

  async waitForDisplayed() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) ===true &&
        (await this.profileBtn.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The top bar did not display'}
    );
  }

  private async openProfile() {
    await this.profileBtn.clickWhenClickable();
    await this.profileMenu.waitForDisplayed();
  }

  async logout(){
    await this.openProfile();
    await this.profileMenu.clickLogout();
    await this.profileMenu.waitForExist({reverse: true});
  }
}

export default NavigationTopBar;
