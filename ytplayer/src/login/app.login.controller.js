loginController.$inject = ['$scope', 'OAuthService', 'YTService', 'Factory', 'GoogleFileService'];

export default function loginController($scope, OAuthService, YTService, Factory, GoogleFileService) {
    let gapi = OAuthService.login();

    let onFailure = (error) => {
        console.log(error);
    }

    console.log("LOGIN");

    let testFileContent = "{\"asd\": \"cos\", \"asd1\": \"cos1\"}";

    let onSuccess = (googleUser) => {
        GoogleFileService.ifFileExist(gapi)
            .then((response) => {
                if (!response.response) {
                    GoogleFileService.saveFileOnDrive(gapi, testFileContent);
                    console.log("created file");
                    // onSuccess(googleUser); have to make it to be after promise, coz it's invoking several times not only ones as needed
                } else {
                    console.log("file exists");
                    console.log(response.id);
                    Factory.setUserSettingsFileId(response.id);
                    Factory.setUserSettingsFileContent(GoogleFileService.loadFileFromDrive(gapi));
                    Factory.setGoogleGapiUser(gapi);
                }
            });
    }

    $scope.renderButton = () => {
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

    $scope.renderButton();
}