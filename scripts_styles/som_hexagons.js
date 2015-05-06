//******************************************************************************************
//******************************        HEXAGONS        ************************************
//******************************************************************************************

var svg3 = 0;
var legend;
var hexbin;
var points;
var sc;

function mover(d) {
    var el = d3.select(this)
            .transition()
            .duration(10)
            .style("fill-opacity", 0.7)
        ;
}

function mout(d) {
    var el = d3.select(this)
            .transition()
            .duration(1000)
            .style("fill-opacity", 1)
        ;
}

function initializeHexagons(w, h) {
    var margin = {
        top: 40,
        right: 0,
        bottom: 0,
        left: 20
    };

    width = $("#map").width() - margin.left - margin.right;
    height = width * h / w;

    var MapColumns = w;
    var MapRows = h;

//The maximum radius the hexagons can have to still fit the screen
    var hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)),
        height / ((MapRows + 1 / 3) * 1.5)]);

//Set the new height and width of the svg3 based on the max possible
    width = MapColumns * hexRadius * Math.sqrt(3);
    heigth = MapRows * 1.5 * hexRadius + 0.5 * hexRadius;

//Set the hexagon radius
    hexbin = d3.hexbin()
        .radius(hexRadius);

//Calculate the center positions of each hexagon
    points = [];
    for (var i = 0; i < MapRows; i++) {
        for (var j = 0; j < MapColumns; j++) {
            points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
        }
    }

//Create svg3 element
    if (svg3 == 0) {
        console.log("create som");
        svg3 = d3.selectAll("#map").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        legend = d3.selectAll("#map").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", 250)
            .append("g");
    }
    else {
        console.log("updating som")
    }


}

function draw_hexagons(color) {
    var som = svg3
        .selectAll(".hexagon")
        .data(hexbin(points));
    som
        .enter().append("path");
    som
        .attr("class", "hexagon")
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y + hexbin.hexagon();
        })
        .attr("stroke", function (d, i) {
            return "#fff";
        })
        .attr("stroke-width", "1px")
        .attr("fill", function (d, i) {
            return color[i];
        });
    som
        .on("mouseover", mover)
        .on("mouseout", mout)
    ;

    som.exit().remove();
}

function draw_hexagons_delay(color) {
    var som = svg3
        .selectAll(".hexagon")
        .data(hexbin(points));
    som
        .enter().append("path");
    som
        .attr("class", "hexagon")
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y + hexbin.hexagon();
        })
        .attr("stroke", function (d, i) {
            return "#fff";
        })
        .attr("stroke-width", "1px")
        .transition()
        .duration(4500)
        .attr("fill", function (d, i) {
            return color[i];
        });
    som
        .on("mouseover", mover)
        .on("mouseout", mout)
    ;
    som.exit().remove();
}

function draw_legend(color) {
    var hxbn = d3.hexbin()
        .radius(10);

    //var pts = [[40, 15], [40, 30], [40, 45], [40, 60], [40, 75]];
    var pts = [[15, 10], [30, 10], [45, 10], [60, 10], [75, 10]];

    var l = legend
        .selectAll(".hexagon")
        .data(hxbn(pts));
    l
        .enter().append("path");
    l
        .attr("class", "hexagon")
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y + hxbn.hexagon();
        })
        .attr("stroke", function (d, i) {
            return "#fff";
        })
        .attr("stroke-width", "1px")
        .style("fill", function (d, i) {
            return color[i];
        })
        .on("mouseover", mover)
        .on("mouseout", mout);

}

//******************************************************************************************
//*****************************        SOM FUNCTIONS        ********************************
//******************************************************************************************

function areArraysEqual(array1, array2) {
    // Borrowed from here:
    // http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256BFB0077DFFD
    var temp = new Array();
    if ( (!array1[0]) || (!array2[0]) ) { // If either is not an array
        return false;
    }
    if (array1.length != array2.length) {
        return false;
    }
    // Put all the elements from array1 into a "tagged" array
    for (var i=0; i<array1.length; i++) {
        key = (typeof array1[i]) + "~" + array1[i];
        // Use "typeof" so a number 1 isn't equal to a string "1".
        if (temp[key]) { temp[key]++; } else { temp[key] = 1; }
        // temp[key] = # of occurrences of the value (so an element could appear multiple times)
    }
    // Go through array2 - if same tag missing in "tagged" array, not equal
    for (var i=0; i<array2.length; i++) {
        key = (typeof array2[i]) + "~" + array2[i];
        if (temp[key]) {
            if (temp[key] == 0) { return false; } else { temp[key]--; }
            // Subtract to keep track of # of appearances in array2
        } else { // Key didn't appear in array1, arrays are not equal.
            return false;
        }
    }
    // If we get to this point, then every generated key in array1 showed up the exact same
    // number of times in array2, so the arrays are equal.
    return true;
}

function isInArray(checkMe, bigArray) {
    for (i=0;i<bigArray.length;i++) {
        if (areArraysEqual(checkMe, bigArray[i])) { return true; }
    }
    return false;
}

function getDistance(weight, inputVector) {
    var distance = 0;
    for (var i = 0;i<weight.length;i++) {
        distance += (inputVector[i] - weight[i]) * (inputVector[i] - weight[i]);
    }
    return Math.sqrt(distance);
}

