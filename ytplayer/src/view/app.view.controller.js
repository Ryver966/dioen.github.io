vidCtrl.$inject = ['$scope', '$timeout', 'DataService', 'YTService', 'GoogleFileService'];

export default function vidCtrl($scope, $timeout, DataService, YTService, GoogleFileService) {
    let vm = this;

    vm.setActualVid = (index) => {
        let actualItem = vm.data[index];

        DataService.setActualVid(actualItem);
        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                let isSearching = DataService.getIsSearching();
                DataService.setRelatedToActualVid(data1);

                console.log(actualItem)
                if (actualItem.user == 'yes') {
                    DataService.setActualPlayingListType('userlist');
                } else {
                    DataService.setActualPlayingListType('searchlist');
                }
            });

            DataService.clearAlreadyPlayedVideos();
    }

    $scope.$watch(
        function() {
            return DataService.data.data;
        },
        function(newVal, oldVal) {
            if (newVal != undefined) {
                vm.data = newVal;
            }
        }, true);

    vm.init = () => {
        YTService.getDataByString("")
            .then((data) => {
                DataService.setActualPlayingListType("searchlist");
                DataService.setIsSearching(true);
                $timeout(vm.data = data);
            });
    }

    vm.addToUserList = (itemIndex) => {
        let gapi = DataService.gapiUser;
        let fileId = DataService.data.userSettingsFileId;
        let userSettingsFileContent = DataService.data.userSettingsFileContent;

        let videoObject = {
            id: vm.data[itemIndex].id,
            img: vm.data[itemIndex].img,
            title: vm.data[itemIndex].title,
            src: vm.data[itemIndex].src, //sprawddzic czy na pewno potrzebny
            user: 'yes'
        }

        console.log(userSettingsFileContent)
        userSettingsFileContent.settings.items.push(videoObject);

        DataService.addVideoToUserList(JSON.stringify(videoObject));
        DataService.setUserSettingsFileContent(userSettingsFileContent);

        GoogleFileService.updateFileOnDrive(gapi, JSON.stringify(DataService.data.userSettingsFileContent), fileId);

        setTimeout(function() {
            GoogleFileService.loadFileFromDrive(gapi, fileId);
        }, 2000);
    }

    vm.removeFromUserList = (index) => {
        let gapi = DataService.gapiUser;
        let fileId = DataService.data.userSettingsFileId;
        let userSettingsFileContent = DataService.data.userSettingsFileContent;
        let videosArray = userSettingsFileContent.settings.itmes;

        DataService.setUserSettingsFileContent(videosArray.Splice(index, 1));        
        GoogleFileService.updateFileOnDrive(gapi, JSON.stringify(DataService.data.userSettingsFileContent), fileId);
    }

    $scope.$watch(() => {
        return DataService.data.isUserLoggedIn;
    }, (newVal, oldVal) => {
        console.log("NOWA WAROSC!");
        vm.isUserLoggedIn = newVal;
    });

    return vm;
}