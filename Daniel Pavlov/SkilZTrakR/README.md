# SkilZTrakR-fe [![Quality Gate Status](https://sonar.otresi.me/api/project_badges/measure?project=skilztrakr-fe&metric=alert_status&token=52ef0560ef01ad76cd09eaf3d60979859714ecb1)](https://sonar.otresi.me/dashboard?id=skilztrakr-fe)

Symphony's internal app for tracking employee's skills (FE)

---

### Setup

- [React](https://reactjs.org/) Ecosystem
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Redux](https://redux.js.org/), [Redux-Toolkit](https://redux-toolkit.js.org/)
- [Typescipt](https://www.typescriptlang.org/)
- [Immer](https://immerjs.github.io/immer/docs/introduction)
- [Lodash](https://lodash.com/)
- [Yarn](https://yarnpkg.com/) Package Manager
- [Airbnb linting rules](https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier#readme)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky) Git Hooks

### File Structure

##### 1) Main and subcomponents

---

```sh
- Component/
  + components/
    Component.tsx
    Component.test.tsx
    index.ts
    types.ts (optional)
    styles.scss (optional)
    other (optional)
```

- **index.ts** exports **only** the main component

##### 2) Same level components

---

```sh
- directory/
  + Component/
  + AnotherComponent/
    index.ts (optional)
```

- **index.ts** exports **all** of the components in this directory

### General Tips

- Functional components and hooks are used.
- **Immer** is used in the reducer actions which enables writing actions in a **mutable** manner.
- Folders **components** and **utils** have index.ts file which exports all components and utils, this makes importing multiple components at once easier.
- Install dependencies `yarn install`

### Scripts

###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `yarn start`
- `yarn build`
- `yarn test`
- `yarn test:coverage`
- `yarn format`
- `yarn lint`

### Run locally

- Install nodejs (recommended using **brew install node**)
- Install yarn (recommended global installation using **npm install --global yarn**)
- Install dependencies `yarn install`
- Run `yarn start`

### Run in Docker environment
For running the project in Docker environment follow this instructions https://teamsymphony.atlassian.net/wiki/spaces/SKLTRK/pages/4021387511/Instructions+for+project+local+run+using+Docker
