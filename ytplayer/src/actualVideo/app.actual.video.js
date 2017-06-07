import actualVideoController from './app.actual.video.controller';

export default {
    controller: actualVideoController,
    template: require('./app.actual.video.html'),
    binding: '&',
    restrict: 'E'
}