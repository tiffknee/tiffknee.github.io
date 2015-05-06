var height;
var dimensions;
var bg;
var fg;
var background;
var foreground;
var axis;
var yy;
var xscales = {};
var dragging = {};
var line;
var initializingParaCoords = true;

function drawPara(data){

    // Add grey background lines for context.
    background= bg
        .selectAll("path")
        .data(data);

    background
        .enter().append("path");

    background
        .transition().duration(500)
        .attr("d", path );//

    background.exit().remove();

    // Add colored foreground lines for focus.
    foreground = fg
        .selectAll("path")
        .data(data);

    foreground
        .enter().append("path");

    foreground
        .transition().duration(500)
        .attr("d", path )//
        .attr('stroke', function(d,i) { return color(d["farmID"]); });

    foreground.exit().remove();

    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
        .data(dimensions);

    g
        .enter().append("g");

    g
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(0," + yy(d) + ")"; })
        .call(d3.behavior.drag()
            .origin(function(d) { return {y: yy(d)}; })
            .on("dragstart", function(d) {
                dragging[d] = yy(d);
                background.attr("visibility", "hidden");
            })
            .on("drag", function(d) {
                dragging[d] = Math.min(height, Math.max(0, d3.event.y));
                foreground.attr("d", path);//
                dimensions.sort(function(a, b) { return position(a) - position(b); });
                yy.domain(dimensions);
                g.attr("transform", function(d) { return "translate(0," + position(d) + ")"; })
            })
            .on("dragend", function(d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(0," + yy(d) + ")");
                transition(foreground).attr("d", path );//
                background
                    .attr("d", path )//
                    .transition()
                    .delay(500)
                    .duration(0)
                    .attr("visibility", null);
            }));

    g.selectAll("g").remove();
    g.selectAll("text").remove();

    //updating axis
    g
        .append("g")
        .attr("class", "axis2")
        .each(function(d) {
            d3.select(this).call(axis.scale(xscales[d]));
        })
        .append("text")
        .style("text-anchor", "end")
        .attr("x", -9)
        .text(function(d) { return d; });

    g
        .append("g")
        .attr("class", "brush")
        .each(function(d) {

            d3.select(this).call(xscales[d].brush = d3.svg.brush().x(xscales[d]).on("brushstart", brushstart).on("brush", brush));

        })
        .selectAll("rect")
        .attr("y", -8)
        .attr("height", 16);


    g.exit().remove();

}

function startPara(data){

    //margins and size
    var margin = {top: 0, right: 10, bottom: 0, left: 120};
    var width = $("#paraCoord").width() - margin.left - margin.right;
    height = width*2.3 - margin.top - margin.bottom;

    //append svg if doesn't exist
    if (initializingParaCoords){

        svg = d3.selectAll("#paraCoord").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        bg = svg.append("g")
            .attr("class", "background");
        fg = svg.append("g")
            .attr("class", "foreground");
        //lines
        line = d3.svg.line();
        axis = d3.svg.axis().orient("top");

        //set up y scales
        yy = d3.scale.ordinal().rangePoints([0, height], 1);
        initializingParaCoords = false;

    }else{
        console.log("updating parallel coordinates");
    }

    // Extract the list of dimensions and create an x scale for each.
    dimensions = checkedItems;
    yy.domain(dimensions);

    xscales = {};
    for (var i = 0; i < dimensions.length; ++i)  {
        xscales[dimensions[i]] = d3.scale.linear().domain([ dataExt(data, dimensions[i])[0], dataExt(data, dimensions[i])[1]]).range([0, width]);
    }

    var aggregate_data = reduceTime(data, 6);

    var flat_data = [];
    for (var i = 0; i < aggregate_data.length; ++i) {
        for (var j = 0; j < aggregate_data[i].length; ++j) {
            flat_data.push(aggregate_data[i][j])
        }
    }

    drawPara(flat_data);

}

function position(d) {
    var v = dragging[d];
    return v == null ? yy(d) : v;
}

function transition(g) {
    return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {//d refers to the data bound to path
    //console.log(d);
    return line(dimensions.map(function(p) {//p refers to each dimension
        return [xscales[p](d[p]), position(p)];
    }));
}

function brushstart() {
    d3.event.sourceEvent.stopPropagation();
}

// Handles a brush event, toggling the display of foreground lines.
function brush() {
    var actives = dimensions.filter(function(p) { return !xscales[p].brush.empty(); }),
        extents = actives.map(function(p) { return xscales[p].brush.extent(); });
    foreground.style("display", function(d) {
        return actives.every(function(p, i) {
            return extents[i][0] <= d[p] && d[p] <= extents[i][1];
        }) ? null : "none";
    });
}