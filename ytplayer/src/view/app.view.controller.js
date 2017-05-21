vidCtrl.$inject = ['$scope', '$timeout', 'Factory', 'YTService'];

export default function vidCtrl($scope, $timeout, Factory, YTService) {
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
}