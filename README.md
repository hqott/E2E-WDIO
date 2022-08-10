## Executing the tests

Download the repo, install npm packages and run tests
```console
$ git clone git@github.com:hqott/E2E-WDIO.git
$ npm clean-install (Not suggest npm install)
```

Set the environment variables
```console
$ export BASEURL=<your-tenant-url>
```

#### Run test(s)
```console
e2e $ npx wdio run ./wdio.conf.ts --spec ./specs/pageFragment.spec.ts
$ npx run wdio (run all the tests)
$ npm run wdio -- --spec <test> (run spec test)
  i.e: npm run wdio -- --spec ./specs/testQlik.spec.ts (run spec test)
```
#### Check report
```console
Light reporter is configurated into this project. The test report is auto generated and cleared for each test(s) run.
Report location: /results/htmlreports/e2e_Test_Report.html
```

## Improvements

Some common functions in page/fragment level, like login/logout, should in helper function area.