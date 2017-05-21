import relatedController from './app.related.controller';

export default {
    restrict: 'E',
    controller: relatedController,
    template: require('./app.related.html'),
    bindings: '&'
}