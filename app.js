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
    weatherIcon(info.currently.icon);
  })
  .fail(function(err){
    console.log(err);
  });
}

// User's Weather
function displayForecast(info) {
    $input.empty();

    $('section .col-md-4').addClass('bgFade2');
    $('#slideshow').removeClass('landingBlur');
    // var more = '<h3 id="calendar"><i id="more" class="fa fa-calendar-plus-o"></i></h3>'
    var temp = '<div id="usersWeather">' + info.current_observation.temp_f + '\u00B0 </div>';
    // + more;

    $temp.append(temp);
    // $temp.append(temp);

    // $('#more').on('click', function(){
    //   $('#weatherDetails').slideDown();
    //   $temp.slideUp();
    // });
    //
    // $back.on('click', function(){
    //   $temp.slideDown();
    //   $weatherDeets.slideUp();
    // });
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
  } else if (conditions === "partly-cloudy-day"){
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
    $('#usersWeather').animate({left: "+=10px"},100,function(){$temp.prepend('<i class="wi wi-day-cloudy"></i>');}); console.log('done');
  } else if (conditions === "partly-cloudy-night"){
    $('#usersWeather').animate({left: "+=10px"},100,function(){$temp.prepend('<i class="wi wi-night-partly-cloudy"></i>');}); console.log('done');
  } else if (conditions === "cloudy"){
    $temp.prepend('<i class="wi wi-cloudy"></i>');
  } else {
    $temp.prepend('<i class="wi wi-thermometer-exterior"></i>');
  }
}
