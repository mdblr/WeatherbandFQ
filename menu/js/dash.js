const dash = (() => {

  return {
    set,
    // reset
  }

  function set(data) {
    const $temp = $('#temp')
    $temp.text(`${data.currently.temperature}\u00B0`);
  }


  // function reset() {}
})();
