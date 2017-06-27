// import YouTubePlayer from 'youtube-player';

let actualVideoController = ($scope, $timeout, $sce, Factory, YTService) => {
    let vm = this;

    let onPlay = () => {
        console.log('playing');
    }

    let data;

    let loadNextVideo = (event) => {
        let isSearch = Factory.getIsSearching();
        let actualVid = Factory.getActualVid();
        if (!isSearch) {
            data = Factory.getFactoryData();
            Factory.setActualPlayingListType("userlist");
        }

        let actualVideoIndex = data.indexOf(actualVid);

        if ((event.data == YT.PlayerState.ENDED)) {
            let actualListType = Factory.getActualPlayingListType();

            switch (actualListType) {
                case "userlist":
                    if (actualVid != undefined) {
                        actualVideoIndex++;
                        if (actualVideoIndex == data.length) actualVideoIndex = 0;
                        Factory.setActualVid(data[actualVideoIndex]);

                        YTService.getRelatedVideosById(Factory.data.relatedToActualVid.id)
                            .then((data1) => {
                                Factory.setRelatedToActualVid(data1);
                            });
                    }
                    break;
                case "searchlist":
                    Factory.setActualVid(Factory.data.relatedToActualVid);

                    YTService.getRelatedVideosById(Factory.data.relatedToActualVid.id)
                        .then((data1) => {
                            Factory.setRelatedToActualVid(data1);
                        });
                    break;
            }
        }
    }

    $scope.$watch(() => {
        return Factory.data.actualVid;
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

actualVideoController.$inject = ['$scope', '$timeout', '$sce', 'Factory', 'YTService'];

export default actualVideoController;