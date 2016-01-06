//function getTheJSON(urlText) {
//    var data;
//
//    var request = new XMLHttpRequest();
//
//    request.timeout = 5000;
//
//    request.ontimeout = function () {
//        console.log("Timeout of " + (request.timeout / 1000).toString() + "sec exceeded");
//    };
//
//    request.onload = function () {
//        if (request.status >= 200 && request.status < 400) {
//
//            try {
//                data = json.list[locationId].parse(request.responseText);
//            } catch (e) {
//                console.log("Incorrect JSON data received. Parse error: " + e.message);
//            }
//        } else {
//            console.log("Server returned an onload error:" + request.status + " : " + request.statusText);
//        }
//    };
//
//    request.onerror = function () {
//        console.log("Server returned an error:" + request.status + " : " + request.statusText);
//    };
//
//    request.open('GET', urlText.toString(), true);
//
//    request.setRequestHeader('Content-Type', 'application/json');
//    //request.setRequestHeader('Accept-Encoding', 'gzip, deflate');//for narodmon
//    request.setRequestHeader('Cache-Control', 'no-cache');
//
//    request.send();
//
//
//    return data;
//
////            console.log(data.error);
//
//
//}


//var jsonOWMDesc = {
//
//        coord: {
//            lon: "Weather geo location, longitude",
//            lat: "Weather geo location, latitude"
//        },
//
//        weather: {
//            id: "Weather condition id",
//            main: "Group of weather parameters (Rain, Snow, Extreme etc_)",
//            description: "Weather condition within the group",
//            icon: "Weather icon id"
//        },
//
//        base: "Internal parameter",
//
//        main: {
//            temp: "Temperature",
//            pressure: "Atmospheric pressure", //(on the sea level, if there is no sea_level or grnd_level data), hPa",
//            humidity: "Humidity",
//
//            temp_min: "Minimum temperature at the moment_ ",
//            temp_max: "Maximum temperature at the moment_ ",
//            sea_level: "Atmospheric pressure on the sea level, hPa",
//            grnd_level: "Atmospheric pressure on the ground level, hPa"
//        },
//
//        wind: {
//            "speed": "Wind speed_ Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour_",
//            "deg": "Wind direction, degrees (meteorological)"
//        },
//
//
//        clouds: {
//            "all": "Cloudiness, %"
//        },
//
//        rain: {
//            "3h": "Rain volume for the last 3 hours"
//        },
//
//        snow: {
//            "3h": "Snow volume for the last 3 hours"
//        },
//
//        dt: "Time of data calculation, unix, UTC",
//
//        sys: {
//            type: "Internal parameter",
//            id: "Internal parameter",
//            message: "Internal parameter",
//            country: "Country code",
//            sunrise: "Sunrise time, unix, UTC",
//            sunset: "Sunset time, unix, UTC"
//        },
//
//        id: "City ID",
//        name: "City name",
//        cod: "Internal parameter"
//    },

    //imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'],

    var langId = 0,
    locationId = 0,
    unitId = 0,
    localization = {
        locationHeader: ["Weather geo location: ", "Точка определения погоды: "],
        locationLonDesc: ["Geo longitude", "Географическая долгота"],
        locationLatDesc: ["Geo latitude", "Географическая широта"],
        pressureDesc:["Atmospheric pressure","Атмосфероное давление"],
        temperatureDesc:["Air temperature","Температура воздуха"],
        humidityDesc:["Air humidity","Влажность воздуха"],
        pressUnitCap: [" hPa", " гПа"],
        tempUnitCap: [" C", " K"],
        langJson: ["en", "ru"],
        unitsJson: ["metric", "imperial"]
    };

function getWeatherIcon(weatherIcon) {
    return "http://openweathermap.org/img/w/" + weatherIcon + ".png"
}

