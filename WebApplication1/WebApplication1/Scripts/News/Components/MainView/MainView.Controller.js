let MainViewController = (NewsService, PaginatorService) => {
    let vm = this;
    vm.counter = 1;

    vm.loadNews = () => {
        return NewsService.getNews().then((response) => {
            console.log(response);
            vm.newsDataContainer = response.data.value;
        });
    }

    vm.loadMoreNews = () => {
        vm.newsData = PaginatorService.loadMoreNews(vm.newsDataContainer, vm.counter);

        vm.counter++;
    }

    vm.init = () => {
        vm.loadNews()
            .then(() => {
                vm.loadMoreNews();
            });
    }

    return vm;
}

MainViewController.$inject = ['NewsService', 'PaginatorService'];

export default MainViewController;