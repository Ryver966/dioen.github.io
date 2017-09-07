loginController.$inject = ['OAuthService', 'YTService', 'DataService', 'GoogleFileService'];

export default function loginController(OAuthService, YTService, DataService, GoogleFileService) {
    let gapi = OAuthService.login();
    let vm = this;

    let onFailure = (error) => {
        DataService.setIsUserLoggedIn(false);
    }


    let testFileContent = '{"settings": {"items":[]}}';

    let onSuccess = (googleUser) => {
        DataService.setGoogleGapiUser(gapi);
        console.log("LOGIN");

        GoogleFileService.ifFileExist(gapi)
            .then((response) => {
                if (!response.response) {
                    GoogleFileService.saveFileOnDrive(gapi, testFileContent)
                        .then((response) => {
                            DataService.setUserSettingsFileId(response.id);
                            GoogleFileService.loadFileFromDrive(gapi, response.id)
                                .then((response) => {
                                    console.log(response);
                                    console.log('response from saved file');

                                    DataService.setUserSettingsFileContent(response);
                                });
                        });
                } else {
                    DataService.setUserSettingsFileId(response.id);
                    // DataService.setUserSettingsFileContent(GoogleFileService.loadFileFromDrive(gapi, response.id));
                    GoogleFileService.loadFileFromDrive(gapi, response.id)
                        .then((response) => {
                            DataService.setUserSettingsFileContent(response);
                        });
                    DataService.setGoogleGapiUser(gapi);
                    DataService.setIsUserLoggedIn(true);
                }
            });
    }

    vm.renderButton = () => {
        gapi.signin2.render('g-signin2', {
            'scope': 'profile',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }

    vm.renderButton();

    return vm;
}