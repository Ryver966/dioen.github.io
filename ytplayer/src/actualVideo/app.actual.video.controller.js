// import YouTubePlayer from 'youtube-player';

let actualVideoController = ($scope, $timeout, $sce, Factory, YTService) => {
    let vm = this;
    let onPlay = () => {
        console.log('playing');
    }

    let loadNextVideo = (event) => {
        if (event.data == YT.PlayerState.ENDED) {
            Factory.setActualVid(Factory.data.relatedToActualVid);

            YTService.getRelatedVideosById(Factory.data.relatedToActualVid.id)
                .then((data1) => {
                    Factory.setRelatedToActualVid(data1);
                });
        }
    }

    $scope.$watch(() => {
        return Factory.data.actualVid;
    }, (newVal, oldVal) => {
        let player;

        if (newVal != undefined) {
            vm.vid = $sce.trustAsResourceUrl(newVal.src.toString());
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