import MainViewController from './MainView.Controller';

export default {
    restrict: 'E',
    controller: MainViewController,
    controllerAs: 'viewVM',
    template: require('MainView.View.html'),
    bindings: '&'
}