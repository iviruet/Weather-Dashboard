/////get updated time
// $(document).ready(function(){
    const now= moment().format("(M/D/YYYY)");


///////saving cities to local storage
var cityName =document.querySelector("#city-input");
var cityButton =document.querySelector("find-city");  
var pastCities =document.querySelector("past-cities");

// renderLastRegistered();

// function renderLastRegistered() {

//     document.getElementById("past-cities").innerHTML + "<br/>";

/////new li for each input
// for(var i = 0; i <pastCities.length; i++){
//     var pastSearch = pastCities[i];

//     var li = document.createElement("li");
//     li.textContent = pastSearch;
//     li.setAttribute("data-index", i);

//     pastCities.prepend(li);
// }
//   localStorage.setItem("city-input");
//   cityButton.addEventListener("click", function(event) {
//     event.preventDefault();
  
// });
// };

//////api key
var api_key = "8bd81fce793fc3c6e663d14e65e880f3"   
$(".fa-search").on("click", function(event){
event.preventDefault();

    var city =$("#city-input").val();
    var queryUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;

    $.ajax({
    url: queryUrl,
    method: "GET"
    })

/////storing data into "response"
.then(function(response){

////console logging
console.log(queryUrl);
console.log(response);

$("#city").text(JSON.stringify(response));

/////transferring content to HTML
$("#city").html("<h2>" + response.name + now + "</h2>");
$("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
$("#humidity").text("Humidity: " + response.main.humidity + "%");
$("#temp").text("Temperature: " + response.main.temp);
$("#uv").text("UV Index: " + response.sys.type);

////////temp converter (K) to (F)
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (K)" + tempF);

//////console logging
console.log("Wind Speed: " + response.wind.speed);
console.log("Humidity: " + response.main.humidity);
console.log("Temperature (F): " + response.main.temp);
});
});
// };
