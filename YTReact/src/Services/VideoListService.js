import videoObject from '../Models/Video.Object';
let YouTube = require('youtube-node');

class VideoListService {
    constructor() {

    }

    fetchList(query) {
        let youtube = new YouTube();

        return new Promise((resolve, reject) => {
            youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            youtube.search(query, 50, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    let tempResults = result.items.filter(element => element.id.videoId != undefined);
                    tempResults = tempResults.map(videoObject);

                    resolve(tempResults);
                }
            });
        });
    }
}

export default VideoListService;