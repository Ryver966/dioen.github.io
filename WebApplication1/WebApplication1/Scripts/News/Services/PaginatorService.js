export default class PaginatorService {
    constructor() {

    }

    loadMoreNews(newsArray, counter) {
        return newsArray.slice(0, counter * 9);
    }
}