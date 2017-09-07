searchController.$inject = ['$scope', 'YTService', 'DataService'];

export default function searchController($scope, YTService, DataService) {
    let vm = this;
    vm.getYTData = () => {
        YTService.getDataByString(vm.query)
            .then((data) => {
                DataService.setFactoryData(data);
                DataService.clearAlreadyPlayedVideos();
                DataService.setIsSearching(true);
            });
    }
    document.getElementById('search-input').focus();

    return vm;
};