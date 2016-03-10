var $temp = $('#temp');
var $input = $('#input');
var today = moment().format("[today] h:mm a");
var apiVal;
var $weatherDeets = $('#weatherDetails');
var $back = $('#back');

$('#click').on("click", function(){
  apiVal = $('#state').val() + "/" + $('#city').val() + "/" + $('#zip').val() + ".json";
  weatherUnderG(apiVal);
});

// background rotation
function backgrounds() {
	$('#slideshow').cycle({
	fx: 'fade',
	pager: '#smallnav',
	pause:   1,
	speed: 2500,
	timeout:  3500
	});
}

backgrounds();

// WeatherUnderground API
function weatherUnderG(apiVal) {
  $.ajax({
    method: "GET",
    dataType: 'jsonp',
    url: "http://api.wunderground.com/api/a23692177cc6bae1/conditions/q/" + apiVal
  })
  .done(function(info) {

    var userCoords = (function(){
      var wugSplit = (info.current_observation.ob_url).split("=");
      var forecastAPI = "https://api.forecast.io/forecast/ec4ea27eb974f4bdcd500583b2c49367/" + wugSplit[1];
      return forecastAPI;
    })(info.current_observation.ob_url);

    displayForecast(info);
    rowWeather(userCoords);

   })
  .fail(function(err){
    console.log("FAIL");
    console.log(err);
  });
}

function rowWeather(string){
  $.ajax({
    method: "GET",
    dataType: "jsonp",
    url: string
  })
  .done(function(info) {
    console.log(info);
  })
  .fail(function(err){
    console.log(err);
  });
}

// Dashboard
function displayForecast(info) {
    $input.empty();

    $('section .col-md-2').addClass('bgFade');
    $('#slideshow').removeClass('landingBlur');
    $('#slideshow div').addClass('testBgFx');

    var more = '<h3 id="calendar"><i id="more" class="fa fa-calendar-plus-o"></i></h3>'
    var temp = info.current_observation.temp_f + '\u00B0' + more;

    $temp.append(temp);


    $('#more').on('click', function(){
      $('#weatherDetails').slideDown();
      $temp.slideUp();
    });

    $back.on('click', function(){
      $temp.slideDown();
      $weatherDeets.slideUp();
    });
    // $test.append(info.currently.icon);
    // $summary.append('<div>'+ today +'</div>');
    // $summary.append('<div>'+ current_observation.temp_f +'</div>');

    // static code for style testing
    // var temp = "47" + '\u00B0';
    // $temp.append(temp);
    // $summary.append('<div>'+ today +'</div>');
    // $summary.append('<div> It"s cold out!</div>');
    // $test.append(info.currently.icon);
}


function bgWeatherFX() {
  // if (conditions = "rain" {
  //   $('#slideshow div').addClass('rainFilter');
  // } else if (conditions = "clear"){
  //   $('#slideshow div').addClass('clearFilter');
  // } else if (conditions = "snow" ){
  //   $('#slideshow div').addClass('snowFilter');
  // } else if (conditions = "fog"){
  //   $('#slideshow div').addClass('fogFilter');
  // } else if (conditions = "partly-cloudy"){
  //   $('#slideshow div').addClass('cloudyFilter');
  // } else if (conditions = "cloudy"){
  //   $('#slideshow div').addClass('overcastFilter');
  // }

  $('#slideshow div').addClass('testBgFx');
}
