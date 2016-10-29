/**
DataArt IT Talk
Dmitry Sherbina
**/
// PebbleKit JS (pkjs)

var myAPIKey = 'db6e8b809ff42855de357c37716aec64';


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
      
//        Dnepr API search 
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
            'fullresponse':weatherData
          }
        });
      });
    }, function(err) {
      console.error('Error getting location');
    },
    { timeout: 15000, maximumAge: 60000 });
  }
});

/*
{"coord":{"lon":139,"lat":35},
"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
"wind":{"speed":7.31,"deg":187.002},
"rain":{"3h":0},
"clouds":{"all":92},
"dt":1369824698,
"id":1851632,
"name":"Shuzenji",
"cod":200}
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