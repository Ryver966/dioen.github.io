// import YTPlayer from 'youtube-player';

let actualVideoController = ($scope, Factory, YTService) => {

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
        if (newVal !== undefined) {
            $scope.vid = newVal;

            let player;

            player = new YT.Player('playYT', {
                events: {
                    'onStateChange': loadNextVideo
                }
            });
        }
    }, true);
}

actualVideoController.$inject = ['$scope', 'Factory', 'YTService'];

export default actualVideoController;