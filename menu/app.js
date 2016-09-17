(() => {

  loadBackgrounds();
  mtDropdown();
  submit();
  reset();

  function submit() {
    const $setLoc = $('#submit'),
          $inputs = $('input'),
          $err = $('#error');
    let triggered = false;

    $setLoc.click(e => {

      if (triggered) return;
      else triggered = true;

      if ($err.is(':visible')) $err.hide();

      let formInput, locString,
          coordsAJAX, coords,
          weatherAJAX, weather;

      formInput = form.getValues($inputs);
      locString = forecast.stringLocParams(formInput);
      coordsAJAX = forecast.coordsAPI(locString);

      coordsAJAX
        .then( res => {

          if (res.response.error) throw new Error('invalid input');

          coords = forecast.splitCoordsRes(res);
          weatherAJAX = forecast.weatherAPI(coords);

          return weatherAJAX
                  .then( res => {
                    weather = res;
                    dash.set(weather);
                    menu.close();
                    form.clear($inputs);
                  });
        })
        .catch( err => {
          form.showErr($err);
          $err.show();
        })
        .then(() => {
          triggered = false;
        });
    });
  }

  function reset() {
    const $resetLoc = $('#new');

    $resetLoc.click( () => {
      menu.open();
    });
  }

  function mtDropdown() {
    const $newLocation = $('#new'),
          $submit = $('#submit'),
          $pane = $('#pane'),
          $menu = $('#menu');

    $menu.hover(() => {
      if ($submit.is(':visible')) return;
      $newLocation.show();
    });

    $pane.mouseleave(() => {
      $newLocation.hide();
    })
  }

  function loadBackgrounds() {
    $('#background-carousel').cycle({
      fx: 'fade',
      pager: '#smallnav',
      pause:   0,
      speed: 3500,
      timeout:  3500
    });
  }

})();
