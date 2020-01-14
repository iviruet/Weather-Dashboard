/////get updated time
$(document).ready(function(){
    const now= moment().format("MMMM Do YYYY");

//////api key
var api_key = "8bd81fce793fc3c6e663d14e65e880f3"   
$("button").on("click", function(){

    var city =$(this).attr("");
    var queryUrl ="https://openweathermap.org/city?q=" +
    city + api_key + "=5";
//////ajax call to weather api 
    $.ajax({
    url: queryUrl,
    method: "GET"
})
/////storing data into "response"
.then(function(response){

////console logging
console.log(queryUrl);
console.log(response);

/////transferring content to HTML
$(".city").html("<h1>" + response.name + " Weather Details</h1>");
$(".wind").text("Wind Speed: " + response.wind.speed);
$(".humidity").text("<ht>" + response.main.humidity);
$(".temp").text("<ht>" + response.main.temp);

////////temp converter (K) to (F)
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);

//////console logging
console.log("Wind Speed: " + response.wind.speed);
console.log("Humidity: " + response.main.humidity);
console.log("Temperature (F): " + response.main.temp);

});
});