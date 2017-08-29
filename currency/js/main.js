var mainModule = (function() {
    var init = function() {
        var selectedCurrency = document.getElementById('currency-select-box-id');

        selectedCurrency.addEventListener('change', function() {
            var selectedCurrencyValue = selectedCurrency.options[selectedCurrency.selectedIndex].value
            console.log(selectedCurrencyValue);
            showCurrency(selectedCurrencyValue);
        });
    }

    var showCurrency = function(currency) {
        ServiceModule.currencyCost(currency)
            .then(function(response) {
                var currencyLabel = document.getElementById('currency-label');

                console.log(response);
                currencyLabel.innerHTML = Object.values(response.rates)[0];
            });
    }

    return {
        initProgram: init
    }
})();

mainModule.initProgram();