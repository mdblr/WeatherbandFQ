const forecast = (() => {

  return {
    stringParamsCoords,
    coordsAPI,
    weatherAPI
  };

  function stringParamsCoords(userInput) {
    let paramString = '';
    for (let i = 0; i < userInput.length; i++) {
      userInput[i + 1] ?
      paramString += `${userInput[i]}/`:
      paramString += `${userInput[i]}.json`;
    }
    return paramString;
  }

  function coordsAPI(paramString){
    let weatherUnderground, coordsUnparsed;
    weatherUnderground =
      'http://api.wunderground.com/api/a23692177cc6bae1/conditions/q/';

    coordsUnparsed =
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: `${weatherUnderground}${paramString}`
      })
      .then(res => {
        return res;
      })
      .fail( err => {
        return err;
      });

    return coordsUnparsed;
  };

  function weatherAPI(coordsParsed) {
    let forecastAPI, forecastRes;
    forecastAPI =
      "https://api.forecast.io/forecast/ec4ea27eb974f4bdcd500583b2c49367/";

    forecastRes =
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: `${forecastAPI}${coordsParsed}`
      })
      .then( res => {
        return res;
      })
      .fail( err => {
        return err;
      });

    return forecastRes;
  }

})();