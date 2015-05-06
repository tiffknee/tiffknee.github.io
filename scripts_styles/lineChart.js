var margin = {top: 50, bottom: 10, left: 135, right: 40};
var width = 1100 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var gd;
var filter = "PH";

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = [];                           //TODO: update with SOM


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d["createdAt"]); })
    .y(function(d) { return y(d[sensor]); });

var svg = d3.select("body").append("svg")//TODO: select corresponding div element
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function draw_lines() {
    gd = data;

    s_sensor = gd.map(function (d, i) {
        return gd[i].info.map(function (e) {
            return e[filter];
        })
    });
    sensor_av = s_sensor.map(function (d) {
        return d3.mean(d)
    });
    //ph = gd[0].info.map(function (d) {return d.PH});

    x.domain([0, 360]);
    y.domain(d3.extent(sensor_av));

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    g.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(filter);

    g.append("path")
        .datum(sensor_av)
        .attr("class", "line")
        .attr("d", line);
}

function update_lines() {
    s_sensor = gd.map(function (d, i) {return gd[i].info.map(function (e) {return e[filter];}) });
    sensor_av = s_sensor.map(function (d) {return d3.mean(d)});
    y.domain(d3.extent(sensor_av));
    g.selectAll("text").remove();
    var line = d3.svg.line()
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d); });
    g.select(".line")   // change the line
        .transition().duration(750)
        .attr("d", line(sensor_av));
    g.select(".x.axis") // change the x axis
        .transition().duration(750)
        .call(xAxis);
    var y_ax = g.select(".y.axis") // change the y axis
    y_ax
        .transition().duration(750)
        .call(yAxis);
    y_ax
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(filter);
}