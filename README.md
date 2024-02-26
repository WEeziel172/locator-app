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
-

### MISC

#### React + TypeScript + Vite

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