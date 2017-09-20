export default class NewsService {
    constructor($http) {
        this.$http = $http;
    }

    getNews() {
        let config = {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': 'fd0f504390c44cceabbec530a7a55213'
            }
        };
        return this.$http.jsonp('https://api.cognitive.microsoft.com/bing/v7.0/news?q=rynki+finansowe&mkt=pl-pl');
    }
}