( () => {
  let vis = true;
  let $form = $('form');
  let $submit = $('#submit');
  let $inputs = $('input');

  //when menu is open listen to $submit
  $submit.click(e => {
    let formInput, coordsParams,
        coordsAJAX, coords,
        weatherAJAX, weather;

    formInput = [];
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs.eq(i).val().trim()) formInput.push($inputs.eq(i).val());
    }

    coordsParams = forecast.stringParamsCoords(formInput);

    if(!coordsParams) return false;
    coordsAJAX = forecast.coordsAPI(coordsParams);
    coordsAJAX.then( res => {
      coords = res.current_observation.ob_url.split('=')[1];
      weatherAJAX = forecast.weatherAPI(coords);
      return weatherAJAX;
    })
    .then( resTwo => {
      weather = resTwo;
      console.log('weather',resTwo);
    });

    menu(vis, $form);
    if (vis) {
      closedListener(e, '#new');
    };

    vis = !vis;
  });

  /// functions menu, closedListener, manPane, manForm

  function menu(vis, form) {
    manPane(vis);
    manForm(vis, form);
  };

  function closedListener(e, target) {
    e.stopPropagation();
    $(target).on('click', () => {
      menu(vis, $form);
      vis = !vis;
      $form.off('click');
    })
  }

  function manPane(vis) {
    const $pane = $('#pane');
    const $menu = $('#menu')

    if (vis) {
      $pane.animate({'height': '8vh'});
      $pane.removeClass('init');
      $menu.append('<div id="new">New Location</div>');
      $('#new').css({'top': '8vh', 'left' : '0'});
      $menu.hover(() => {
        $('#new').show();
      });
      $pane.mouseleave(() => {
        $('#new').hide();
      });
    }
    else {
      $pane.animate({'height': '80vh'});
      $('#new').remove();
    }
  };

  function manForm(vis, form) {
    const $inputs = $('input'),
          $bars = $('.bar'),
          $submit = $('#submit');

    if (vis) {
      let left_c = 50 - (((form.width()/5.35714286)/$('body').width()) * 100);
      form.animate({left: `${~left_c}vw`});
    } else {
      form.animate({left: 0});
    }

    for (var i = 0; i < $inputs.length; i++) {
      vis ?
      $inputs.eq(i).slideUp():
      $inputs.eq(i).slideDown();
      vis ?
      $bars.eq(i).animate({'width':'2.8vw'}):
      $bars.eq(i).animate({'width': '15vw'});
    }

    vis ? $submit.slideUp() : $submit.slideDown();

  };
})();
