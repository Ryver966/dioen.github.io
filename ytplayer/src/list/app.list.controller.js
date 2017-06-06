let listController = ($scope, GoogleFileService, Factory) => {
    $scope.showList = () => {
        GoogleFileService.loadFileFromDrive(Factory.gapiUser, Factory.data.userSettingsFileId)
            .then((response) => {
                // $scope.data = response.settings.items;
                // $scope.$apply();

                Factory.setFactoryData(response.settings.items);
            });
    }

    $scope.saveTags = () => {
        let tagsArray = $scope.tags;
    }
}

listController.$inject = ['$scope', 'GoogleFileService', 'Factory']

export default listController