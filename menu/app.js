(() => {

  loadBackgrounds();
  mtDropdown();
  submit();
  reset();
  dashViews();

  function submit() {
    const $setLoc = $('#submit'),
          $inputs = $('input'),
          $err = $('#error');
    let eventDisable = false;

    $setLoc.on('click keydown', e => {
      if (!(e.which === 1 || e.which === 13) || eventDisable) return;
      else eventDisable = true;
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
          else if (!res.current_observation) {
            let results = res.response.results;
            let err = 'Did you mean ';
            for (let i = 0; i < results.length; i++) {
              i < results.length - 1 ?
              err += `${results[i].city}, ${results[i].state} or `:
              err += `${results[i].city}, ${results[i].state}?`;
            }
            throw new Error(err);
          }

          coords = forecast.splitCoordsRes(res);
          weatherAJAX = forecast.weatherAPI(coords);

          return weatherAJAX
                  .then( res => {
                    weather = res;
                    dash.set(weather);
                    menu.close();
                    form.clear($inputs);
                  })
                  .catch( err => {
                    throw new Error('Problem with weather service.');
                  });
        })
        .catch( err => {
          form.showErr($err, err);
          $err.show();
        })
        .then(() => {
          eventDisable = false;
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

  function dashViews() {
    const $more = $('#more'),
          $less = $('#less'),
          $views = $('#views');

    $more.click(() => {
      $views.animate({'top':'-90vh'});
    })

    $less.click(() => {
      $views.animate({'top':'0'});
    })
  }

})();
