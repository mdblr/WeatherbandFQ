var $temp = $('#temp');
var $summary = $('#summary');
var today = moment().format("[today] hA");;



// Dashboard
function displayForecast(info) {
    var temp = Math.floor(info.hourly.data[0].temperature) + '\u00B0';
    $temp.append(temp);
    // $test.append(info.currently.icon);
    $summary.append('<div>'+ today +'</div>');
    $summary.append('<div>'+ info.hourly.data[0].summary +'</div>');

}

// HTML5 Geolocation

function userCoords() {
  if (!navigator.geolocation) {
    $temp.append('<div> Please enable access to your location or switch to a modern browser</div>');
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // Forecast.io call
    $.ajax({
      method: "GET",
      dataType: 'jsonp',
      url: "https://api.forecast.io/forecast/ec4ea27eb974f4bdcd500583b2c49367/" +
      latitude + "," + longitude
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

  };

  function error(info){
    console.log(info);
    $temp.append('<div> Something went wrong ): </div>');
  };

  navigator.geolocation.getCurrentPosition(success, error);
}

userCoords();
