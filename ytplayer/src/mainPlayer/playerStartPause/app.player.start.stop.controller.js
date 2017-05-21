startStopController.$inject = ['$scope'];

export default function startStopController($scope) {
    let ytplayer;

    function onYouTubePlayerReady(playerId) {
        console.log("player ready");
        ytplayer = document.getElementById('playYT');
    }

    $scope.pause = () => {
        ytplayer.stopVideo();
    }
}