import PageFragment from '../pageFragment';
import comboxHasPopup from '../fragments/comboxHasPopup';
import { ComboxSelectors } from '../../../types/qlik';
import optionsPopup from '../fragments/optionsPopup';

class dialogSimple extends PageFragment {
  addBtn: PageFragment;
  closeBtn: PageFragment;
  comboxWithInput: comboxHasPopup;
  comboxWithList: comboxHasPopup;

  constructor(selectors: ComboxSelectors) {
    super("[role='dialog']");
    if (selectors.comboxWithInputSelector) {
      this.comboxWithInput = new comboxHasPopup(selectors.comboxWithInputSelector);
    }
    if (selectors.comboxWithListselector) {
      this.comboxWithList = new comboxHasPopup(selectors.comboxWithListselector);
    }
    this.addBtn = new PageFragment(() => this.$addBtn);
    this.closeBtn = new PageFragment(() => this.$closeBtn);
  }

  private get $addBtn() {
    return this.$root.$("[data-testid='confirm-confirmation-btn'],[data-testid='license-assignments_add-assignment-add-button']");
  }

  private get $closeBtn() {
    return this.$root.$("[data-testid='confirm-cancel-btn'],[data-testid='add-assignment-modal__close-button']");
  }

  private async clickAddBtn() {
    await this.addBtn.clickWhenClickable();
  } 

  private async clickCloseBtn() {
    await this.closeBtn.clickWhenClickable();
  }
  
  async close() {
    await this.clickCloseBtn();
    await this.$root.waitForDisplayed({reverse:true});
  }
  
  async clickComboxToSelectOption(combox: comboxHasPopup, options) {
    await combox.clickWhenClickable();
    await this.selectOptions(options);
  }

  async selectOptions(options) {
    let optionListPopup = new optionsPopup();
    await optionListPopup.waitForLoaded();
    await options.forEach(async (option) => {
      await optionListPopup.selectOption(option);
    });
    await browser.pause(1000)
    if (await optionListPopup.isDisplayed()) {
        await this.$root.click({ x: 1, y: 1 });
    }
    await optionListPopup.waitForDisappear();
  }

  async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === true &&
        (await this.comboxWithInput.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The profile menu did not display'}
    );
  }
}

export default dialogSimple;
