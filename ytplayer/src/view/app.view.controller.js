vidCtrl.$inject = ['$scope', '$timeout', 'Factory', 'YTService', 'GoogleFileService'];

export default function vidCtrl($scope, $timeout, Factory, YTService, GoogleFileService) {
    let vm = this;

    vm.setActualVid = (index) => {
        let actualItem = vm.data[index];

        Factory.setActualVid(actualItem);
        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                let isSearching = Factory.getIsSearching();
                Factory.setRelatedToActualVid(data1);

                if (isSearching) {
                    Factory.setActualPlayingListType("searchlist");
                }
            });

        Factory.clearAlreadyPlayedVideos();
    }

    $scope.$watch(
        function() {
            return Factory.data.data;
        },
        function(newVal, oldVal) {
            if (newVal != undefined) {
                vm.data = newVal;
            }
        }, true);

    vm.init = () => {
        YTService.getDataByString("")
            .then((data) => {
                $timeout(vm.data = data);
            });
    }

    vm.addToUserList = (itemIndex) => {
        let gapi = Factory.gapiUser;
        let fileId = Factory.data.userSettingsFileId;
        let userSettingsFileContent = Factory.data.userSettingsFileContent;

        let videoObject = {
            id: vm.data[itemIndex].id,
            img: vm.data[itemIndex].img,
            title: vm.data[itemIndex].title,
            src: vm.data[itemIndex].src //sprawddzic czy na pewno potrzebny
        }

        userSettingsFileContent.settings.items.push(videoObject);

        Factory.addVideoToUserList(JSON.stringify(videoObject));
        Factory.setUserSettingsFileContent(userSettingsFileContent);

        GoogleFileService.updateFileOnDrive(gapi, JSON.stringify(Factory.data.userSettingsFileContent), fileId);

        setTimeout(function() {
            GoogleFileService.loadFileFromDrive(gapi, fileId);
        }, 2000);
    }

    $scope.$watch(() => {
        return Factory.data.isUserLoggedIn;
    }, (newVal, oldVal) => {
        console.log("NOWA WAROSC!");
        vm.isUserLoggedIn = newVal;
    });

    return vm;
}