# electron-companion-app

Companion app for Muscle Contraction monitoring system.

Note that the React interface must be ran seperately for the time being. Also, an env-variables.json file is required to use authentication.

To run, first start the react-ui: (Auto-start fix soon)
```bash
cd react-ui
yarn install
yarn run start
```
You may close the automatically opened window. (Fix soon)

Then open a new terminal in the electron-companion-app directory and run:
```bash
npm install
npm start
```

Done!
