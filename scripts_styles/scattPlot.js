var scatter;
var domainByTrait;
var traits;
var n;
var size;
var cell;
var brushCell;
var padding;
var x;
var y;
var xAxis;
var yAxis;
var axisX;
var brush;

function drawScatt(){

    var axisX = svg2.selectAll(".x.axis")
        .data(traits);

    axisX
        .enter().append("g");/////////////////////////////enter

    axisX
        .attr("class", "x axis")
        .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
        .each(function(d) {
            x.domain(domainByTrait[d]);
            d3.select(this).call(xAxis);
        });/////////////////////////////update

    axisX.exit().remove();/////////////////////////////exit

    //axisX.selectAll("text")
    //    .attr("transform",function(d){
    //        return "rotate(-90)";
    //    });

    var scatter = svg2.selectAll(".y.axis")
        .data(traits);

    scatter
        .enter().append("g");/////////////////////////////enter

    scatter
        .attr("class", "y axis")
        .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
        .each(function(d) {
            y.domain(domainByTrait[d]);
            d3.select(this).call(yAxis);
        });/////////////////////////////update

    scatter.exit().remove();/////////////////////////////exit

    var cell = svg2.selectAll(".cell")
        .data(cross(traits, traits));

    cell
        .enter().append("g");/////////////////////////////enter

    cell
        .attr("class", "cell")
        .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
        .each(plot);

    // Titles for the diagonal.
    cell.filter(function(d) { return d.i === d.j; }).append("text")
        .attr("x", padding-size/2+19)
        .attr("y", padding+size/2+3)
        .attr("dy", ".71em")
        .text(function(d) { return d.x; })
        .style("text-anchor", "middle")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });/////////////////////////////update

    cell.call(brush);

    cell.exit().remove();/////////////////////////////exit

}

function startScatt(data) {

    //size and padding
    var width = $("#paraCoord").width();
    padding = 19.5;
    size = width / 5;

    //scales
    x = d3.scale.linear()
        .range([padding / 2, size - padding / 2]);

    y = d3.scale.linear()
        .range([size - padding / 2, padding / 2]);

    //axis
    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(2);

    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(2);

    domainByTrait = {};
    traits = checkedItems;
    n = traits.length;

    traits.forEach(function (trait) {
        domainByTrait[trait] = [dataExt(data, trait)[0], dataExt(data, trait)[1]];
    });

    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);

    brush = d3.svg.brush()
        .x(x)
        .y(y)
        .on("brushstart", brushstart)
        .on("brush", brushmove)
        .on("brushend", brushend);

    //formatting the data for chart
    //date_list = [];
    //
    //var adate = new Date(dateI);
    //while (adate < dateO) {
    //    console.log("loop");
    //    var d_list = [];
    //    for (var j = 0; j < data.length; ++j) {//loop through 5 farms
    //        var farm_list = [];
    //        for (var i = 0; i < data[j].length; ++i) {//loop through days in current farm
    //            if (data[j][i]["createdAt"].getDate() == adate.getDate()) {//check createdAt with current date being looped
    //                farm_list.push(data[j][i]);//add those to list if same
    //            }
    //        }
    //        d_list.push(farm_list);
    //    }
    //    date_list.push(d_list);
    //    adate.setDate(adate.getDate() + 1)
    //}
    //
    //aggregate_data = date_list.map(function (d) {
    //    return d.map(function (f) {
    //        return get_av_obj(f)
    //    });
    //});

    var aggregate_data = reduceTime(data, 24);

    flat_data = [];
    for (var i = 0; i < aggregate_data.length; ++i) {
        for (var j = 0; j < aggregate_data[i].length; ++j) {
            flat_data.push(aggregate_data[i][j])
        }
    }

    if (svg2 == 0) {

        svg2 = d3.selectAll("#scattPlot").append("svg")
            .attr("width", size * n + padding)
            .attr("height", size * n + padding + 50)
            .append("g")
            .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

    } else {
        console.log("updating scatterplot matrix");
    }

    drawScatt();

}

    function plot(p) {
        var cell = d3.select(this);

        x.domain(domainByTrait[p.x]);
        y.domain(domainByTrait[p.y]);

        cell.append("rect")
            .attr("class", "frame")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);

        cell.selectAll("circle")
            .data(flat_data)
            .enter().append("circle")
            .attr("cx", function(d) { return x(d[p.x]); })
            .attr("cy", function(d) { return y(d[p.y]); })
            .attr("r", 3)
            .style("fill", function(d) { return color(d.farmID); });
    }

    // Clear the previously-active brush, if any.
    function brushstart(p) {
        if (brushCell !== this) {
            d3.select(brushCell).call(brush.clear());
            x.domain(domainByTrait[p.x]);
            y.domain(domainByTrait[p.y]);
            brushCell = this;
        }
    }

    // Highlight the selected circles.
    function brushmove(p) {
        var e = brush.extent();
        svg2.selectAll("circle").classed("hidden", function(d) {
            return e[0][0] > d[p.x] || d[p.x] > e[1][0]
                || e[0][1] > d[p.y] || d[p.y] > e[1][1];
        });
    }

    // If the brush is empty, select all circles.
    function brushend() {
        if (brush.empty()) svg2.selectAll(".hidden").classed("hidden", false);
    }


    //helper function to allow property functions to access both parent and child data
    function cross(a, b) {//this will be sensor, sensor

        //declare empty array, n=9, m=9, var i and j
        var c = [];
        var n = a.length;
        var m = b.length;
        var i;
        var j;

        for (i = -1; ++i < n;) { //loop through first matrix dimension (mainTemp, humidity, etc...
            for (j = -1; ++j < m;) { //loop through second matrix dimension (mainTemp, humidity, etc...
                var t = new Object;
                t = {x: a[i], i: i, y: b[j], j: j};
                c.push( t ); //x: sensorA, i: 1, y:sensorB, j: 2
            }
        }
        console.log(c)

        return c;
    }

    //d3.select(self.frameElement).style("height", size * n + padding + 20 + "px");