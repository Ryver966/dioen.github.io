searchController.$inject = ['$scope', 'YTService', 'Factory'];

export default function searchController($scope, YTService, Factory) {
    let vm = this;
    vm.getYTData = () => {
        YTService.getDataByString(vm.query)
            .then((data) => {
                Factory.setFactoryData(data);
                Factory.clearAlreadyPlayedVideos();
                Factory.setIsSearching(true);
            });
    }
    document.getElementById('search-input').focus();

    return vm;
};