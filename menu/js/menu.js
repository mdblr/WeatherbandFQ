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
          $form = $('form'),
          $dropdown = $('#new');

    $dropdown.hide();
    $pane.animate({'height': '100vh'});
    $form.animate({left: 0});
    $submit.slideDown();
    for (var i = 0; i < $inputs.length; i++) {
      $inputs.eq(i).slideDown();
      $bars.eq(i).animate({'width': '11.4vw'});
    }
  }

  function close() {
    const $inputs = $('input'),
          $bars = $('.bar'),
          $submit = $('#submit'),
          $pane = $('#pane'),
          $form = $('form'),
          $dropdown = $('#new');
    let left_c = 50 - ((($form.width()/4.07142857)/$('body').width()) * 100);

    $pane.animate({'height': '4.5vh'});
    $form.animate({left: `${~left_c}vw`});
    $submit.slideUp();
    for (var i = 0; i < $inputs.length; i++) {
      $inputs.eq(i).slideUp();
      $bars.eq(i).animate({'width':'2.8vw'});
    }
  }

})();
