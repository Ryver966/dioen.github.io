var mainModule = (function() {
    var showCurrency = function() {
        var usdElement = document.getElementById('currency-USD'),
            gbpElement = document.getElementById('currency-GBP'),
            chfElement = document.getElementById('currency-CHF'),
            eurElement = document.getElementById('currency-EUR');

        ServiceModule.currencyCost()
            .then(function (response) {
                usdElement.innerHTML = response.USD;
                gbpElement.innerHTML = response.GBP;
                chfElement.innerHTML = response.CHF;
                eurElement.innerHTML = response.EUR;
            });
    }

    return {
        showCurrency: showCurrency
    }
})();

mainModule.showCurrency();

var currencyRefresh = setInterval(mainModule.showCurrency, 10000);