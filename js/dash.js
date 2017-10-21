import $ from 'jquery';
import * as forecast from './forecast.js';

function viewOne(data) {
  const $views = $('#views');

  $views.html(
    `<div id='viewOne' class='center rel page'>
      <div id='loc' class='nixie-one f2'>${forecast.getLocData()}</div>
      <div id='current' class='dosis'>${data}\u00B0</div>
    </div>`
  );
  $views.animate({'top': '0'});
}

function stageSubViews(data) {
  const html = dailyBasics(data);
  let pagination = showMore(html);

  rmPriorContent();

  $('#views').append('<div><a id="more" class="nixie-one">More</a></div>')
  $('#more').click(() => { pagination(); });

}

function dailyBasics(oneWeek) {
  let sumStr = oneWeek.dailySum,
      dailyDetails = [],
      viewTwo = '';

  for (let i = 0; i < 7; i++) {
    dailyDetails.push(
      `<section class='c day'>
        <div class='dailyIcons f2'><i class='wi wi-forecast-io-${oneWeek.icons[i]}'></i></div>
        <div class='f1 highLow dosis'>${oneWeek.maxTempF[i]}\u00B0/${oneWeek.minTempF[i]}\u00B0</div>
      </section>`
    );
  }

  viewTwo +=
    `<section id='viewTwo' class='page nixie-one fwrap'>
      <div id='description' class='f1'>${sumStr}</div>
      <div id='summary' class='r'>${dailyDetails.join('')}</div>
    </section>`

  return viewTwo
}

function showMore(subView) {
  let html = [],
      count = 0;

  html.push(subView);

  return function() {
    $('#views').append(html[count]);
    count++;
    if (count === html.length) $('#more').detach();
  }
}

function rmPriorContent() {
  if ($('#more').is(':visible')) {
    $('#more').detach();
  }
  $('#viewTwo').detach();
}

function nightlyLunation() {
  for (let i = 0; i < 7; i++) {
    lunation.push(data.nightlyLunation[i]);
  }
}

export { viewOne, stageSubViews }
