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
          forecast.errorHandling(res);
          
          coords = forecast.splitCoordsRes(res);
          weatherAJAX = forecast.weatherAPI(coords);

          return weatherAJAX
                  .then( res => {
                    weather = res;
                    return weather;
                  })
                  .catch( err => {
                    throw new Error('Problem with weather service.');
                  });
        })
        .catch( err => {
          form.showErr($err, err);
          $err.show();
        })
        .then( weather => {
          dash.viewOne(forecast.currentTempF(weather));
          dash.stageSubViews(forecast.dailySummary(weather));
          menu.close();
          eventDisable = false;
        });
    });
  }

  function reset() {
    const $resetLoc = $('#dropdown');

    $resetLoc.click( () => {
      menu.open();
    });
  }

  function mtDropdown() {
    const $newLocation = $('#dropdown'),
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
    const $showMore = $('i.fa-chevron-up'),
          $showLess = $('i.fa-chevron-down'),
          $current = $('#current'),
          $forecast = $('#forecast');


    $showMore.click(() => {
      $current.animate({'top':'-100vh'});
      $forecast.animate({'top':'100vh'});
    })

    $showLess.click(() => {
      $current.animate({'top':'0'});
      $forecast.animate({'top':'0'});
    })
  }

})();
