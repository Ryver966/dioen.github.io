import loginController from './app.login.controller';

export default {
    restrict: 'E',
    controller: loginController,
    controllerAs: 'loginVM',
    template: require('./app.login.html'),
    bindings: '&'
}