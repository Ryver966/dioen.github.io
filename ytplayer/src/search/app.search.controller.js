searchController.$inject = ['$scope', 'YTService', 'Factory'];

export default function searchController($scope, YTService, Factory) {
    $scope.getYTData = () => {
        console.log($scope.query);
        YTService.getDataByString($scope.query)
            .then((data) => {
                Factory.setFactoryData(data);
                Factory.clearAlreadyPlayedVideos();
            });
    }
    document.getElementById('search-input').focus();
};