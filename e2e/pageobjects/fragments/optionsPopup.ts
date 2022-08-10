import PageFragment from '../pageFragment';
import { WaitForOptions } from 'webdriverio';

class optionsPopup extends PageFragment {

  constructor() {
    super("ul[role = 'listbox']");
  }

  async selectOption(option) {
    await option.waitForDisplayed();
    await option.click();
}

  async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The popup menu did not display'}
    );
  }

  async waitForDisappear() {
    return browser.waitUntil(
      async () =>
        (await this.$root.isDisplayed()) === false,
      { timeout: 30000, timeoutMsg: 'The popup menu did not disappear' }
    );
  }
}

export default optionsPopup;
