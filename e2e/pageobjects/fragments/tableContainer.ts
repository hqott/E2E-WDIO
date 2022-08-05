import PageFragment from '../pageFragment';

class TableContainer extends PageFragment {
  tableHeader: any;

  constructor(selector) {
    super(selector);
    this.tableHeader = this.$tableHeader;
  }

  private get $tableHeader() {
    return this.$root.$("table thead");
  }

  async waitForDisplayed() {
    return browser.waitUntil(
      async () =>
        (await this.$root.isDisplayed()) === true &&
        (await this.tableHeader.isDisplayed()) === true,
      { timeout: 30000, timeoutMsg: 'The table did not display' }
    );
  }
}

export default TableContainer;
