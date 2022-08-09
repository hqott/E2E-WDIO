import Page from '../page';
import PageFragment from '../pageFragment';
import Table from '../fragments/tableContainer';
import dialogSimple from '../fragments/dialogSimple'

class SpaceMember extends Page {
  addMembers: PageFragment;
  table: Table;

  constructor(id:string) {
    super(`/explore/spaces/${id}/members`);
    this.addMembers = new PageFragment(() => this.$addMembers);
    this.table = new Table(()=>$("table"));
  }

  private get $addMembers() {
    return $("[data-testid='space-members-add-member-button']");
  }

  private async clickAddMembers() {
    return this.addMembers.clickWhenClickable();
  }

  getOption(text: string) {
    return $(`li*=${text}`);
  }

  async waitForPageReady() {
    await this.table.waitForLoaded();
    browser.waitUntil(
      async() =>
        (await this.addMembers.isDisplayed()) === true, 
      {timeout: 30000, timeoutMsg: 'The table did not display'}
    );
  }

  async addMember(user:string, roles:string[]) {
    await this.clickAddMembers();
    let comboxPopupSelectors = {
      comboxPopupWithInputSelector: "[role='combobox']",
      comboxPopupWithListselector: "[data-testid='member-role-new']"
    }
    let dialog = new dialogSimple(comboxPopupSelectors);
    await dialog.waitForLoaded();
    await dialog.comboxPopupWithInput.setInputValue(user);
    await dialog.comboxPopupWithList.selectMultipleSubMenu([await this.getOption(user)]);
    await dialog.comboxPopupWithInput.selectedButtonInsideInput.waitForLoaded();
    let newRoleList = roles.map((text) => $(`[data-testid="${text}"]`))
    await dialog.comboxPopupWithList.clickToSelectSubMenu(newRoleList, true);
    await browser.pause(500) // Just for demo.
    await dialog.removePopup();
    await browser.pause(1000) // Just for demo.
    await dialog.close();
  }

}

export default SpaceMember;
