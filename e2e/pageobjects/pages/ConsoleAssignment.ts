import Page from '../page';
import PageFragment from '../pageFragment';
import Table from '../fragments/tableContainer';
import dialogSimple from '../fragments/dialogSimple'

class ConsoleAssignment extends Page {
  addEntitlement: PageFragment;
  assignedUsersTab: PageFragment;
  table: Table;

  constructor() {
    super('/console/license/assignment/');
    this.addEntitlement = new PageFragment(() => this.$addEntitelement);
    this.assignedUsersTab = new PageFragment(() => this.$assignedUsersTab);
    this.table = new Table(()=>$("[data-testid='table-container']"));
  }

  private get $addEntitelement() {
    return $("[data-testid='license-assignments_add-assignment-button']");
  }

  private get $assignedUsersTab() {
    return $("[data-testid='license-management__tab-assignment']")
  }

  get $analyzerSubmenu() {
    return $("li[data-testid='license-assignments_add-assignment-select-analyzer']");
  }

  async waitForPageReady() {
    await this.table.waitForLoaded();
    browser.waitUntil(
      async() =>
        (await this.assignedUsersTab.isEnabled()) === true, 
      {timeout: 30000, timeoutMsg: 'The table did not display'}
    );
  }

  private async clickAddEntitlement() {
    return this.addEntitlement.clickWhenClickable();
  }

  async addAddEntitlement(user, entitlement) {
    await this.clickAddEntitlement();
    let comboxPopupSelectors = {
      comboxPopupWithInputSelector: ".ant-select-combobox",
      comboxPopupWithListselector: "[data-testid='license-assignments_add-assignment-select']"
    }
    let dialog = new dialogSimple(comboxPopupSelectors);
    await dialog.waitForLoaded();
    await dialog.comboxPopupWithInput.setInputValue(user);
    await dialog.comboxPopupWithList.clickToSelectSubMenu(entitlement);
    await browser.pause(1000) // Just for demo.
    await dialog.close();
  }

}

export default ConsoleAssignment;
