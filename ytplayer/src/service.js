let YouTube = require('youtube-node');

export default class YTService {

    constructor($sce, Factory) {
        this.$sce = $sce;
        this.Factory = Factory;
    }

    createFileWithJSONContent(data) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const contentType = 'application/json';

        let metadata = {
            'name': 'ytsettings.json',
            'mimeType': contentType
        };

        let multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
            data +
            close_delim;

        return multipartRequestBody;
    }

    getRelatedVideosById(videoId) {
        let youtube = new YouTube();
        let _Factory = this.Factory;

        let mapper = (element) => {
            let vidObj = {
                src: this.$sce.trustAsResourceUrl('https://www.youtube.com/embed/' + element.id.videoId + '?enablejsapi=1&version=3&autoplay=1'),
                title: element.snippet.title,
                img: element.snippet.thumbnails.medium.url,
                id: element.id.videoId
            }
            return vidObj;
        }

        let chooseVideo = (alreadyPlayedList, relatedVideosList) => {
            _Factory.addAlreadyPlayedVideo(videoId);
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

            youtube.related(videoId, 10, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    let temp = result.items.map(mapper);
                    let temp1 = _Factory.getAlreadyPlayedVideos();
                    let temp3;

                    temp3 = chooseVideo(temp1, temp);
                    console.log(_Factory.getAlreadyPlayedVideos());
                    console.log(temp3);
                    console.log('from service');
                    resolve(temp3);
                }
            });
        });
    };

    getDataByString(query) {
        let youtube = new YouTube();
        let mapper = (element) => {
            let vidObj = {
                src: this.$sce.trustAsResourceUrl('https://www.youtube.com/embed/' + element.id.videoId + '?enablejsapi=1&version=3&autoplay=1'),
                title: element.snippet.title,
                img: element.snippet.thumbnails.medium.url,
                id: element.id.videoId
            }
            return vidObj;
        }


        return new Promise((resolve, reject) => {
            youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            youtube.search(query, 50, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                    let temp = result.items.map(mapper);
                    resolve(temp);
                }
            });
        });
    }

    saveFileOnDrive(gapi, data) {
        let multipartRequestBody = this.createFileWithJSONContent(data);
        const boundary = '-------314159265358979323846';

        var request = gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': {
                'uploadType': 'multipart'
            },
            'headers': {
                'Content-Type': 'multipart/related; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
        });

        request.execute();
    }

    loadFileFromDrive(gapi) {
        let request = gapi.client.drive.files.get({
            fileId: '0Bx-ppSNJ37djdXczMUxnTGZPZDg',
            mimeType: 'text/json',
            alt: 'media'
        });

        request.execute((response) => {
            console.log(response);
        });
    }

    ifFileExist(gapi) {
        return new Promise((resolve, reject) => {
            gapi.client.load('drive', 'v2',
                () => {
                    let request = gapi.client.drive.files.list({
                        q: "title='ytsettings.json'"
                    });
                    request.execute((response) => {
                        (response.items.length > 0) ? resolve(true): resolve(false);
                    });
                });
        });
    }
}