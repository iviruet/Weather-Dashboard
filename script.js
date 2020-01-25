/////get updated time
$(document).ready(function () {
    const now = moment().format("(M/D/YYYY)");


    ///////saving cities to local storage
    var cityName = document.querySelector("#city-input");
    var cityButton = document.querySelector("#find-city");
    var pastCities = document.querySelector("#cities-list");

    var city = [];

    init();


    function renderLastRegistered() {
        pastCities.innerHTML = "";
        /////new li for each input
        for (var i = 0; i < city.length; i++) {
            var pastSearch = city[i];

            var li = document.createElement("li");
            li.textContent = pastSearch;
            li.setAttribute("data-index", i);

            pastCities.prepend(li);
        }
    }
    function init() {
        /////stringify cities in local storage
        var citiesString = localStorage.getItem("city");
        var storedCities = JSON.parse(citiesString);
        if (storedCities !== null) {

        }
        renderLastRegistered();
    }
    function storedCities() {
        var cityString = JSON.stringify(city);
        localStorage.setItem("city", cityString);
    }
    cityButton.addEventListener("click", function (event) {
        event.preventDefault();

        var citytext = cityName.value.trim();
        if (citytext === "") {
            return;
        }

        city.push(citytext);
        cityName.value = "";

        storedCities();
        renderLastRegistered();

    });
    // };

    // //////api key
    // var api_key = "8bd81fce793fc3c6e663d14e65e880f3"
    $(".fa-search").on("click", function (event) {
        event.preventDefault();

        var city = $("#city-input").val();
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8bd81fce793fc3c6e663d14e65e880f3";

        $.ajax({
            url: queryUrl,
            method: "GET"
        })

            /////storing data into "response"
            .then(function (response) {

                ////console logging
                //console.log(queryUrl);
                //console.log(response);

                $("#city").text(JSON.stringify(response));

                /////////get icon to show up
                // getIcon();

                /////transferring content to HTML
                $(".card-header").text(now);
                $("#city").html("<h2>" + response.name + now + response.weather.icon + "</h2>");
                $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#temp").text("Temperature: " + response.main.temp);
                $("#uv").text("UV Index: " + response.sys.type);

                ////////temp converter (K) to (F)
        
                
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                console.log(tempF);
                $("#temp").text("Temperature: " + Math.round(tempF));

                //////console logging
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + response.main.temp);
            });
        /////card ajax
        var queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast/&appid=8bd81fce793fc3c6e663d14e65e880f3&q=" + city;
        $.ajax({
            url: queryUrl2,
            method: "GET"
        })
            .then(function (response) {

                ////console logging
                console.log(queryUrl2);
                console.log(response);

                // $("#city").text(JSON.stringify(response));
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#temp").text("Temperature: " + response.main.temp);

            });
    });
});
//         function getIcon(response) {
//             var iconcode = response.weather[0].icon;
//             var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//             $("#wicon").attr("src", iconurl);
// }

