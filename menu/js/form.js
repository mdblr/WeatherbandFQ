const form = (() => {

  return {
    getValues,
    clear
  }

  function getValues($inputs) {
    let arr = [];
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs.eq(i).val().trim()) {
        arr.push($inputs.eq(i).val());
      }
    }
    return arr;
  }

  function clear($inputs) {
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs.eq(i).val().trim()) {
        $inputs.eq(i).val('');
      }
    }
  }

})();
