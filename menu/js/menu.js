const menu = (() => {

  return {
    open,
    close
  }

  /// functions open, close

  function open() {
    const $inputs = $('input'),
          $bars = $('.bar'),
          $submit = $('#submit'),
          $pane = $('#pane'),
          $menu = $('#menu'),
          $dropdown = $('#dropdown');

    $dropdown.hide();
    $pane.animate({'height': '100vh', 'width': '100vw'});
    $menu.animate({'width' :'100%'});
    $submit.slideDown();
    for (var i = 0; i < $inputs.length; i++) {
      $inputs.eq(i).slideDown();
      $bars.eq(i).animate({'width': '90%'});
    }
  }

  function close() {
    const $inputs = $('input'),
          $bars = $('.bar'),
          $submit = $('#submit'),
          $pane = $('#pane'),
          $menu = $('#menu'),
          $dropdown = $('#dropdown');

    $pane.animate({'height': '55px', 'width': '55px'});
    $menu.animate({'width' : '50px'});
    $submit.slideUp();
    for (var i = 0; i < $inputs.length; i++) {
      $inputs.eq(i).slideUp();
      $bars.eq(i).animate({'width':'40px'});
    }
    
    //form.js
    form.clear($inputs);
  }

})();
