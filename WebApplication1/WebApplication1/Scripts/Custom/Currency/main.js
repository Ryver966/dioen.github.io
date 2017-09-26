var mainModule = (function() {
    var showCurrency = function() {
        var usdElement = document.getElementById('currency-USD'),
            gbpElement = document.getElementById('currency-GBP'),
            chfElement = document.getElementById('currency-CHF'),
            eurElement = document.getElementById('currency-EUR');

        ServiceModule.currencyCost()
            .then(function (response) {
                usdElement.innerHTML = response.USD + ' zł';
                gbpElement.innerHTML = response.GBP + ' zł';
                chfElement.innerHTML = response.CHF + ' zł';
                eurElement.innerHTML = response.EUR + ' zł';
            });
    }

    return {
        showCurrency: showCurrency
    }
})();

mainModule.showCurrency();

var currencyRefresh = setInterval(mainModule.showCurrency, 10000);