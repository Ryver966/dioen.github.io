let MainViewController = (NewsService) => {
    let vm = this;

    vm.loadNews = () => {
        NewsService.getNews().then((response) => {
            console.log(response);
            vm.newsData = response.data.value;
        });
    }

    return vm;
}

MainViewController.$inject = ['NewsService'];

export default MainViewController;