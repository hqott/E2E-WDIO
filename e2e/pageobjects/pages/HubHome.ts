import Page from '../page';
import NavigationTopBar from '../fragments/NavigationTopBar';

class HubHome extends Page {
  topBar: NavigationTopBar;

  constructor(redirectURL) {
    super(redirectURL)
    this.topBar = new NavigationTopBar(() => this.$NavigationTopBar);
  }

  private get $NavigationTopBar() {
    return $("header");
  }

  async waitForPageReady() {
    await this.topBar.waitForLoaded();
  }

  async logout() {
    await this.topBar.logout();
    await this.topBar.waitForExist({reverse:true});
  }
}

export default HubHome;
