var ServiceModule = (function () {

    var calculateToPLN = function (currency) {
        return (1 / currency).toFixed(2);
    }

    var returnCurrencyCost = function () {
        return new Promise(function (resolve, reject) {
            var httpRequest = new XMLHttpRequest(),
                currencyObject = {},
                parsedResponse = "";
            

            httpRequest.open('GET', 'http://api.fixer.io/latest?base=PLN&symbols=GBP,EUR,CHF,USD', true);
            httpRequest.send();

            httpRequest.onload = function() {

                parsedResponse = JSON.parse(httpRequest.responseText);
                currencyObject = {
                    USD: calculateToPLN(parsedResponse.rates.USD),
                    GBP: calculateToPLN(parsedResponse.rates.GBP),
                    CHF: calculateToPLN(parsedResponse.rates.CHF),
                    EUR: calculateToPLN(parsedResponse.rates.EUR)
                }
                resolve(currencyObject);
            }
        })
    }

    return {
        currencyCost: returnCurrencyCost
    }
})();