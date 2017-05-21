loginController.$inject = ['$scope', 'OAuthService', 'YTService', 'Factory'];

export default function loginController($scope, OAuthService, YTService, Factory) {
    let gapi = OAuthService.login();

    let onFailure = (error) => {
        console.log(error);
    }

    console.log("LOGIN");

    let testFileContent = "{\"asd\": \"cos\", \"asd1\": \"cos1\"}";

    let onSuccess = (googleUser) => {
        YTService.ifFileExist(gapi)
            .then((response) => {
                if (!response) {
                    YTService.saveFileOnDrive(gapi, testFileContent);
                    console.log("created file");
                } else {
                    console.log("file exists");
                    Factory.setUserSettingsFileContent(YTService.loadFileFromDrive(gapi));
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