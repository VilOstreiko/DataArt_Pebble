/**
DataArt Workshop
Pebble Watches
Dmitry Sherbina
**/

var rocky = require('rocky');

// Global object to store weather data
var weather;

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

   // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = '#00FF00';
  // Center align the text
  ctx.textAlign = 'center';
  //Hello world
//   ctx.fillText('Hello from\n DataArt', w / 2, 20, w); 


  
  //Draw time
  // Current date/time
  var d = new Date();
  // Set the text color
  ctx.fillStyle = '#00AAFF';
  // Center align the text
  ctx.textAlign = 'center';
  ctx.font = '28px Gothic';
  // Display the time, in the middle of the screen
  var verticalTextOffset = -60;
  ctx.fillText(d.toLocaleTimeString(), w / 2, h / 2 + verticalTextOffset, w); 
  
  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (weather) {
    drawWeather(ctx, weather);
  }

});

//Handle app time

rocky.on('secondchange', function(event) {

  //Invalidate current UI
//   console.log("Another second with your Pebble!");
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();

});


rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  // console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  //rocky.requestDraw();
//   rocky.postMessage({'fetch': true});
});

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
 rocky.postMessage({'fetch': true});
});

function drawWeather(ctx, weather) {
  var vertOffset = 100;
  // Create a string describing the weather
  ctx.fillStyle = 'lightblue';
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  
  for(var key in weather.celcius){
    var weatherString = weather.celcius[key] + 'ºC, ' + weather.desc[key];
    ctx.fillText(key + ': ' + weatherString, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - vertOffset);
    vertOffset -= 20;
    }
//   var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  
  // Draw the text, top center
//   ctx.fillStyle = 'lightblue';
//   ctx.textAlign = 'center';
//   ctx.font = '18px Gothic';
//   ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - 80);
  
  var weatherPlace = weather.place;
  
  ctx.fillStyle = '#FFFF55';
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  ctx.fillText(weatherPlace, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - vertOffset);
  
//   var weatherWind = weather.wind;
//   var weatherRain = weather.rain ? 'Take umbrella' : 'No umbrella need';
    
//   ctx.fillStyle = '#AA00AA';
//   ctx.textAlign = 'center';
//   ctx.font = '18px Gothic';
//   ctx.fillText('Wind speed: ' + weatherWind, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - 40);
  
//   ctx.fillStyle = '#AA00AA';
//   ctx.textAlign = 'center';
//   ctx.font = '18px Gothic';
  
//   ctx.fillText(weatherRain, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - 20);

}

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.weather) {
    // Save the weather data
    weather = message.weather;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});


// city color change to more visible one 