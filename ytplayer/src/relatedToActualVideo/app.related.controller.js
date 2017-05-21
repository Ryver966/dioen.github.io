relatedController.$inject = ['$scope', 'Factory', 'YTService'];

export default function relatedController($scope, Factory, YTService) {
    $scope.$watch(function () {
            return Factory.data.relatedToActualVid;
        },
        function (newVal, oldVal) {
            if (newVal !== undefined) {
                $scope.relatedVid = newVal;
            }
        }, true)

    $scope.loadRelated = (index) => {
        let actualItem = $scope.relatedVid;

        Factory.setActualVid(actualItem);

        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                Factory.setRelatedToActualVid(data1);
            });
    }
}