// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // authenticationServiceUrl: 'https://localhost:44337/api/Authentication/',
  // storeMasterServiceUrl: 'https://localhost:44337/api/Store/',
  // serviceMasterServiceUrl: 'https://localhost:44337/api/Service/',
  // adminServiceUrl: 'https://localhost:44337/api/Admin/'
  //pushTokenServiceUrl: 'https://localhost:44337/api/PushToken/',

  authenticationServiceUrl:
    'https://my3apitest.itprototypes.com/api/Authentication/',
  storeMasterServiceUrl: 'https://my3apitest.itprototypes.com/api/Store/',
  serviceMasterServiceUrl: 'https://my3apitest.itprototypes.com/api/Service/',
  adminServiceUrl: 'https://my3apitest.itprototypes.com/api/Admin/',
  pushTokenServiceUrl: 'https://my3apitest.itprototypes.com/api/PushToken/',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
