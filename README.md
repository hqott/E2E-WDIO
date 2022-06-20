## Executing the tests

Download the repo, install npm packages and run tests
```console
$ npm install
$ npm run wdio (run all the tests)
$ npm run wdio -- --spec (run spec test)
```

Set the environment variables
```console
$ export BASEURL=<your-tenant-url>
```

#### Run test(s)
```console
$ npm run wdio (run all the tests)
$ npm run wdio -- --spec npm run wdio -- --spec e2e/specs/testQlik.spec.ts (run spec test)
```
#### Check report
```console
light weight report location: /results/htmlreports/e2e_Test_Report.html
```