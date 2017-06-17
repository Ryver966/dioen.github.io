relatedController.$inject = ['$scope', 'Factory', 'YTService'];

export default function relatedController($scope, Factory, YTService) {
    let vm = this;

    $scope.$watch(function() {
            return Factory.data.relatedToActualVid;
        },
        function(newVal, oldVal) {
            if (newVal != undefined) {
                vm.relatedVid = newVal;
            }
        }, true)

    vm.loadRelated = (index) => {
        let actualItem = vm.relatedVid;
        Factory.setActualVid(actualItem);

        YTService.getRelatedVideosById(actualItem.id)
            .then((data1) => {
                Factory.setRelatedToActualVid(data1);
            });
    }
    return vm;
}