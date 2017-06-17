let listController = (GoogleFileService, Factory) => {
    let vm = this;
    vm.showList = () => {
        GoogleFileService.loadFileFromDrive(Factory.gapiUser, Factory.data.userSettingsFileId)
            .then((response) => {
                // $scope.data = response.settings.items;
                // $scope.$apply();

                Factory.setFactoryData(response.settings.items);
            });
    }

    vm.saveTags = () => {
        let tagsArray = vm.tags;
    }

    return vm;
}

listController.$inject = ['GoogleFileService', 'Factory']

export default listController