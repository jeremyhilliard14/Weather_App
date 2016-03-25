$(document).ready(function(){

	var apiKey = 'a65a961579679be19290d773070d466d';
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q={Atlanta}&units=Imperial&APPID=' + apiKey;
	
	$.getJSON(weatherURL, function(weatherData){
		//console.log(weatherData);

		//We want the temperature for starters/  The temperature in their JSON is at:
		//weatherData.main.temp
		var currTemp = weatherData.main.temp;
		//console.log(currTemp);

		var canvas = $('#current-temp');
		var context = canvas[0].getContext('2d');

		//console.log(context);



		// var searchMovie = baseUrl + 'search/movie' + apiKey + '&query=' + input;
		


		//Set up our circle and styling.
		//Set up our color based on temp:  colder = more blue, hot = more red
		var currPerc = 0;

		var shadeColor;
		if(currTemp < 32){
			shadeColor = '#D4F0FF';
		}else if((currTemp >= 32) && (currTemp < 59)){
			shadeColor = '#129793';
		}else if((currTemp >= 59) && (currTemp < 75)){
			shadeColor = '#7cfc00';
		}else if((currTemp >= 75) && (currTemp < 99)){
			shadeColor = '#ff6600';
		}else{
			shadeColor = '#e3170d';
		}



		//set up an animate function
		//update the appropriate variables

	function animate(current){
		//draw inner circle
		context.fillStyle = '#ccc';
		context.beginPath();
		context.arc(155,75,65,0,2*Math.PI);
		context.closePath();
		context.fill();

		//draw the outer arc/line
			//set the line width 
		context.lineWidth = 10;
			//set the line color
		context.strokeStyle = shadeColor;
		context.beginPath();
		//center of cirle is at 155, 75
		//radius is70px
		//start the draw at Math.PI/1.5
		//draw to the full circle * percent we are at and add 1.5 PI so we start at 12oclock
		context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
		//draw
		context.stroke();

		//set the font of our temp
		context.font = '48px Myriad Pro';
		//set the color of the font
		context.fillStyle = '#0000ff';
		//
		context.textBaseline = 'top';
		context.fillText(currTemp, 175-70, (85-70)*3);
		currPerc++;
		if(currPerc < currTemp){
			requestAnimationFrame(function(){
				animate(currPerc / 100)
			});
		}

	}

	animate();

	});

	$('#zip-search').submit(function(event){
			var userSearch = $('#user-zip').val(); 
			console.log(userSearch);
			var searchURL = 'http://api.openweathermap.org/data/2.5/weather?zip={' + userSearch + '},{us}&units=Imperial&appid=' + apiKey;

			$.getJSON(searchURL, function(weatherData){
				console.log(weatherData);

				var currTemp = weatherData.main.temp;
		//console.log(currTemp);

			var canvas = $('#current-temp');
			var context = canvas[0].getContext('2d');

		//console.log(context);



		// var searchMovie = baseUrl + 'search/movie' + apiKey + '&query=' + input;
		


		//Set up our circle and styling.
		//Set up our color based on temp:  colder = more blue, hot = more red
			var currPerc = 0;

			var shadeColor;
			if(currTemp < 32){
				shadeColor = '#D4F0FF';
			}else if((currTemp >= 32) && (currTemp < 59)){
				shadeColor = '#129793';
			}else if((currTemp >= 59) && (currTemp < 75)){
				shadeColor = '#7cfc00';
			}else if((currTemp >= 75) && (currTemp < 99)){
				shadeColor = '#ff6600';
			}else{
				shadeColor = '#e3170d';
			}



		//set up an animate function
		//update the appropriate variables

		function animate(current){
		//draw inner circle
			context.fillStyle = '#ccc';
			context.beginPath();
			context.arc(155,75,65,0,2*Math.PI);
			context.closePath();
			context.fill();

		//draw the outer arc/line
			//set the line width 
			context.lineWidth = 10;
			//set the line color
			context.strokeStyle = shadeColor;
			context.beginPath();
		//center of cirle is at 155, 75
		//radius is70px
		//start the draw at Math.PI/1.5
		//draw to the full circle * percent we are at and add 1.5 PI so we start at 12oclock
			context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5);
		//draw
			context.stroke();

		//set the font of our temp
			context.font = '48px Myriad Pro';
		//set the color of the font
			context.fillStyle = '#0000ff';
		//
			context.textBaseline = 'top';
			context.fillText(currTemp, 175-70, (85-70)*3);
			currPerc++;
			if(currPerc < currTemp){
				requestAnimationFrame(function(){
					animate(currPerc / 100)
				});
			}

		}

		animate();
		});
		event.preventDefault();
	});
});