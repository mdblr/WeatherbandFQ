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
    tempPeaksHTML = [],
    iconsHTML = [];

    for (let i = 0; i < 7; i++) {
      iconsHTML.push(`<div class='icon c'><i class='wi wi-forecast-io-${oneWeek.icons[i]}'></i></div>`);
      tempPeaksHTML.push(`<div class='nixie-one f1'>${oneWeek.maxTempF[i]}/${oneWeek.minTempF[i]}</div>`);
    }

    return {
      sumStr,
      tempPeaksHTML,
      iconsHTML
    }

  }

  function nightlyLunation() {
    for (let i = 0; i < 7; i++) {
      iconHTML.push(`<div class='icon c'><i class='wi wi-forecast-io-${data.icons[i]}'></i></div>`);
      lunation.push(data.nightlyLunation[i]);
    }
  }

  function showMore(subView) {
    let html = [],
        count = 0;

    html.push(`<section id='weekly' class='c page nixie-one f1'>${subView.sumStr}</section>`);
    html.push(`<section id='weekly' class='c page nixie-one f1'>${subView.tempPeaksHTML}</section>`);
    html.push(`<section id='dailyIcons' class='page f1'>${subView.iconsHTML}</section>`);

    return function() {
      if (count > html.length) return;
      $('#views').append(html[count]);
      count++;
    }
  }
})();
