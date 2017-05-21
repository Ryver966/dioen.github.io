import startStopController from './app.player.start.stop.controller';

export default {
    restrict: 'E',
    controller: startStopController,
    template: require('./app.player.start.stop.html'),
    bindings: '&'
}