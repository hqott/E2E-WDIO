import PageFragment from '../pageFragment';
import comboxHasPopup from '../fragments/comboxHasPopup';
import { ComboxSelectors } from '../../../types/qlik'

class dialogSimple extends PageFragment {
  addBtn: PageFragment;
  closeBtn: PageFragment;
  comboxPopupWithInput: comboxHasPopup;
  comboxPopupWithList: comboxHasPopup;



  constructor(selectors: ComboxSelectors) {
    super("[role='dialog']");
   // this.comboxPopupWithInput = new comboxHasPopup(".ant-select-combobox");
    if (selectors.comboxPopupWithInputSelector) {
      this.comboxPopupWithInput = new comboxHasPopup(selectors.comboxPopupWithInputSelector);
    }
    if (selectors.comboxPopupWithListselector) {
      this.comboxPopupWithList = new comboxHasPopup(selectors.comboxPopupWithListselector);
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

  get $selectionPopup() {
    return $("ul[role='listbox']");
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

  async removePopup() {
    await this.$root.click({x: 1, y: 1});
    await this.$selectionPopup.waitForDisplayed({reverse: true});
  } 

  async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) === true &&
        (await this.comboxPopupWithInput.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The profile menu did not display'}
    );
  }
}

export default dialogSimple;
