import searchController from './app.search.controller';

export default {
    restrict: 'E',
    controller: searchController,
    controllerAs: 'searchVM',
    template: require('./search.html'),
    bindings: '&'
}