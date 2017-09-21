import NewsService from './Services/NewsService.js';
import MainView from './Components/MainView/MainView.js';

let app = angular.module("newsApp", []);

app.service('NewsService', NewsService)
    .component('mainView', MainView)
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    });