loginController.$inject = ['OAuthService', 'YTService', 'Factory', 'GoogleFileService'];

export default function loginController(OAuthService, YTService, Factory, GoogleFileService) {
    let gapi = OAuthService.login();
    let vm = this;

    let onFailure = (error) => {
        Factory.setIsUserLoggedIn(false);
    }


    let testFileContent = '{"settings": {"items":[]}}';

    let onSuccess = (googleUser) => {
        Factory.setGoogleGapiUser(gapi);
        console.log("LOGIN");

        GoogleFileService.ifFileExist(gapi)
            .then((response) => {
                if (!response.response) {
                    GoogleFileService.saveFileOnDrive(gapi, testFileContent)
                        .then((response) => {
                            Factory.setUserSettingsFileId(response.id);
                            GoogleFileService.loadFileFromDrive(gapi, response.id)
                                .then((response) => {
                                    console.log(response);
                                    console.log('response from saved file');

                                    Factory.setUserSettingsFileContent(response);
                                });
                        });
                } else {
                    Factory.setUserSettingsFileId(response.id);
                    // Factory.setUserSettingsFileContent(GoogleFileService.loadFileFromDrive(gapi, response.id));
                    GoogleFileService.loadFileFromDrive(gapi, response.id)
                        .then((response) => {
                            Factory.setUserSettingsFileContent(response);
                        });
                    Factory.setGoogleGapiUser(gapi);
                    Factory.setIsUserLoggedIn(true);
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