const forecast = (() => {

  return {
    stringLocParams,
    coordsAPI,
    splitCoordsRes,
    weatherAPI,
    currentTempF,
    dailySummary
  };

  function stringLocParams(userInput) {
    let paramString = '';

    for (let i = 0; i < userInput.length; i++) {
      userInput[i + 1] ?
      paramString += `${userInput[i]}/`:
      paramString += `${userInput[i]}.json`;
    }

    return paramString;
  }

  function coordsAPI(paramString){
    let weatherUnderground,
        coordsUnparsed;

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

  function splitCoordsRes(response) {
    return response.current_observation.ob_url.split('=')[1];
  }

  function weatherAPI(coordsParsed) {
    let forecastAPI,
        forecastRes;

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

  function currentTempF(data) {
    return data.currently.temperature;
  }

  function dailySummary(data) {
    let dailyData = data.daily.data,
        dailySum = data.daily.summary,
        maxTempF = [],
        minTempF = [],
        nightlyLunation = [],
        icons = [];

    for (let i = 0; i < 7; i++) {
      maxTempF.push(dailyData[i].temperatureMax);
      minTempF.push(dailyData[i].temperatureMin);
      nightlyLunation.push(dailyData[i].moonPhase)
      icons.push(dailyData[i].icon);
    }

    return {
      dailySum,
      maxTempF,
      minTempF,
      nightlyLunation,
      icons
    }
  }


})();
