import NewsService from './Services/NewsService.js';
import PaginatorService from './Services/PaginatorService.js';
import MainView from './Components/MainView/MainView.js';

let app = angular.module("newsApp", []);

app.service('NewsService', NewsService)
    .service('PaginatorService', PaginatorService)
    .component('mainView', MainView);