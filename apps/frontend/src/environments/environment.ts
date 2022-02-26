// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  origin: 'https://backend.verseghy-gimnazium.net',
  gqlURL: 'https://backend2.verseghy-gimnazium.net/graphql',
  firebase: {
    apiKey: 'AIzaSyCF0TKD1kp1YgihjB4SMAHkfIPp8euaNLQ',
    authDomain: 'vfg-honlap.firebaseapp.com',
    databaseURL: 'https://vfg-honlap.firebaseio.com',
    projectId: 'vfg-honlap',
    storageBucket: 'vfg-honlap.appspot.com',
    messagingSenderId: '616435986324',
    appId: '1:616435986324:web:b449b36b597fdb3d',
    measurementId: 'G-HMG0GDHDR6',
  },
  version: 'DEVELOPMENT',
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
