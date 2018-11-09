

class Map {

    constructor(data, csvName) {
        this.nameArray = data[csvName].map(d => d.Country_Code);
        this.indicatorData = data[csvName];
    }

    drawMap(world) {
        let that = this;

        let color = d3.scaleQuantize()
                    .domain([1, 100])
                    .range(d3.schemeYlGnBu[9]);

        let format = d3.format("");

        let x = d3.scaleLinear()
                    .domain(d3.extent(color.domain()))
                    .rangeRound([650, 900]);

        let width = 960,
            height = 500;

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
            // .attr("class","countries");
            .attr("fill",function(d){
                if(that.nameArray.includes(d.id)){
                    let index = that.nameArray.indexOf(d.id);
                    if(that.indicatorData[index].yr_2006!="")
                        return color(parseFloat(that.indicatorData[index].yr_2006));
                    else
                        return "#bababa";
                }
                else
                    return "#bababa";
            });


        let g = svg.append("g")
                    .attr("transform", "translate(-100,450)");

        g.selectAll("rect")
          .data(color.range().map(d => color.invertExtent(d)))
          .enter()
          .append("rect")
          .attr("height", 8)
          .attr("x", d => x(d[0]))
          .attr("width", d => x(d[1]) - x(d[0]))
          .attr("fill", d => color(d[0]));


        g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(format)
        .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
        .select(".domain")
        .remove();
    }

    updateMap(year){
        let that = this;
        let yr_csv = "yr_"+year;

       let color = d3.scaleQuantize()
                .domain([1, 100])
                .range(d3.schemeYlGnBu[9]);

        let allPaths = d3.select("#worldmap").selectAll("path")
            .attr("fill",function(d){
                if(that.nameArray.includes(d.id)){
                    let index = that.nameArray.indexOf(d.id);
                    if(that.indicatorData[index][yr_csv]!="")
                        return color(parseFloat(that.indicatorData[index][yr_csv]));
                    else
                        return "#bababa";
                }
                else
                    return "#bababa";
            });

    }
}