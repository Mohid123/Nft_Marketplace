// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  version: '0.0.0',
  production: false,
  apiUrl: 'https://nft-nodechaintestnet.dividisapp.com',
  // apiUrl: 'https://nft-dev.dividisapp.com',
  limit: 12,
  testNet: false,
  demoClub: 'demo',
  demoClubEmail: 'demo@gmail.com',
  demoClubPassword: 'demo@123',
  demoClub1: 'solis-solution',
  demoClubEmail1: 'admin@gmail.com',
  demoClubPassword1: 'qwertyuiop',

  firebase: {
    apiKey: "AIzaSyCHyGMm-OaTigJU1l3ynVH8L0enkl34xPI",
  authDomain: "nft-auth-app.firebaseapp.com",
  projectId: "nft-auth-app",
  storageBucket: "nft-auth-app.appspot.com",
  messagingSenderId: "242147439537",
  appId: "1:242147439537:web:9e9a6a2b494a05ce7ec390",
  measurementId: "G-WD23R4NTBM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
