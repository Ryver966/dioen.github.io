import actualVideoController from './app.actual.video.controller';

export default {
    controller: actualVideoController,
    controllerAs: 'actualVideoVM',
    template: require('./app.actual.video.html'),
    binding: '&',
    restrict: 'E'
}