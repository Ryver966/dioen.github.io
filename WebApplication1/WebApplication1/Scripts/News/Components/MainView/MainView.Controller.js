let MainViewController = (NewsService) => {
    vm = this;

    vm.NewsService = NewsService;

    vm.loadNews = () => {
        vm.NewsService.getNews().then((response) => {
            console.log(response);
            vm.newsData = response;
        });
    }
}

MainViewController.$inject = ['NewsService'];

export default MainViewController;