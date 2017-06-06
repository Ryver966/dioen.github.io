vidCtrl.$inject = ['$scope', '$timeout', 'Factory', 'YTService', 'GoogleFileService'];

export default function vidCtrl($scope, $timeout, Factory, YTService, GoogleFileService) {
    $scope.setActualVid = (index) => {
        let actualItem = $scope.data[index];

        Factory.setActualVid(actualItem);
        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                Factory.setRelatedToActualVid(data1);
            });

        Factory.clearAlreadyPlayedVideos();
    }

    $scope.$watch(
        function () {
            return Factory.data.data;
        },
        function (newVal, oldVal) {
            if (newVal !== undefined) {
                $scope.data = newVal;
            }
        }, true);

    $scope.init = () => {
        YTService.getDataByString("")
            .then((data) => {
                $timeout($scope.data = data);
            });
    }

    // $scope.test = () => {
    //     // let testFileContent = "{\"asd\": \"cos\", \"asd1\": \"cos1\", \"asd2\": \"cos2\"}";
    //     let gapi = Factory.gapiUser;
    //     let fileId = Factory.data.userSettingsFileId;
    //     console.log(fileId + " file id");
    //     GoogleFileService.updateFileOnDrive(gapi, testFileContent, fileId);

    //     setTimeout(() => {
    //         GoogleFileService.loadFileFromDrive(gapi, fileId);
    //     }, 3000);
    // }


    $scope.addToUserList = (itemIndex) => {
        let gapi = Factory.gapiUser;
        let fileId = Factory.data.userSettingsFileId;
        let userSettingsFileContent = Factory.data.userSettingsFileContent;
        
        let videoObject = {
            id: $scope.data[itemIndex].id,
            img: $scope.data[itemIndex].img,
            title: $scope.data[itemIndex].title
        }

        console.log(userSettingsFileContent);
        console.log('userSettingsFileContent');

        userSettingsFileContent.settings.items.push(videoObject);

        Factory.addVideoToUserList(JSON.stringify(videoObject));
        Factory.setUserSettingsFileContent(userSettingsFileContent);

        GoogleFileService.updateFileOnDrive(gapi, JSON.stringify(Factory.data.userSettingsFileContent), fileId);

        setTimeout(function () {
            GoogleFileService.loadFileFromDrive(gapi, fileId);
        }, 2000);
    }
}