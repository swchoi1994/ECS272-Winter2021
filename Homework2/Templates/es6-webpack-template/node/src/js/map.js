import * as d3 from "d3";

export function drawMap(data, id) {


d3.select(self.frameElement.parentElement)
  .style('background', '#6832b3')
  .style('background', '-moz-radial-gradient(center, ellipse cover,  #6832b3 0%, #361370 100%)')
  .style('background', '-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#6832b3), color-stop(100%,#361370))')
  .style('background', '-webkit-radial-gradient(center, ellipse cover,  #6832b3 0%,#361370 100%)');
d3.select(self.frameElement.parentElement).select("h1")
  .style('color', "#2B174B");
d3.select(self.frameElement)
  .style("height", "900px")
  .style("border", "none");

var width = 418,
    height = 400;

var projection = d3.geo.mercator()
    .center([-122.433701, 37.767683])
    .scale(250000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var tiler = d3.geo.tile()
    .size([width, height]);

var svg = d3.select(".map").append("svg")
    .attr("id", "sfmap")
    .attr("width", width)
    .attr("height", height);

d3.json("https://dl.dropboxusercontent.com/u/1392786/d3/sfc.json", function(error, json) {
  var contours = topojson.object(json, json.objects.sfcontours);
  var isoline = _.countBy(contours.geometries, function(c) {
    return c.properties.ISOLINE_TY;
  });

  isoline["800 - Normal"] = 0.5;
  isoline["810 - Depression"] = 0.5;
  isoline["820 - Intermediate Normal"] = 0.25;
  isoline["830 - Intermediate Depression"] = 0.25;

  var elevationExtent = d3.extent(contours.geometries, function(c) {
    return c.properties.ELEVATION;
  });

  var color = d3.scale.threshold()
    .domain([elevationExtent[0], 0, 100, 200, 300, 400, 600, 800, elevationExtent[1]])
    .range(["#00441B","#006D2C","#238B45","#41AB5D","#74C476", "#A1D99B", "#C7E9C0", "#E5F5E0", "#F7FCF5"].reverse());

  var elevationGroups = _.groupBy(contours.geometries, function(c) {
    return c.properties.ELEVATION;
  });

  var vector = svg.append("g")
    .attr("class", "vector")
    .call(renderTiles, "highroad")
    .call(renderTiles, "buildings");


  svg.call(drawContoursSingleLine, contours.geometries, {color:color, isoline:isoline});
  d3.select(".loading").remove();
});


function renderTiles(svg, type) {
  svg.append("g")
      .attr("class", type)
    .selectAll("g")
      .data(tiler
        .scale(projection.scale() * 2 * Math.PI)
        .translate(projection([0, 0])))
    .enter().append("g")
      .each(function(d) {
        var g = d3.select(this);
        d3.json("http://" + ["a", "b", "c"][(d[0] * 31 + d[1]) % 3] + ".tile.openstreetmap.us/vectiles-" + type + "/" + d[2] + "/" + d[0] + "/" + d[1] + ".json", function(error, json) {
          g.selectAll("path")
              .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
            .enter().append("path")
              .attr("class", function(d) { return d.properties.kind; })
              .attr("d", path);
        });
      });
}

function drawContours(g, plotData, options) {
  var contours = g.append("g")
      .attr("class", "contours");

  _.each(plotData, function(d, e) {
    e = +e;
    contours.append("path")
      .attr("d", path({
        type: "MultiLineString",
        coordinates: d.map(function(t) {
          return t.coordinates;
        })
      }))
      .style("fill", "none")
      .style("stroke", function(d) { return options.color(e); })
      .style("stroke-width", 0.5);
  });
}

drawContoursSingleLine = function(g, plotData, options) {
  var contours = g.append("g")
      .attr("class", "contours");

  contours.selectAll("path")
      .data(plotData)
    .enter().append("path")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function(d) { return options.color(d.properties.ELEVATION); })
      .style("stroke-width", function(d) {
        return 0.5;
      });
}
}