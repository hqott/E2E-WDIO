import Page from '../page';
import PageFragment from '../pageFragment';
import Table from '../fragments/tableContainer';

class ConsoleAssignment extends Page {
  addEntitlement: PageFragment;
  assignedUsersTab: PageFragment;
  table: Table;

  constructor() {
    super('/console/license/assignment/');
    this.addEntitlement = new PageFragment(() => this.$addEntitelement);
    this.assignedUsersTab = new PageFragment(() => this.$assignedUsersTab);
    this.table = new Table($("[data-testid='table-container']"));
  }

  private get $addEntitelement() {
    return $("[data-testid='license-assignments_add-assignment-button']");
  }

  private get $assignedUsersTab() {
    return $("[data-testid='license-management__tab-assignment']")
  }

  async waitForPageReady() {
    await this.table.waitForDisplayed();
    browser.waitUntil(
      async() =>
        (await this.assignedUsersTab.isEnabled()) === true, 
      {timeout: 30000, timeoutMsg: 'The table did not display'}
    );
  }

  private async clickAddEntitlement() {
    return this.addEntitlement.clickWhenClickable();
  }

  async addAddEntitlement() {
    await this.clickAddEntitlement();
    console.log('XXXXX')
    ////////////
  }

}

export default ConsoleAssignment;
