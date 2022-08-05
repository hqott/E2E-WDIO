import PageFragment from '../pageFragment';

class dialogSimple extends PageFragment {
  comboboxInput: PageFragment;
  addBtn: PageFragment;
  closeBtn: PageFragment;


  constructor() {
    super("[role='dialog']");
    this.comboboxInput = new PageFragment(() => this.$comboboxInput);
    this.addBtn = new PageFragment(() => this.$addBtn);
    this.closeBtn = new PageFragment(() => this.$closeBtn);
  }

  private get $comboboxInput() {
    return this.$root.$("[role ='combobox']");
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

  async waitForDisplayed() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) ===true &&
        (await this.$comboboxInput.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The profile menu did not display'}
    );
  }
}

export default dialogSimple;
