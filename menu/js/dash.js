const dash = (() => {

  return {
    viewOne,
    stageSubViews
  }

  function viewOne(data) {
    const $current = $('#current'),
          $views = $('#views');
    $current.text(`${data}\u00B0`);
    $views.animate({'top': '0'});
  }

  function stageSubViews(data) {
    const html = dailyBasics(data),
          pagination = showMore(html);

    $('#dash').append('<section><a id="more" class="nixie-one">More</a></section>');
    $('#more').click(() => {
      pagination();
    })
  }

  function dailyBasics(oneWeek) {
    let sumStr = oneWeek.dailySum
        dailyDetails = [],
        viewTwo = '';

    for (let i = 0; i < 7; i++) {
      dailyDetails.push(
        `<section class='c'>
          <div class='dailyIcons f2'><i class='wi wi-forecast-io-${oneWeek.icons[i]}'></i></div>
          <div class='f1 highLows'>${oneWeek.maxTempF[i]}/${oneWeek.minTempF[i]}</div>
        </section>`
      );
    }

    viewTwo +=
      `<section class='page nixie-one'>
        <div id='weekly' class='f1'>${sumStr}</div>
        <div class='r'>${dailyDetails.join('')}</div>
      </section>`

    return viewTwo
  }

  function nightlyLunation() {
    for (let i = 0; i < 7; i++) {
      lunation.push(data.nightlyLunation[i]);
    }
  }

  function showMore(subView) {
    let html = [],
        count = 0;

    html.push(subView);

    return function() {
      if (count > html.length) return;
      $('#views').append(html[count]);
      count++;
    }
  }
})();
