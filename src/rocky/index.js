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

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

//   ctx.fillStyle = 'green';
//   ctx.fillRect(0, 30, 144, 30);
  
  ctx.fillStyle = '#00FFAA';
  // Center align the text
  ctx.textAlign = 'center';
  //Hello world
  ctx.fillText('Hello from\n DataArt', w / 2, 10, w); 

  
  //Draw time
  // Current date/time
  var d = new Date();
  // Set the text color
  ctx.fillStyle = '#00AAFF';
  // Center align the text
  ctx.textAlign = 'center';
  ctx.font = '28px Gothic';
  // Display the time, in the middle of the screen
  var verticalTextOffset = -45;
  ctx.fillText(d.toLocaleTimeString(), w / 2, h / 2 + verticalTextOffset, w); 
  
  
  var day = d.getDate().toString();
  var month =  (d.getMonth() + 1).toString();
  var year = d.getUTCFullYear();
  
  var thisDate = day + '/' + month + '/' + year;
  ctx.fillStyle = 'lightblue';
  
   verticalTextOffset = -15;
  ctx.fillText(thisDate, w / 2, h / 2 + verticalTextOffset, w); 
  
  
  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (weather) {
    drawWeather(ctx, weather);
  }

});

//Handle app time

rocky.on('secondchange', function(event) {

  //Invalidate current UI
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();

});


rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  //rocky.requestDraw();
  
  rocky.postMessage({'fetch': true});
});

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});



function drawWeather(ctx, weather) {
  // Create a string describing the weather
  var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  // Draw the text, top center
  ctx.fillStyle = 'lightblue';
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - 60);
  
//     // Draw the text, top center
  var forecastString = 'Clouds ' + weather.fullresponse.clouds.all +  ', Wind ' +
      weather.fullresponse.wind.speed +  'm/s';
  ctx.fillText(forecastString, ctx.canvas.unobstructedWidth / 2,  ctx.canvas.unobstructedHeight - 41);
  
  var cityString = weather.place;
  // Draw City
  ctx.fillStyle = 'lightgreen';
  ctx.fillText(cityString, ctx.canvas.unobstructedWidth / 2 ,  ctx.canvas.unobstructedHeight - 22);
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
