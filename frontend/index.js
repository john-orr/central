<<<<<<< HEAD
            
            function changeColor(newColor) {
    var elem = document.getElementById("para1");
    elem.style.color = newColor;
  }

var testData1 = [];

  $.get("pastTemperatures/24", function(data, status){
testData1 = data;

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;

var color = d3.scale.category10();

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var dataNest = d3.nest()
        .key(function(d) {return d.location;})
        .entries(testData1);

        testData1.forEach(function(d) {
                d.date = parseDate(d.timestamp);
                d.close = +d.temperature;
            });

            x.domain(d3.extent(testData1, function(d) { return d.date; }));
                y.domain([23, d3.max(testData1, function(d) { return d.close; })]);

// Adds the svg canvas
var svg = d3.select("#container")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    dataNest.forEach(function(d) {
         svg.append("path")
         .attr("class", "line")
         .attr("id", d.key)
         .attr("d", valueline(d.values));
    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);




// ** Update data section (Called from the onclick)
function updateData(testData) {

	    testData.sort(function(a, b) {
             return a.date - b.date;
        });

        var dataNest = d3.nest()
                .key(function(d) {return d.location;})
                .entries(testData1);

    	// Scale the range of the data again
    	x.domain(d3.extent(dataNest, function(d) { return d.date; }));
	    y.domain([23, d3.max(dataNest, function(d) { return d.close; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("#container").transition();

    dataNest.forEach(function(d) {
            svg.select("#" + d.key)   // change the line
            .duration(750)
            .attr("d", valueline(d.values));
        });

    // Make the changes

        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);


=======
function changeColor(newColor) {
	var elem = document.getElementById("para1");
	elem.style.color = newColor;
>>>>>>> 8093166ced3d41c55e40a8b65c44c009913e382f
}

$.get("pastTemperatures/24", function(data, status){
	
	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 600 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;
	
	// Parse the date / time
	var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;
	
	var color = d3.scale.category10();
	
	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	// Define the axes
	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
	
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

	// Define the line
	var valueline = d3.svg.line()
					  .x(function(d) { return x(d.date); })
					  .y(function(d) { return y(d.temperature); });
	
	var dataNest = d3.nest()
					 .key(function(d) {return d.location;})
					 .entries(data);
	
	data.forEach(function(d) {
		d.date = parseDate(d.timestamp);
	});
	
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([d3.min(data, function(d) { return d.temperature; }), d3.max(data, function(d) { return d.temperature; })]);
	
	// Adds the svg canvas
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform",
					  "translate(" + margin.left + "," + margin.top + ")");
	
	dataNest.forEach(function(d) {
		svg.append("path")
			.attr("class", "line")
			.attr("id", d.key)
			.attr("d", valueline(d.values));
    });
	
	// Add the X Axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	// Add the Y Axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
	
	// ** Update data section (Called from the onclick)
	function updateData(temperatureData) {
		
		temperatureData.sort(function(a, b) {
			return a.date - b.date;
		});
		
		var dataNest = d3.nest()
						 .key(function(d) {return d.location;})
						 .entries(temperatureData);
		
		// Scale the range of the data again
		x.domain(d3.extent(temperatureData, function(d) { return d.date; }));
		y.domain([d3.min(data, function(d) { return d.temperature; }), d3.max(temperatureData, function(d) { return d.temperature; })]);
		
		// Select the section we want to apply our changes to
		var svg = d3.select("body").transition();
		
		dataNest.forEach(function(d) {
			svg.select("#" + d.key)   // change the line
				.duration(750)
				.attr("d", valueline(d.values));
		});
		
		svg.select(".x.axis") // change the x axis
			.duration(750)
			.call(xAxis);
        svg.select(".y.axis") // change the y axis
			.duration(750)
			.call(yAxis);
	}
	
	var socket = io.connect();
	
	socket.on('newReading', function(reading){
		reading.date = parseDate(reading.timestamp);
		console.log(reading);
		data.push(reading);
		updateData(data);
	});
});