const form = (() => {
  return {
    getValues
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

})();
