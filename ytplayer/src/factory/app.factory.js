class DataService {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.data = {};
        this.data.alreadyPlayedVideos = [];
        this.data.userSettingsFileId;
        this.data.userSettingsFileContent;
        this.gapiUser;
        this.data.videos = [];
        this.data.isUserLoggedIn = false;
        this.data.actualPlayingListType;
        this.isSearching = false;
    }

    setIsSearching(isSearching) {
        this.isSearching = isSearching;
    }

    getIsSearching() {
        return this.isSearching;
    }

    setActualPlayingListType(listType) {
        this.data.actualPlayingListType = listType;
    }

    getActualPlayingListType() {
        return this.data.actualPlayingListType;
    }

    setIsUserLoggedIn(boolValue) {
        this.$timeout(() => {
            this.data.isUserLoggedIn = boolValue;
        });
    }

    getIsUserLoggedIn() {
        return this.data.isUserLoggedIn;
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
        return this.data.data; //list of videos set by search
    }

    setFactoryData(data1) {
        this.$timeout(() => {
            this.data.data = data1; //list of videos set by search
        });
    }

    getActualVid() {
        return this.data.actualVid;
    }

    setActualVid(src) {
        this.data.actualVid = "null";
        this.$timeout(() => {
            this.data.actualVid = src;
        });
    }

    getAlreadyPlayedVideos() {
        return this.data.alreadyPlayedVideos;
    }

    addAlreadyPlayedVideo(videoId) {
        this.data.alreadyPlayedVideos.push(videoId);
    }

    clearAlreadyPlayedVideos() {
        this.data.alreadyPlayedVideos = [];
    }

    setUserSettingsFileId(fileId) {
        this.data.userSettingsFileId = fileId;
    }

    setUserSettingsFileContent(fileContent) {
        this.data.userSettingsFileContent = fileContent;
    }

    setGoogleGapiUser(gapiUser) {
        this.gapiUser = gapiUser;
    }

    addVideoToUserList(videoItem) {
        this.data.videos.push(videoItem);
    }
}

export default DataService;