# Getting Started with Amazing

Start the app:
```sh
$ yarn install
$ yarn start
```

Run tests:
```sh
$ yarn test
```

Run build:
```sh
$ yarn build
```

### Warning!
The swapi.dev API has a CORS issue on some of the browsers or devices, for example Safari on Mac. To fix it, a proxy option was added (`https://cors-anywhere.herokuapp.com/`). By default the application doesn't use the proxy, to turn it on the `REACT_APP_USE_PROXY` property has to be set to `true` in `.env` file.
```sh
REACT_APP_USE_PROXY=true
```