function getWeather(pos) {
    var json, apiKey = "9810b9f35c8f7b1ee6ae08d2d6f49e06";

    var crd = pos.coords;

//                        console.log('Your current position is:');
//                        console.log('Latitude : ' + crd.latitude);
//                        console.log('Longitude: ' + crd.longitude);
//                        console.log('More or less ' + crd.accuracy + ' meters.');

    var httpText = "http://api.openweathermap.org/data/2.5/find?"
        + "units=" + localization.unitsJson[unitId]
        + "&lang=" + localization.langJson[langId]
        + "&lat=" + (Math.round(crd.latitude * 100) / 100).toString()
        + "&lon=" + (Math.round(crd.longitude * 100) / 100).toString()
        + "&cnt=3"
        + "&appid=" + apiKey;//2de143494c0b295cca9337e1e96b00e0
    console.log("httpText:" + httpText);

    $.getJSON(httpText, function (json) {

        console.log(json);

        document.getElementById('id_listMain').innerHTML = "";

        showWeatherTitle(localization.locationHeader[langId], json.list[locationId].name);

        showWeatherList(json.list[locationId].coord.lon, localization.locationLonDesc[langId]);
        showWeatherList(json.list[locationId].coord.lat, localization.locationLatDesc[langId]);

        showWeatherList("<img src=\"" + getWeatherIcon(json.list[locationId].weather[0].icon) + "\">", json.list[locationId].weather[0].description);

        showWeatherList(json.list[locationId].main.temp + "&deg;" + localization.tempUnitCap[unitId], localization.temperatureDesc[langId]);
        showWeatherList(json.list[locationId].main.pressure + localization.pressUnitCap[langId], localization.pressureDesc[langId]);
        showWeatherList(json.list[locationId].main.humidity + " %", localization.humidityDesc[langId]);

        //showWeatherList(json.list[locationId].sys.country, jsonOWMDesc.sys.country);
        //showWeather(json.list[locationId].name, jsonOWMDesc.name);

        document.getElementById("id_spanLocation0").innerHTML = json.list[0].name;
        document.getElementById("id_spanLocation1").innerHTML = json.list[1].name;
        document.getElementById("id_spanLocation2").innerHTML = json.list[2].name;
    });
}


function showWeatherTitle(header, name) {
    document.getElementById("id_spanLocationName").innerHTML = name;
    document.getElementById("id_spanLocationHeader").innerHTML = header;
}

function showWeatherList(itemKey, itemValue) {

    var newLi = document.createElement("li");

    newLi.innerHTML = itemKey + "<span>" + itemValue + "</span>";

    document.getElementById('id_listMain').appendChild(newLi);

}

function getCoordinates() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 75000
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, error, options);
    } else {
        showWeatherTitle("Geolocation not supported");
    }


}

//function getCoordinatesNM(){
//    //http://narodmon.ru/api?cmd=sensorsNearby&lat=55.75&lng=37.62&radius=2&types=1,2&uuid=UUID&api_key=API_KEY&lang=en
//}

$(document).ready(function () {
    //todo get country&units from BOM
    //todo get weather from narodmon++change view of location/cities list: add list of parameters/abilities

    //showWeatherList("value", "desc");

    getCoordinates();

    $('#id_btnMetric').on("click", function () {
        unitId = 0;//todo fix scope
        getCoordinates();
        $('#id_btnMetric').addClass('active');
        $('#id_btnImperial').removeClass('active');
    });

    $("#id_btnImperial").on("click", function () {
        unitId = 1;
        getCoordinates();
        $('#id_btnMetric').removeClass('active');
        $('#id_btnImperial').addClass('active');
    });


    $("#id_btnEn").on("click", function () {
        langId = 0;
        getCoordinates();
        $('#id_btnRu').removeClass('active');
        $('#id_btnEn').addClass('active');
    });

    $("#id_btnRu").on("click", function () {
        langId = 1;
        getCoordinates();
        $('#id_btnEn').removeClass('active');
        $('#id_btnRu').addClass('active');
    });


    $("#id_btnLocation0").on("click", function () {
        locationId = 0;
        getCoordinates();
        $('#id_btnLocation0').addClass('active');
        $('#id_btnLocation1').removeClass('active');
        $('#id_btnLocation2').removeClass('active');
    });
    $("#id_btnLocation1").on("click", function () {
        locationId = 1;
        getCoordinates();
        $('#id_btnLocation0').removeClass('active');
        $('#id_btnLocation1').addClass('active');
        $('#id_btnLocation2').removeClass('active');
    });
    $("#id_btnLocation2").on("click", function () {
        locationId = 2;
        getCoordinates();
        $('#id_btnLocation0').removeClass('active');
        $('#id_btnLocation1').removeClass('active');
        $('#id_btnLocation2').addClass('active');
    });
});