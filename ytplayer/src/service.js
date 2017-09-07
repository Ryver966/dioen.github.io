let YouTube = require('youtube-node');

export default class YTService {

    constructor(DataService) {
        this.DataService = DataService;
    }

    getRelatedVideosById(videoId) {
        let youtube = new YouTube();
        let _DataService = this.DataService;

        let mapper = (element) => {
            let vidObj = {
                src: 'https://www.youtube.com/embed/' + element.id.videoId + '?enablejsapi=1&autoplay=1&controls=2',
                title: element.snippet.title,
                img: element.snippet.thumbnails.medium.url,
                id: element.id.videoId
            }
            return vidObj;
        }

        let filter = (element) => {
            if (element.id.videoId != undefined) {
                return element;
            }
        }

        let chooseVideo = (alreadyPlayedList, relatedVideosList) => {
            _DataService.addAlreadyPlayedVideo(videoId);
            for (let i = 0; i < relatedVideosList.length; i++) {
                // if (alreadyPlayedList.length > 9) {
                //     alreadyPlayedList.shift();
                // }
                if (alreadyPlayedList.indexOf(relatedVideosList[i].id) == -1) {
                    return relatedVideosList[i];
                }
            }
        }

        return new Promise((resolve, reject) => {
            youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            youtube.addParam('type', 'video');
            youtube.addParam('part', 'snippet,id');

            console.log(videoId);

            youtube.related(videoId, 10, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    let temp = result.items.filter(filter);
                    temp = temp.map(mapper);
                    let temp1 = _DataService.getAlreadyPlayedVideos();
                    let temp3;

                    temp3 = chooseVideo(temp1, temp);
                    resolve(temp3);
                }
            });
        });
    };

    getDataByString(query) {
        let youtube = new YouTube();
        let mapper = (element) => {
            let vidObj = {
                src: 'https://www.youtube.com/embed/' + element.id.videoId + '?enablejsapi=1&autoplay=1&controls=2',
                title: element.snippet.title,
                img: element.snippet.thumbnails.medium.url,
                id: element.id.videoId
            }
            return vidObj;
        }

        let filter = (element) => {
            if (element.id.videoId != undefined) {
                return element;
            }
        }

        return new Promise((resolve, reject) => {
            youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            youtube.search(query, 50, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                    let temp = result.items.filter(filter);
                    temp = temp.map(mapper);
                    resolve(temp);
                }
            });
        });
    }
}