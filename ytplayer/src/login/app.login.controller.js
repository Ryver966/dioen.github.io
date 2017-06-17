loginController.$inject = ['OAuthService', 'YTService', 'Factory', 'GoogleFileService'];

export default function loginController(OAuthService, YTService, Factory, GoogleFileService) {
    let gapi = OAuthService.login();
    let vm = this;

    let onFailure = (error) => {
        console.log(error);
    }

    console.log("LOGIN");

    let testFileContent = '{"settings": {"items":[]}}';

    let onSuccess = (googleUser) => {
        Factory.setGoogleGapiUser(gapi);

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
                    console.log("created file");

                    // onSuccess(googleUser); have to make it to be after promise, coz it's invoking several times not only ones as needed
                } else {
                    console.log("file exists");
                    console.log(response.id);
                    Factory.setUserSettingsFileId(response.id);
                    // Factory.setUserSettingsFileContent(GoogleFileService.loadFileFromDrive(gapi, response.id));
                    GoogleFileService.loadFileFromDrive(gapi, response.id)
                        .then((response) => {
                            console.log('loaded file');
                            console.log(response);
                            Factory.setUserSettingsFileContent(response);
                        });
                    console.log('user settings file loaded');
                    Factory.setGoogleGapiUser(gapi);
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