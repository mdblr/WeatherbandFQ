var $temp = $('#temp');
var $input = $('#input');
var today = moment().format("[today] h:mm a");
var apiVal;
var $weatherDeets = $('#weatherDetails');
var $back = $('#back');
var temp, summary;
var $reset = $('#reset');


$('#click').on("click", function(){
  apiVal = $('#state').val() + "/" + $('#city').val() + "/" + $('#zip').val() + ".json";
  $('#slideshow').removeClass('landingBlur');
  // $('#creds').fadeOut();
  weatherUnderG(apiVal);
});

$reset.on("click", function(){
  reset();
});

// background rotation
function backgrounds() {
	$('#slideshow').cycle({
	fx: 'fade',
	pager: '#smallnav',
	pause:   0,
	speed: 3500,
	timeout:  3500
	});
}

$('document').ready(function(){
  backgrounds();
});


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
    rowWeather(userCoords);
    displayForecast(info);
   })
  .fail(function(err){
    console.log("FAIL");
    console.log(err);
  });
}

//forecastIO call
function rowWeather(string){
  $.ajax({
    method: "GET",
    dataType: "jsonp",
    url: string
  })
  .done(function(info) {
    console.log(info);
    bgWeatherFX(info.currently.icon);
    summary = info.daily.summary;
    weatherIcon(info.currently.icon);
  })
  .fail(function(err){
    console.log(err);
  });
}

// User's Weather
function displayForecast(info) {
    temp =  info.current_observation.temp_f + '\u00B0';
    $.when($input.fadeOut(320)).then(function(){
      $('#background').addClass('bgFade2');
      $('#background').fadeIn();

    });
}

function bgWeatherFX(conditions) {
  if (conditions === "rain") {
    $('#slideshow div').addClass('rain');
  } else if (conditions === "clear-day"){
    $('#slideshow div').addClass('clear');
  } else if (conditions === "snow"){
    $('#slideshow div').addClass('snow');
  } else if (conditions === "fog"){
    $('#slideshow div').addClass('fog');
  } else if (conditions === "partly-cloudy-day") {
    $('#slideshow div').addClass('partlyCloudy');
  } else if (conditions === "cloudy"){
    $('#slideshow div').addClass('cloudy');
  }
}

function weatherIcon(conditions) {

  if (conditions === "clear-day") {
    $temp.prepend('<i class="wi wi-day-sunny"></i>');
  } else if (conditions === "clear-night"){
    $temp.prepend('<i class="wi wi-night-clear"></i>');
  } else if (conditions === "rain"){
    $temp.prepend('<i class="wi wi-rain"></i>');
  } else if (conditions === "snow"){
    $temp.prepend('<i class="wi wi-snow"></i>');
  } else if (conditions === "sleet"){
    $temp.prepend('<i class="wi wi-sleet"></i>');
  } else if (conditions === "wind"){
    $temp.prepend('<i class="wi wi-strong-wind"></i>');
  } else if (conditions === "fog"){
    $temp.prepend('<i class="wi wi-fog"></i>');
  } else if (conditions === "partly-cloudy-day"){
    $temp.prepend('<i class="wi wi-day-cloudy"></i>');
  } else if (conditions === "partly-cloudy-night"){
    $temp.prepend('<i class="wi wi-night-partly-cloudy"></i>');
  } else if (conditions === "cloudy"){
    $temp.prepend('<i class="wi wi-cloudy"></i>');
  } else {
    $temp.prepend('<i class="wi wi-thermometer-exterior"></i>');
  }
  $temp.append(temp);
  $temp.fadeIn(400);
  $('summary').append(summary);
  $reset.fadeIn(200);
  $('footer').fadeIn(400);

}

function reset(){
  $('footer').toggle();
  $temp.empty();
  $('summary').empty();
  $('#background').removeClass('bgFade2');
  $input.slideDown();
}
