export default class NewsService {
    constructor($http, $sce) {
        this.$http = $http;
        this.$sce = $sce;
    }

    getNews() {
        const apiKey = 'fd0f504390c44cceabbec530a7a55213';

        let config = {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey
            }
        };
        return this.$http.get('https://api.cognitive.microsoft.com/bing/v5.0/news/?q=rynki+finansowe&mkt=pl-pl', config);
    }
}