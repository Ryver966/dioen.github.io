aroutes.$inject = ['$urlRouterProvider'];

export default function aroutes($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}