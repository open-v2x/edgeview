# edgeview

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## Run e2e at local device

### 1. Running all the Tests

```bash
yarn playwright:test
```

### 1.1 Running a single test file

```bash
npx playwright test ${test file name}
```

### 1.2 Running tests on a specific project

View document on [playwright.dev/docs/running-tests](https://playwright.dev/docs/running-tests).

```bash
npx playwright test ${test file name} --project=chromium
```

### 1.3 Debugging all the Tests

```bash
yarn playwright:test-debug
```

### 2. View HTML Test Reports

```bash
yarn playwright:show-report
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
