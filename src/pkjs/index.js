/**
DataArt IT Talk
Dmitry Sherbina
**/
// PebbleKit JS (pkjs)

var myAPIKey = '3ea700000ffa8bba2ebefdf4913c0f96';


Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;

  if (message.fetch) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      
      
//       var url = 'http://api.openweathermap.org/data/2.5/weather' +
//               '?lat=' + pos.coords.latitude +
//               '&lon=' + pos.coords.longitude +
//               '&appid=' + myAPIKey;
      
      //Dneprs location 
//             var url = 'http://api.openweathermap.org/data/2.5/weather' +
//               '?lat=' + '35.046181' +
//               '&lon=' + '48.464717' +
//               '&appid=' + myAPIKey;
      
      // Dnepr API search       
         var url = 'http://api.openweathermap.org/data/2.5/weather' +
              '?q=' + 'Dnipropetrovsk, UA' +
              '&appid=' + myAPIKey;
      
      request(url, 'GET', function(respText) {
        var weatherData = JSON.parse(respText);

        //Sent message to rocky 
        Pebble.postMessage({
          'weather': {
            // Convert from Kelvin          
            'celcius': Math.round(weatherData.main.temp - 273.15),
            'fahrenheit': Math.round((weatherData.main.temp - 273.15) * 9 / 5 + 32),
            'desc': weatherData.weather[0].main,
            'place': weatherData.name,
            'fullresponse':weatherData,
            'wind': weatherData.wind.speed
//             'rain': weatherData.rain['3h'],
//             'sunset': weatherData.sys.sunset
            
          }
        });
        console.log(weatherData.city.name);
      });
    }, function(err) {
      console.error('Error getting location');
    },
    { timeout: 15000, maximumAge: 60000 });
  }
});

/*
{
  "coord": {
    "lon": 34.98,
    "lat": 48.45
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 278.387,
    "pressure": 1013.41,
    "humidity": 93,
    "temp_min": 278.387,
    "temp_max": 278.387,
    "sea_level": 1024.73,
    "grnd_level": 1013.41
  },
  "wind": {
    "speed": 5.71,
    "deg": 276
  },
  "clouds": {
    "all": 88
  },
  "dt": 1477760820,
  "sys": {
    "message": 0.029,
    "country": "UA",
    "sunrise": 1477714966,
    "sunset": 1477751037
  },
  "id": 709930,
  "name": "Dnipropetrovsk",
  "cod": 200
}
*/

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    // HTTP 4xx-5xx are errors:
    if (xhr.status >= 400 && xhr.status < 600) {
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}