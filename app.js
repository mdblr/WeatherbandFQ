$.ajax({
  method: "GET",
  dataType: 'jsonp',
  url: "https://api.forecast.io/forecast/ec4ea27eb974f4bdcd500583b2c49367/47.6302,-122.3461"
})
.done(function(info) {
    console.log("DONE")
    console.log(info)
  //write all my code that relies on the response data
 })
.fail(function(err){
  console.log("FAIL")
  console.log(err)
});
