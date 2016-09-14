let vis = true;
const $inputs = $('input');
const $menu = $('#menu');
let $form = $('form');
const $bars = $('.bar');
let $submit = $('#click');


$submit.click( (e) => {

  vis ? hide($menu, $form) : show($menu, $form);

  for (var i = 0; i < $inputs.length; i++) {
    vis ? $inputs.eq(i).slideUp() : $inputs.eq(i).slideDown();
    vis ? $bars.eq(i).animate({'width':'2.8vw'}) : $bars.eq(i).animate({'width': '15vw'});
  }

  vis ? $submit.slideUp() : $submit.slideDown();

  if (vis) {
    e.stopPropagation();

    $($form).on('click', () => {
      $form.off('click');
      vis ? hide($menu, $form) : show($menu, $form);
      for (var i = 0; i < $inputs.length; i++) {
        vis ? $inputs.eq(i).slideUp() : $inputs.eq(i).slideDown();
        vis ? $bars.eq(i).animate({'width':'2.8vw'}) : $bars.eq(i).animate({'width': '15vw'});
      }
      vis ? $submit.slideUp() : $submit.slideDown();
      vis = !vis;
    })
  };


  vis = !vis;

});



function hide(menu, form) {
  let left_c = $('body').width()/2 - (form.width()/5.35714286)/2;
  menu.animate({'height': '8vh'});
  menu.removeClass('init');
  form.animate({left: ~left_c });
}

function show(menu, form) {
  menu.animate({'height': '80vh'});
  form.animate({left: 0});
}

// function toggleMenu(vis) {
//   if (vis) {
//     menu.animate({'height': '8vh'});
//     menu.removeClass('init');
//   }
//   else {
//     menu.animate({'height': '80vh'});
//   }
// }
//
// function toggleForm(vis) {
//   if (vis) {
//     let left_c = $('body').width()/2 - (form.width()/5.35714286)/2;
//     form.animate({left: ~left_c });
//     $inputs.eq(i).slideUp();
//     $bars.eq(i).animate({'width':'2.8vw'});
//   }
//   else {
//     form.animate({left: 0});
//     $inputs.eq(i).slideDown();
//     $bars.eq(i).animate({'width': '15vw'});
//   }
// }
