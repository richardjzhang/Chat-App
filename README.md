# Chat App
![](./result.gif)

This application allows users to send real time messages via the browser. Inspired by the tutorial made by [flaviocopes](https://github.com/flaviocopes/chat-app-react-redux-saga-websockets).

## Installation
```
yarn install
cd client
yarn install
```

## Running the project locally
### Environment Variables
See the `.env.example` file and configure those variables. You can take a look in `server.js` for the default values I've used if they are undefined.

### Run the Client
```
cd client
yarn start
```

### Run the Server
`node server.js`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the project on a build
### Make a build for the client side
`yarn build`

### Run the Server
`node server.js`

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Available Scripts
In the project directory, you can run:
### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
