# Locator App

This app is based off an assignment from Grundium

## Motivation

This assignment was very delightful to do. At its heart, it's quite simple. You are given a few pointers, which must be
met, and for the rest, it is up you, your skills and motivation.
I went with a "sci-fi" themed styling, coloured frosted glass which gives an impression of technology, far, far away.

## Architectural decisions

Used technologies are based off my familiarity with them and my estimation on what is good and appropriate to be used,
taking in mind best practices.
I structured the application in a way that it makes sense, keeping separation of concerns in mind.
It may look complex, when comparing to the size of the project, but I do believe following best practices, making good
decisions on the structure of the project will always pay off.

- Path aliases for directories, cleaner code and easier imports
- Constants, Config and i18next translation files to ensure no magic strings / numbers
- Separate services for fetching data from endpoints
- Lazy imports for code splitting
- Good use of useCallbacks and useMemo for performance optimization
- Zustand for state management. Better and more performance alternative for Context

### Project structure

#### Assets

All the assets. (images, icons etc)

Alias
``
@assets
``

#### Components

All components. Right now, even scoped components are in the components folder.
Could be refactored later on to be common components and scoped components. (Scoped components being components that are
only specific to certain page for example, not reusable)
Each component has its own respective folder. Folder should consist of component, accompanying test and possible style
file.

Alias
``
@components
``

#### Hooks

All hooks.
Each hook has its own directory. Directory will have the hook itself, and accompanying test file.

Alias
``
@hooks
``

#### i18n (Translation)

All files regarding i18n (translation framework).

``
To add a new translations, add a new folder for the respective language, a json file name "translation" inside of it.
Add the new language as a translation entry to config.ts inside the i18n folder.
``

#### Pages

All pages of the application.
Pages are top level components, and should be used mainly by the router.

Alias
``
@pages
``

#### Servies

All services of the application.
Serviecs are meant to be a way to interface with different APIS.
Each service has its own directory, which has the service itself and possible accompanying test.

Alias
``
@services
``

#### Stores

All Zustand stores of the application.
Zustand stores are a better alternative comparing to react context for state management throughout the application.
Each store should clearly have its own purpose, name should indicate the purpose of the store.

Alias
``
@stores
``

#### Tests

Configuration related to tests.

#### Types

All types that are exposed in the application.
Any types created should be added to the types folder, instead leaving them inside cluttered throughout the application.

Alias
``
@customTypes
``

#### Constants

To mitigate magic strings and numbers, constants file should used for constants that might be used throughout the
application.
For example, routes are declared here.
This way, we will have a single source of truth, which easier to manage in the long run.

Alias
``
@constants
``

#### Config

Used for configuration.
For example, component configuration, environment configuration etc.

Alias
``
@config
``

## Stack

- Vite + React
- I18next for translation
- React-leaflet / Leaflet.js for Map
- TailwindCSS for styling
- Vitest + testing-library for testing
- Axios http client
- Zustand for advanced state management

## Future improvement

### Tests

More tests. I tested some crucial components and the hooks, which provide the necessity for the app to work in the first
place.
More should be done, to have better overall coverage.
However, testing becomes more complex as we need to mock stores, hooks etc.
I believe for the time being, it is out of the scope of this assignment,

### Advanced features

It would be quite simple to add additional features, to enrich the user experience and give more value for the whole
application.

- Entity based markers on map
- Soundbites of all entities
- Simple trivia of each entity, "Where is he born? "What color lightsaber does he use?"
- Exchange 2D map for a 3D globe map

## Developing

Install all dependencies

```
yarn
```

Run development server

```
yarn dev
```

Build for production

```
yarn build
```

Preview production build locally

```
yarn preview
```

Run tests

```
yarn test
```

## MISC

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
  or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Targeting Scope by Jamison Wieser
from <a href="https://thenounproject.com/browse/icons/term/targeting-scope/" target="_blank" title="Targeting Scope Icons">
Noun Project</a> (CC BY 3.0)

Light Saber by iconoci
from <a href="https://thenounproject.com/browse/icons/term/light-saber/" target="_blank" title="Light Saber Icons">Noun
Project</a> (CC BY 3.0)