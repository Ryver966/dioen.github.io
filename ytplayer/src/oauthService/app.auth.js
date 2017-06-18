export default class OAuthService {
    constructor() {

    }

    login() {
        let auth2;
        let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
        gapi.load('auth2', function() {
            /**
             * Retrieve the singleton for the GoogleAuth library and set up the
             * client.
             */
            auth2 = gapi.auth2.init({
                discoveryDocs: DISCOVERY_DOCS,
                // client_id: '700879300276-4jsvtpkq9r9ms7pkcj5imb5e87t9c6ep.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                /** Default value **/
                scope: 'https://www.googleapis.com/auth/drive.file'
            });
        });

        return gapi;
    }

    logout() {
        // logout body goes here...
    }
}