( () => {
  let $form = $('form');
  let $setLoc = $('#submit');
  let $resetLoc = $('#new');
  let $inputs = $('input');

  //event listenters, AJAX;
  $setLoc.click(e => {
    let formInput, locString,
        coordsAJAX, coords,
        weatherAJAX, weather;

    formInput = form.getValues($inputs);
    locString = forecast.stringLocParams(formInput);
    coordsAJAX = forecast.coordsAPI(locString);
    coordsAJAX
      .then( res => {
        coords = res.current_observation.ob_url.split('=')[1];
        weatherAJAX = forecast.weatherAPI(coords);
        return weatherAJAX;
      })
      .then( resTwo => {
        weather = resTwo;
        menu.close()
      })
      .catch( err => {
        console.log('err', err);
      });
  });

  $resetLoc.click( () => {
    menu.open();
  });

  menu.dropdown();

})();
