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

  
  //Draw time
  // Current date/time
  var d = new Date();
  // Set the text color
  ctx.fillStyle = 'white';
  // Center align the text
  ctx.textAlign = 'center';
 // ctx.font = '18px Gothic';
  // Display the time, in the middle of the screen
  ctx.fillText(d.toLocaleTimeString(), w / 2, h / 2, w); 
 
  
  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (weather) {
    drawWeather(ctx, weather);
  }

});

//Handle app time
rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});


rocky.on('secondchange', function(event) {
  // Display a message in the system logs
  console.log("Hello world. Another minute with your Pebble!");

  //Invalidate current UI
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
  
  rocky.postMessage({'fetch': true});
});

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


function drawWeather(ctx, weather) {
  // Create a string describing the weather
  var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  // Draw the text, top center
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  ctx.fillText(weatherString, ctx.canvas.unobstructedWidth / 2, 2);
}

