# Info

## Tools and Frameworks

The application was created using the [create react app](https://reactjs.org/docs/create-a-new-react-app.html) npm tool. It uses the following tools and frameworks:

- [Yarn](https://yarnpkg.com/) as build tool
- [React](https://reactjs.org/) as frontend javascript framework
- [React router](https://reactrouter.com/) for routing
- [React I18next](https://react.i18next.com/latest/typescript) for translations
- [Typescript](https://www.typescriptlang.org/) as programming language
- [Emotion](https://github.com/emotion-js) for styling and CSS
- [Fontawesome](https://fontawesome.com/) for icons
- [Jest](https://jestjs.io/) for testing

## Getting things started

Follow these steps to start the application:

- Download and install [Yarn](https://yarnpkg.com/)
- Navigate to the project root directory
- Run `yarn install`
- Select the script you want to run below

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## .env file

the .env file sets the `DISABLE_NEW_JSX_TRANSFORM=true` as a workaround of a [bug in react which interferes with emotionjs](https://github.com/emotion-js/emotion/issues/2041)

## Translations

The app is using [React I18next](https://react.i18next.com/latest/typescript) for translations. As not many translations are needed, it is only using the default namespace `translations`. Translations are found in `i18n.ts` in the root of the project.

### Using translations

There is a custom hook called `useLanguageTranslation`, which is typesafe and automatically returns the right translation based on the browser language of the user. It returns a `t` function as first return value. Call this function with the right key to get the translation. E.g.

```typescript
// in i18n.ts

const resources: LanguageResources = {
  de: {
    translation: {
      myMessageKey: "Hallo welt",
    },
  },
  en: {
    translation: {
      myMessageKey: "Hello world",
    },
  },
};

// in component.tsx
function MyComponent(): JSX.Element {
  const [t] = useLanguageTranslation();
  return <div>{t("myMessageKey")}</div>;
}
```

### Note for the reviewer

You will see more often that I placed many interfaces/classes in a single file. This is not ideal and I am aware of it, but it is a simple way to keep private interfaces eclosed. Ususally they should be in separate files in different modules.

## createCloudPage HOC

This higher order component makes it easy to apply different layouts to the already adapted, sorted and ready-to-use `clouds`, which have all the needed values calculated and set.

It encapsulates the sorting, adaptation, filtering and even the suspension of the server data to make adding different layouts easy and straigtforward.

For example a page with a tiles layout instead of a list layout could be implemented using the hook:

```typescript
const TilesLayoutPageSuspending = createCloudPage<{}>(
  (props) => {
    return (
      <div>
        {props.clouds?.map((cloud) => {
          return (
            <TilesLayout
              key={cloud.cloudName + cloud.cloudDescription}
              {...cloud}
            />
          );
        })}
      </div>
    );
  },
  { name: "TilesLayoutPageSuspending" }
);
```
