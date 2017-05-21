routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
    .state('cos', {
        url: '/cos',
        template: require('./cos.html')
    });
}