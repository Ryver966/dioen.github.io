// import YouTubePlayer from 'youtube-player';

let actualVideoController = ($scope, $timeout, Factory, YTService) => {

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
        if (newVal !== undefined) {
            $scope.vid = newVal;
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
}

actualVideoController.$inject = ['$scope', '$timeout', 'Factory', 'YTService'];

export default actualVideoController;