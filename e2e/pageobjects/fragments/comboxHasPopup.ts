import { WaitForOptions } from 'webdriverio';
import PageFragment from '../pageFragment';

class comboxHasPopup extends PageFragment {
  comboxInput: PageFragment;
  comboboxListselection: PageFragment;
  comboboxListselectionPopup: PageFragment;
  selectedButtonInsideInput: PageFragment; 

  constructor(selector) {
   // super("[role ='combobox'][aria-haspopup='true']");
    super(selector);
    this.comboxInput = new PageFragment(() => this.$comboxInput);
    this.comboboxListselection = new PageFragment(() => this.$comboboxListselection);
    this.comboboxListselectionPopup = new PageFragment(() => this.$comboboxListselectionPopup);
    this.selectedButtonInsideInput = new PageFragment(() => this.$selectedBoxInsideInput);
  }

  private get $comboxInput() {
    //return this.$root.$("input.ant-input, input");
    return this.$root.$("input")
  }

  private get $comboboxListselection() {
    //return this.$root.$(".ant-select-selection__placeholder");
    return this.$root;
  }

  private get $comboboxListselectionPopup() {
    return $("ul[role='listbox']");
  }

  private get $selectedBoxInsideInput() {
    return this.$root.$("div[role='button']");
  }

  getOption(text: string) {
    return $(`li*=${text}`);
  }

  async setInputValue(value) {
    await this.comboxInput.setValue(value);
  }

  async selectSubMenu(option) {
    await this.comboboxListselectionPopup.waitForLoaded();
    await option.waitForDisplayed();
    await option.click();
    await this.comboboxListselectionPopup.waitForLoaded({reverse: true});
  }

  async selectMultipleSubMenu(options: any[]) {
    await this.comboboxListselectionPopup.waitForLoaded();
    console.log('teststststs')
    options.forEach(async (element) => {
      await element.waitForDisplayed();
      await element.click();
    });
    //await this.comboboxListselectionPopup.waitForLoaded({reverse: true});
  }
  
  async clickToSelectSubMenu(options, mutipleOptions = false) {
    await this.comboboxListselection.clickWhenClickable();
    if (!mutipleOptions) {
      await this.selectSubMenu(options)
    } else {
      await this.selectMultipleSubMenu(options);
    }
  }

  async waitForLoaded(options?: WaitForOptions) {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === options.reverse,
        {timeout: 30000, timeoutMsg: 'The combox has popup displayed.'}
    );
  }

}

export default comboxHasPopup;
