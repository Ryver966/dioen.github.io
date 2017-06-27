let listController = ($scope, GoogleFileService, Factory) => {
    let vm = this;

    vm.showList = () => {
        GoogleFileService.loadFileFromDrive(Factory.gapiUser, Factory.data.userSettingsFileId)
            .then((response) => {
                Factory.setFactoryData(response.settings.items);
                Factory.setActualPlayingListType("userlist");
                Factory.setIsSearching(false);
            });
    }

    vm.saveTags = () => {
        let tagsArray = vm.tags;
    }

    $scope.$watch(() => {
        return Factory.data.isUserLoggedIn;
    }, (newVal, oldVal) => {
        vm.isUserLoggedIn = newVal;
    });

    return vm;
}

listController.$inject = ['$scope', 'GoogleFileService', 'Factory'];

export default listController;