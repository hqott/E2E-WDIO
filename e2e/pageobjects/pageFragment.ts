import {Browser, WaitForOptions} from 'webdriverio';

export type Selector = string | (() => ReturnType<Browser<'async'>['$']>);

export default class PageFragment {
  private readonly selector: Selector;

  constructor(selector) {
    this.selector = selector;
  }

  protected get $root() {
    return typeof this.selector === 'function' ? this.selector() : $(this.selector);
  }

  isClickable() {
    return this.$root.isClickable();
  }

  async isDisplayed() {
    const elem = await this.$root;
    return elem.isDisplayed();
  }

  async isEnabled() {
    const elem = await this.$root;
    return elem.isEnabled();
  }

  async waitForClickable(options?: WaitForOptions) {
    const elem = await this.$root;
    return elem.waitForClickable(options);
  }

  async waitForDisplayed(options?: WaitForOptions) {
    const elem = await this.$root;
    return elem.waitForDisplayed(options);
  }

  async waitForExist(options?: WaitForOptions) {
    const elem = await this.$root;
    return elem.waitForExist(options);
  }

  async setValue(value:string) {
    const elem = await this.$root;
    return elem.setValue(value);
  }

  async clickWhenClickable() {
    const elem = this.$root;
    await elem.waitForClickable();
    await elem.click();

  }
}
