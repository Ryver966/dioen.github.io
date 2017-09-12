import angular from 'angular';

import YTService from './service';
import OAuthService from './OAuthService/app.auth';
import DataService from './factory/app.factory';
import GoogleFileService from './googleFileService/app.google.file.service';
import EventHandlersService from './core/app.element-handlers'
// import routes from './routes';
// import ui from 'angular-ui-router';

import searchComponent from './search/app.search';
import viewComponent from './view/app.view';
import actualVideoComponent from './actualVideo/app.actual.video';
import relatedComponent from './relatedToActualVideo/app.related';
import playComponent from './mainPlayer/playerStartPause/app.player.start.stop';
import loginComponent from './login/app.login';
import listComponent from './list/app.list'
import css from './css/style.css';

let app = angular.module("myApp", [])
    .service("YTService", YTService)
    .service("OAuthService", OAuthService)
    .service("GoogleFileService", GoogleFileService)
    .service('DataService', DataService)
    .service('EventHandlersService', EventHandlersService)
    // .config(routes)
    .component('search', searchComponent)
    .component('view', viewComponent)
    .component('actualVideo', actualVideoComponent)
    .component('relatedComponent', relatedComponent)
    .component('player', playComponent)
    .component('login', loginComponent)
    .component('list', listComponent);