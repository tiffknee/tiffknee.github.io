/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 */

/**
 * LineVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _sensor -- the sensor displayed
 * @constructor
 */
LineVis = function(_parentElement, _data, _sensor){
    this.parentElement = _parentElement;
    this.data = _data;
    this.sensor = _sensor;

    this.margin = {top: 0, right: 10, bottom: 30, left: 20};
    this.width = $(this.parentElement).width() - this.margin.left - this.margin.right;
    this.height = 350 - this.margin.top - this.margin.bottom;

    this.initVis();
};


/**
 * Method that sets up the SVG and the variables
 */
LineVis.prototype.initVis = function(){

    var that = this;

    this.svg = d3.select(this.parentElement).append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3.time.scale()
        .range([0, this.width]);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.color = d3.scale.ordinal()
        .range(["#7fc97f","#beaed4","#fdc086","#ffff99","#66c2a5"].reverse())
        .domain(this.data.map(function(d) { return d[0]["farmID"]}));//TODO: update with SOM

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return that.x(d["createdAt"]); })
        .y(function(d) { return that.y(d[that.sensor]); });

    this.x.domain(dataExt(this.data, "createdAt"));
    this.y.domain(dataExt(this.data, this.sensor));

    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxis);

    this.svg.append("g")
        .attr("class", "y axis")
        .call(this.yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(this.sensor);

    var farm = this.svg.selectAll(".farm")
        .data(this.data)
        .enter().append("g")
        .attr("class", "farm");

    farm.append("path")
        .attr("class", "line")
        .attr("d", function(d) {return that.line(d)})
        .style("stroke", function(d) {return that.color(d.map(function(e) {return e["farmID"]}))});

    //this.updateVis();
};


/**
 * the drawing function - should use the D3 selection, enter, exit
 */
LineVis.prototype.updateVis = function(){
    var that = this;

    this.x.domain(dataExt(this.data, "createdAt"));
    this.y.domain(dataExt(this.data, this.sensor));
    this.line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return that.x(d["createdAt"]); })
        .y(function(d) { return that.y(d[that.sensor]); });

    var farm = this.svg.selectAll(".line")   // change the line
        .data(this.data);
    farm
        .enter().append("path");
    farm
        .attr("class", "line")
        .transition().duration(750)
        .attr("d", function(d) {return that.line(d)})
        .style("stroke", function(d) {return that.color(d.map(function(e) {return e["farmID"]}))});
    farm
        .exit().remove();

    this.svg.select(".x.axis") // change the x axis

        .transition().duration(750)
        .call(this.xAxis);
    this.svg.select(".y.axis") // change the y axis
        .transition().duration(750)
        .call(this.yAxis);

};


LineVis.prototype.onChange= function (filtered_data){
    this.data = filtered_data;
    this.updateVis();
};