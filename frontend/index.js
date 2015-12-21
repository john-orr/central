//changes to JSON object "name" to "location" 
$(document).ready(function() {
    var tempData = [];
    var socket = io.connect();
    var x, y, valueline, svg, xAxis, yAxis;

    socket.on('newReading', function(readings){
        console.log(readings);
        tempData.push(readings);
        updateData(tempData);
    });

    $.get("pastTemperatures", function(data){
        tempData = data;
        makeChart(tempData);
    });

});

function makeChart(tempData){
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
//var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;

// Set the ranges
x = d3.time.scale().range([0, width]);
y = d3.scale.linear().range([height, 0]);

// Define the axes
xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
valueline = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.temperature); });
    
// Adds the svg canvas
svg = d3.select("#chartContainer")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
  
// Get the data
    tempData.forEach(function(d) {
        d.timestamp = Date.parse(d.timestamp);
    });

    // Scale the range of the data
    x.domain(d3.extent(tempData, function(d) { return d.timestamp; }));
    y.domain([0, d3.max(tempData, function(d) { return d.temperature; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(tempData));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

}
     
//      function renderChart(){
//          
//          
//      }





// ** Update data section (Called from the onclick)
function updateData(tempData) {

    	// Scale the range of the data again 
    	x.domain(d3.extent(tempData, function(d) { return d.timestamp; }));
	    y.domain([0, d3.max(tempData, function(d) { return d.temperature; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(tempData));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    }
