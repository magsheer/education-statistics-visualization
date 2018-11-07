

class Map {

    constructor(data, csvName) {
        this.nameArray = data[csvName].map(d => d.Country_Code);
        this.indicatorData = data[csvName];
    }

    drawMap(world) {

        let width = 960,
            height = 580;

        let projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        let geojson = topojson.feature(world, world.objects.countries);
        let path =  d3.geoPath().projection(projection);

        let svg = d3.select("#worldmap").append("svg")
            .attr("width", width)
            .attr("height", height);


        let allPaths = svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("id",function(d){return d.id})
            .attr("class","countries");


    }
}