import MainViewController from './MainView.Controller.js';

export default {
    restrict: 'E',
    controller: MainViewController,
    controllerAs: 'viewVM',
    templateUrl: '/Scripts/News/Components/MainView/MainView.View.html',
    bindings: '&'
}