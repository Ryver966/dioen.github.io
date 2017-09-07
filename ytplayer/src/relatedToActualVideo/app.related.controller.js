relatedController.$inject = ['$scope', 'DataService', 'YTService'];

export default function relatedController($scope, DataService, YTService) {
    let vm = this;

    $scope.$watch(function() {
            return DataService.data.relatedToActualVid;
        },
        function(newVal, oldVal) {
            if (newVal != undefined) {
                vm.relatedVid = newVal;
            }
        }, true)

    vm.loadRelated = (index) => {
        let actualItem = vm.relatedVid;
        DataService.setActualVid(actualItem);

        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                DataService.setRelatedToActualVid(data1);
            });
    }
    return vm;
}