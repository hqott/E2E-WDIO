const { splitOnSpaces } = require('../dom');

/**
 * Waits for an element to become clickable then clicks on it.
 *
 * @this WebdriverIO.Element
 * @param {import('webdriverio').WaitForOptions} [options]
 *
 * @returns {Promise<void>}
 */
async function clickWhenClickable(options) {
  await this.waitForClickable(options);
  return this.click();
}


/**
 * Returns true when the element class attribute contains the provided value.
 * Returns false otherwise.
 *
 * @this WebdriverIO.Element
 * @param {string} str
 *
 * @returns {Promise<boolean>}
 */
async function hasCSSClass(str) {
  const attr = await this.getAttribute('class');
  return splitOnSpaces(attr).includes(str);
}

module.exports = {
  clickWhenClickable,
  hasCSSClass,
};
