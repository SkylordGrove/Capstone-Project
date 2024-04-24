# electron-companion-app

Companion app for Muscle Contraction monitoring system.

An env-variables.json file is required to use this application.

To run, first upload code to the Arduino board:

Open Arduino IDE
Upload team10.ino to editor
Select board you are connecting to
Click upload & verify

Next, start the arduino backend:

```bash
cd backend  # electron-companion-app/backend
npm install
node PortManager.js
```

Next, build the react-ui in a separate terminal:

```bash
cd react-ui  # electron-companion-app/react-ui
yarn install
yarn build
```

Then, to run the app from that terminal:

```bash
cd ..  # to return to electron-companion-app directory
npm install
npm start
```

Done!
