var $temp = $('#temp');
var $summary = $('#summary');
var $input = $('#input');
var today = moment().format("[today] h:mm a");
var apiVal;

$('#click').on("click", function(){
  apiVal = $('#state').val() + "/" + $('#city').val() + "/" + $('#zip').val() + ".json";
  weatherUnderG(apiVal);
});





// Dashboard
function displayForecast(info) {
    $input.empty();
    var temp = info.current_observation.temp_f + '\u00B0';
    $temp.append(temp);
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

// WeatherUnderground API
function weatherUnderG(apiVal) {
  $.ajax({
    method: "GET",
    dataType: 'jsonp',
    url: "http://api.wunderground.com/api/a23692177cc6bae1/conditions/q/" + apiVal
  })
  .done(function(info) {
      console.log("DONE");
      console.log(info);
    //write all my code that relies on the response data
      displayForecast(info);
   })
  .fail(function(err){
    console.log("FAIL");
    console.log(err);
  });
}

// background rotation
function backgrounds() {
	$('#slideshow').cycle({
	fx: 'fade',
	pager: '#smallnav',
	pause:   1,
	speed: 1000,
	timeout:  3500
	});
}
backgrounds();
