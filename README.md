# Tamagotchi

This is a simple tamagotchi project, implemented using React library.

While playing be aware that the tamagotchi can/will die from 4 different causes:

- Age: if maximum age(3 minutes, configurable) is reached the tamagotchi will die.
- Hungry: if the `hungry` level reach its maximum,  the tamagotchi will die.
- Tired: if the `tired` level reach its maximum,  the tamagotchi will die.
- Dirtiness: if 3 poos are present at the same time, the tamagotchi will die.

Couple notes
- While Tamagotchi is sleeping its tired level will be reducing.
- When you feed the Tamagotchi you will wake it up.
- when you clean it, you also wake it up.

⚠️  I should take no credit for the html/css that composes the background of the tamagotchi application. It was copied from [this codepen](https://codepen.io/mr-tamagotchi/pen/bBYEME).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Runs [Prettier](https://prettier.io/), Prettier is an opinionated code formatter.
