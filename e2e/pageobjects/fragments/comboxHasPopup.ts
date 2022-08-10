import { WaitForOptions } from 'webdriverio';
import PageFragment from '../pageFragment';

class comboxHasPopup extends PageFragment {
  comboxInput: PageFragment;
 
  constructor(selector) {
    super(selector);
    this.comboxInput = new PageFragment(() => this.$comboxInput);
  }

  private get $comboxInput() {
    return this.$root.$("input")
  }

  async setInputValue(value) {
    await this.comboxInput.setValue(value);
  }

 //No  
/*   async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The combox has popup displayed/disappear.'}
    );
  } */

}

export default comboxHasPopup;
