const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
    it("report will added this a steps/context in report", async () => {
        addLabel("Log Example 1 as step 1");
        console.log("Log Example 1");
        addLabel("Log Example 2 as step 2");
        console.log("Log Example 2")
  })
})
