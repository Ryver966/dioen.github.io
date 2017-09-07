listController.$inject = ['$scope', 'GoogleFileService', 'DataService'];

export default function listController($scope, GoogleFileService, DataService) {
    let vm = this;

    vm.showList = () => {
        GoogleFileService.loadFileFromDrive(DataService.gapiUser, DataService.data.userSettingsFileId)
            .then((response) => {
                DataService.setFactoryData(response.settings.items);
                //DataService.setActualPlayingListType("userlist");
                DataService.setIsSearching(false);
            });
    }

    vm.saveTags = () => {
        let tagsArray = vm.tags;
    }

    $scope.$watch(() => {
        return DataService.data.isUserLoggedIn;
    }, (newVal, oldVal) => {
        vm.isUserLoggedIn = newVal;
    });

    return vm;
}