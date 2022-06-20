class Page {
    readonly url: string;

    constructor(url: string) {
        if (!url) {
            throw new TypeError(`The url is required to visit "${this.constructor.name}"`);
        }
        this.url = url;
    }

    static async visit<T extends Page>(this: new (...constructorArgs: any[]) => T, ...args: any[]): T {
        const page = new this(...args) as T;
        page.open();
        return page;
    }

    private async open() {
        await browser.url(this.url);
        await this.waitForPageReady();
    }

    async waitForPageReady() { }
}

export default Page;