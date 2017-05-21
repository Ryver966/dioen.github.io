import loginController from './app.login.controller';

export default {
    restrict: 'E',
    controller: loginController,
    template: require('./app.login.html'),
    bindings: '&'
}