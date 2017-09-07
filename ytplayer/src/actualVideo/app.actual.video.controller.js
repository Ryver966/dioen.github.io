let actualVideoController = ($scope, $timeout, $sce, DataService, YTService) => {
    let vm = this;

    let onPlay = () => {
        console.log('playing');
    }
    let data; //need to be global (bad practice I know)

    let loadNextVideo = (event) => {
        let isSearch = DataService.getIsSearching();
        let actualVid = DataService.getActualVid();

        if (!isSearch) { //if searching, actual video is being set from Related Vid
            data = DataService.getFactoryData();
        }

        if (event.data == YT.PlayerState.ENDED) {
            let actualListType = DataService.getActualPlayingListType();

            switch (actualListType) {
                case "userlist":
                    let actualVideoIndex = data.indexOf(actualVid);

                    if (actualVid != undefined) {
                        actualVideoIndex++;
                        if (actualVideoIndex == data.length) actualVideoIndex = 0;
                        DataService.setActualVid(data[actualVideoIndex]);

                        YTService.getRelatedVideosById(DataService.data.relatedToActualVid.id)
                            .then((data1) => {
                                DataService.setRelatedToActualVid(data1);
                            });
                    }
                    break;
                case "searchlist":
                DataService.setActualVid(DataService.data.relatedToActualVid);

                    YTService.getRelatedVideosById(DataService.data.relatedToActualVid.id)
                        .then((data1) => {
                            DataService.setRelatedToActualVid(data1);
                        });
                    break;
            }
        }
    }

    $scope.$watch(() => {
        return DataService.data.actualVid;
    }, (newVal, oldVal) => {
        let player;

        if (newVal != undefined) {
            vm.vid = $sce.trustAsResourceUrl(newVal.src);
            $timeout(() => {
                player = new YT.Player('playYT', {
                    events: {
                        'onStateChange': loadNextVideo,
                        'onReady': onPlay
                    }
                });
            });
        }
    }, true);

    return vm;
}

actualVideoController.$inject = ['$scope', '$timeout', '$sce', 'DataService', 'YTService'];

export default actualVideoController;