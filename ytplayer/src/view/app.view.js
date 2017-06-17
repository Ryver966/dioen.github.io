import vidCtrl from './app.view.controller';

export default {
    restrict: 'E',
    template: require('./app.view.html'),
    controller: vidCtrl,
    controllerAs: 'vidVM',
    bindings: '&'
}