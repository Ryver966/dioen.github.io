let actualVideoController = ($scope, $timeout, $sce, DataService, YTService, EventHandlersService) => {
    let vm = this;
    vm.replayVideo = false;

    let player;

    let onPlay = () => {
        console.log('playing');
    }
    let data; //need to be global (bad practice I know)

    vm.setReplayVideo = (event) => {
        (vm.replayVideo == false) ? vm.replayVideo = true : vm.replayVideo = false

        EventHandlersService.setActiveClass(event);
    }

    let loadNextVideo = (event) => {
        let isSearch = DataService.getIsSearching();
        let actualVid = DataService.getActualVid();
        //vm.replayVideo = false;

        if (!isSearch) { //if searching, actual video is being set from Related Vid
            data = DataService.getFactoryData();
        }

        if (event.data == YT.PlayerState.ENDED) {
            let actualListType = DataService.getActualPlayingListType();

            switch (actualListType) {
                case "userlist":
                    let actualVideoIndex = data.indexOf(actualVid);

                    if (actualVid != undefined) {
                        if (vm.replayVideo == false) {
                            actualVideoIndex++;
                            if (actualVideoIndex == data.length) actualVideoIndex = 0;
                            DataService.setActualVid(data[actualVideoIndex]);

                            YTService.getRelatedVideosById(DataService.data.relatedToActualVid.id)
                                .then((data1) => {
                                    DataService.setRelatedToActualVid(data1);
                                });
                        } else {
                            DataService.setActualVid('null');                            
                            DataService.setActualVid(data[actualVideoIndex]);
                        }
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
        if (newVal != undefined) {
            let vidFrameElement = document.getElementsByClassName('float-actual-video')[0];
            EventHandlersService.setActiveClass(vidFrameElement);
            
            vm.vid = $sce.trustAsResourceUrl(newVal.src);
            $timeout(() => {
                player = new YT.Player('player', {
                    events: {
                        'onStateChange': loadNextVideo,
                        'onReady': onPlay
                    }
                });
            });
        }
    }, false);

    return vm;
}

actualVideoController.$inject = ['$scope', '$timeout', '$sce', 'DataService', 'YTService', 'EventHandlersService'];

export default actualVideoController