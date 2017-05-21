import angular from 'angular';

import YTService from './service';
import OAuthService from './OAuthService/app.auth';
import Factory from './factory/app.factory';
import routes from './routes';
import ui from 'angular-ui-router';

import loginComponent from './login/app.login';
import searchComponent from './search/app.search';
import viewComponent from './view/app.view';
import actualVideoComponent from './actualVideo/app.actual.video';
import relatedComponent from './relatedToActualVideo/app.related';
import playComponent from './mainPlayer/playerStartPause/app.player.start.stop';
import css from './css/style.css';

let app = angular.module("myApp", ['ui.router'])
    .service("YTService", YTService)
    .service("OAuthService", OAuthService)
    // .config(routes)
    .component('search', searchComponent)
    .component('view', viewComponent)
    .component('actualVideo', actualVideoComponent)
    .component('relatedComponent', relatedComponent)
    .component('player', playComponent)
    .component('login', loginComponent)
    .factory('Factory', Factory);