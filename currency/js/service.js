var ServiceModule = (function() {

    var returnCurrencyCost = function(currencyToCheck) {
        return new Promise(function(resolve, reject) {
            var httpRequest = new XMLHttpRequest();

            httpRequest.open('GET', 'http://api.fixer.io/latest?base=' + currencyToCheck + '&symbols=PLN', false);
            httpRequest.send();

            if (httpRequest.status == 200) {
                console.log(httpRequest.responseText);
                resolve(JSON.parse(httpRequest.responseText));
            } else {
                reject(alert('Something gone wrong, please try again.'))
            }
        })
    }

    return {
        currencyCost: returnCurrencyCost
    }
})();