const dash = (() => {

  return {
    set
  }

  function set(data) {
    const $current = $('#current'),
          $views = $('#views');
    $current.text(`${data.currently.temperature}\u00B0`);
    $views.animate({'top': '0'});
  }

})();
