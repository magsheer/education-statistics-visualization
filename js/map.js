
class Map {
    drawMap(world) {

        let width = 960,
            height = 580;


        let projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        let geojson = topojson.feature(world, world.objects.countries);
        let path =  d3.geoPath().projection(projection);
        // let graticule = d3.geoGraticule();

        // let graticule = d3.geo.graticule();

        let svg = d3.select("#worldmap").append("svg")
            .attr("width", width)
            .attr("height", height);


        //Graticule
        // svg.append("defs").append("path")
        //     .datum({
        //         type: "Sphere"
        //     })
        //     .attr("id", "sphere")
        //     .attr("d", path);

        // svg.append("use")
        //     .attr("class", "map-stroke")
        //     .attr("xlink:href", "#sphere");

        // svg.append("use")
        //     .attr("class", "map-fill")
        //     .attr("xlink:href", "#sphere");

        // svg.append("path")
        //     .datum(graticule)
        //     .attr("class", "graticule")
        //     .attr("d", path);



        //countries
        // d3.json("data/world.json", function (error, world) {
        //     if (error) throw error;

        //     let countries = topojson.feature(world, world.objects.countries).features;

        //     let map_countrylist = [];

        //     for(let i=0;i<countries.length;i++)
        //         map_countrylist[i]=countries[i].id;

        //     svg.selectAll(".country")
        //         .data(countries)
        //         .enter().insert("path", ".graticule")
        //         .attr("class", "country")
        //         .attr("d", path)
        //         .attr("id",function(d){return d.id;});
        // });

        let allPaths = svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("id",function(d){return d.id})
            .attr("class","countries");


    }
}