import searchController from './app.search.controller';

export default {
    restrict: 'E',
    controller: searchController,
    template: require('./search.html'),
    bindings: '&'
}