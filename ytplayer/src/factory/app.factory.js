class Factory {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.data = {};
        this.data.alreadyPlayedVideos = [];
        this.data.userSettingsFileId;
        this.data.userSettingsFileContent;
    }

    getFactoryRelatedVid() {
        return this.data.relatedToActualVid;
    }

    setRelatedToActualVid(data2) {
        this.$timeout(() => {
            this.data.relatedToActualVid = data2;
        });
    }

    getFactoryData() {
        return this.data.data;
    }

    setFactoryData(data1) {
        this.$timeout(() => {
            this.data.data = data1;
        });
    }

    setActualVid(src) {
        this.data.actualVid = null;
        this.$timeout(() => {
            this.data.actualVid = src;
        });
    }

    getAlreadyPlayedVideos() {
        return this.data.alreadyPlayedVideos;
    }

    addAlreadyPlayedVideo(videoId) {
        this.data.alreadyPlayedVideos.push(videoId) ;
    }

    clearAlreadyPlayedVideos() {
        this.data.alreadyPlayedVideos = [];
    }

    setUserSettingsFileId(fileId) {
        this.userSettingsFileId = fileId;
    }

    setUserSettingsFileContent(fileContent) {
        this.data.setUserSettingsFileContent = fileContent;
    }
}

export default Factory;