function makeRandomWeights(vSize) {
    weights = [];
    while (weights.length < vSize) {
        var tmp = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
        if (!isInArray(tmp,weights)) { weights.push(tmp); }
    }
    return weights;
}

function normalizeVectorValues(v,normalCoef) {
    var normalizedVector = [];
    for (i=0;i<v.length;i++) {
        normalizedVector.push(v[i] / normalCoef);
    }
    return normalizedVector;
}

function getBMUIndex(weights, target) {
    var BMUIndex = 0;
    var bestScore = 99999;

    for (i=0; i< weights.length;i++) {
        distance = getDistance(weights[i], target);
        if (distance < bestScore) {
            bestScore = distance;
            BMUIndex = i;
        }
    }
    return BMUIndex;
}

function convertIndexToXY(idx, dimW) {
    var x = parseInt(idx % dimW,10);
    var y = parseInt((idx / dimW),10);
    return [x,y];
}

function drawColors(weights, legend) {
    var colors = [];
    var weight = [];
    for (i=0;i<weights.length;++i) {
        var s = 0;
        for (var j = 0; j < weights[i].length; ++j) {
            s += weights[i][j]
        }
        s *= 1/weights[i].length;
        weight.push(s);
    }
    if (weights.length < 10) {console.log(weight)}
    if (legend == null) {sc = d3.scale.linear().domain(d3.extent(weight)).range([10, 230]);
        //console.log('updating scale')
    }
    for (var i = 0; i < weight.length; ++i) {
        var h = sc(weight[i]);
        var c = "hsl("+h+", 100%, 70%)";
        colors.push(c)
    }

    return colors;
}

function getEucledianDistance(coord1, coord2) {
    return (coord1[0] - coord2[0]) * (coord1[0] - coord2[0]) + (coord1[1] - coord2[1]) * (coord1[1] - coord2[1]);
}

function startSom (w, h, data) {
    var dimW = w;
    var dimH = h;
    var radius = (dimW * dimH) / 2;
    var training_iterations = 1000;
    var learning_rate = 1;
    var time_constant = training_iterations / Math.log(radius);
    var weights = makeRandomWeights(dimW * dimH);
    var normalCoef = 1;
    var inputs = [];
    var scales = [];
    for (var i = 0; i < sensors.length; ++i) {
        var a_s = d3.scale.linear().domain([dataExt(data, sensors[i])[0], dataExt(data, sensors[i])[1]]).range([0, 1]);
        scales.push(a_s)
    }
    var f_av = data.map(function(d) { return get_av_obj(d)});
    var count = 0;

    //debugging only
    /*
    for (var j = 0; j < f_av.length; ++j) {
        for (var i = 0; i < sensors.length; ++i) {
            if ((f_av[j][i] < dataExt(data, sensors[i])[0]) || (f_av[j][i] > dataExt(data, sensors[i])[1])) {
                count ++;
            //if ((f_av[j][i] < scales[i].domain()[0]) || (f_av[j][i] > scales[i].domain()[1])) {
                console.log('\n ' + count + '. PROBLEM : Farm ' + j + ', ' + sensors[i] + '(' + i + ')');
                console.log("domain: " + scales[i].domain());
                console.log("value: " + f_av[j][i])
            }
        }
    }
    */

    for (var i = 0; i< f_av.length; ++i) {
        var vect = [];
        sensors.forEach(function(s) {
            vect.push(f_av[i][s])
        });
        inputs.push(vect.map(function (d, j) { return scales[j](d)}))
    }
    console.log(inputs);

    var radius_decaying = 0;
    var learning_rate_decaying = 0;
    initializeHexagons(w, h);
    draw_hexagons(drawColors(weights));
    for (it=0; it<training_iterations; it++) {
        //itdom.innerHTML = it;
        radius_decaying = radius * Math.exp(-1.0 * it / time_constant);
        learning_rate_decaying = learning_rate * Math.exp(-1.0 * it / time_constant);

        //pick a random input to train
        iv = inputs[Math.floor(Math.random() * inputs.length)];
        // Determine the BMU
        BMUIdx = getBMUIndex(weights, normalizeVectorValues(iv, normalCoef));
        for (v in weights) {
            //console.log(it);
            // get Euclidean distance from the BMU
            var coord1 = convertIndexToXY(BMUIdx, dimW);
            var coord2 = convertIndexToXY(v, dimW);
            var dist = getEucledianDistance(coord1, coord2);
            var widthSq = radius_decaying * radius_decaying;
            // Determine if the weight is within the training radius
            if (dist < widthSq) {
                //console.log(dist, radius_decaying, it);
                influence = Math.exp((-1.0 * (dist)) / (2 * widthSq));
                //console.log('influence: '+influence);
                for (vidx = 0; vidx < weights[v].length; vidx++) {
                    var target = normalizeVectorValues(iv, normalCoef);
                    weights[v][vidx] += influence * learning_rate_decaying * (target[vidx] - weights[v][vidx]);
                }
            }
        }
    }
    draw_hexagons_delay(drawColors(weights));
    draw_legend(drawColors(inputs));

}
