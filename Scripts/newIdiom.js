var imported = document.createElement('script');
imported.src = '../build/defiant.js-master/src/defiant.js';
document.head.appendChild(imported);

var button_list = ['ageavg', 'dollarshouravg', 'salaryavg', 'workweekhrsavg', 'yearscodeavg', 'tusers'];
var averagesData;
var button = 'tusers';
var window_width;
var window_height;
var max_value = 1000;
var main_value = 300;

function setup(new_window_width, new_window_height, idiom_values){
	// create svg element
	window_width = new_window_width;
	window_height = new_window_height;

	max_value = idiom_values[0];
	main_value = idiom_values[1];

	let canvas_width = window_width * 325/1626;
	let max_canvas_height = window_height * 243.5 / 858;
	let canvas_height = window_height * (main_value*max_canvas_height/max_value) / 858;

	d3.select('#vertical_axis').selectAll('svg').remove();


	var svg = d3.select("#vertical_axis")
		.append("svg")
		.attr("width", 100)
		.attr("height", 500)

// Create the scale
	var y = d3.scaleLinear()
		.domain([0, max_value])         // This is what is written on the Axis: from 0 to 100
		.range([window_height*252/858, window_height * 10/858]);         // Note it is reversed

// Draw the axis
	svg
		.append("g")
		.attr("transform", "translate(50,0)")      // This controls the vertical position of the Axis
		.call(d3.axisLeft(y));

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.clearRect(0, 0, 10000, 10000);

	var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
	my_gradient.addColorStop(0, "grey");
	my_gradient.addColorStop(1, "orange");
	ctx.fillStyle = my_gradient;
	ctx.fillRect(0, 0, canvas_width, canvas_height);

	document.getElementById("new_idiom_value").innerHTML = main_value.toString();
}

function newIdiomChangedCountries(list_of_countries){
	keys_countries = Object.keys(list_of_countries)
	var snapshot = defiant.getSnapshot(averagesData);
	var found;

	var averages_list = [];

	if (keys_countries.length === 0) {
		found = defiant.json.search(snapshot, '//' + button);
		averages_list.push(found)
		max_value = Math.max.apply(null, found)
	} else {
		for(let country of keys_countries) {
			found = defiant.json.search(snapshot, "//*[name='" + country +"']");
			found = defiant.json.search(found, '//' + button);
			averages_list.push(found)
		}
	}

	var total_length = 0;
	var avg = 0;

	for (x of averages_list){
		for (let i = 0; i < x.length; i ++){
			avg += x[i];
		}
		total_length += x.length
	}

	avg = Math.round(avg/total_length * 100) / 100

	setup(window_width, window_height, [max_value, avg])
}

function setupNewIdiomAfterButton(new_button_id){
	button = button_list[new_button_id]
	newIdiomChangedCountries({})
}

function loadNewIdiomData(data){
	averagesData = data
}

function initialSetup(new_window_width, new_window_height){
	window_width = new_window_width;
	window_height = new_window_height;

	let canvas_width = window_width * 325/1626;

	let c = document.getElementById("myCanvas");
	let ctx = c.getContext("2d");
	ctx.translate(canvas_width/2, window_height*(260/2)/858);
	ctx.rotate(Math.PI);
	ctx.translate(-canvas_width/2, -window_height*(260/2)/858);
}