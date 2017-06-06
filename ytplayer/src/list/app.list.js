import listController from './app.list.controller.js'

export default {
    restrict: 'E',
    controller: listController,
    template: require('./app.list.view.html'),
    binding: "&"
}