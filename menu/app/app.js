let vis = true;
let $form = $('form');
let $submit = $('#click');

//when menu is open listen to $submit
$submit.click(e => {

  menu(vis, $form);

  if (vis) {
    closedListener(e, $form);
  };

  vis = !vis;
});

/// functions menu, closedListener, manPane, manForm

function menu(vis, form) {
  manPane(vis);
  manForm(vis, form);
};

function closedListener(e, $form) {
  e.stopPropagation();
  $($form).on('click', () => {
    menu(vis, $form);
    vis = !vis;
    $form.off('click');
  })
}

function manPane(vis) {
  const $menu = $('#menu');

  if (vis) {
    $menu.animate({'height': '8vh'});
    $menu.removeClass('init');
  }
  else {
    $menu.animate({'height': '80vh'});
  }
};

function manForm(vis, form) {
  const $inputs = $('input'),
        $bars = $('.bar'),
        $submit = $('#click');

  if (vis) {
    let left_c = $('body').width()/2 - (form.width()/5.35714286)/2;
    form.animate({left: ~left_c });
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
