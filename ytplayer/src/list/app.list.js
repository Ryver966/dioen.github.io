import listController from './app.list.controller.js'

export default {
    restrict: 'E',
    controller: listController,
    controllerAs: 'listVM',
    template: require('./app.list.view.html'),
    bindings: '&'
}