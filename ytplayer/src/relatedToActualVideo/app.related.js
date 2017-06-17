import relatedController from './app.related.controller';

export default {
    restrict: 'E',
    controller: relatedController,
    controllerAs: 'relatedVM',
    template: require('./app.related.html'),
    bindings: '&'
}