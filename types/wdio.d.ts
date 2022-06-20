/**
 * @fileoverview
 * This module declares the type signatures for our page objects and custom commands
 */

declare namespace WebdriverIO {
  interface Element {
    clickWhenClickable: (options?: WebdriverIO.WaitForOptions) => void;
    hasCSSClass: (str: string) => boolean;
  }
}
