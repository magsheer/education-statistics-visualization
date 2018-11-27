

class Map {

    constructor(data) {
        this.data=data;
        this.nameArray = data["indicator1"].map(d => d.Country_Code);
        // this.indicatorData = data[csvName];
    }

    drawInitialMap(world) {
        let that = this;

        //find out the indicator selected
        let indicatorSelected = this.findIndicator();
        let indicatorData = this.data[indicatorSelected];
        let year = this.findyear();

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
            .attr("class",function(d){
                if(that.nameArray.includes(d.id)){
                    let index = that.nameArray.indexOf(d.id);
                    let toReturn = indicatorData[index]["Region_Code"];
                    return toReturn;
                }
            })

            .attr("fill",function(d){
                if(that.nameArray.includes(d.id)){
                    let index = that.nameArray.indexOf(d.id);
                    if(indicatorData[index][year]!="")
                        return color(parseFloat(indicatorData[index][year]));
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

    updateCountryMap(year){
        let that = this;
        let yr_csv = "yr_"+year;

        let indicatorSelected = this.findIndicator();
        let indicatorData = this.data[indicatorSelected];

        let color = d3.scaleQuantize()
                .domain([1, 100])
                .range(d3.schemeYlGnBu[9]);

        let form = document.getElementById("radiobuttons");
        let form_val;
        for(let i=0; i<form.length; i++){
            if(form[i].checked)
              form_val = form[i].id;
          }

        if(form_val == "region_radio"){
            let allPaths = d3.select("#worldmap").selectAll("path")
                .attr("fill",function(d){
                    if(that.nameArray.includes(d.id)){
                        let index = that.nameArray.indexOf(d.id);
                        let region_code = indicatorData[index]["Region_Code"];
                        if(region_code=="")
                            return "#bababa";
                        let r_index = that.nameArray.indexOf(region_code);
                        console.log(r_index,region_code,index,d.id);
                        if(indicatorData[r_index][yr_csv]!=""){
                            return color(parseFloat(indicatorData[r_index][yr_csv]));
                        }
                        else
                            return "#bababa";
                    }
                    else
                        return "#bababa";
                });

        }

        else{
            let allPaths = d3.select("#worldmap").selectAll("path")
                .attr("fill",function(d){
                    if(that.nameArray.includes(d.id)){
                        let index = that.nameArray.indexOf(d.id);
                        if(indicatorData[index][yr_csv]!="")
                            return color(parseFloat(indicatorData[index][yr_csv]));
                        else
                            return "#bababa";
                    }
                    else
                        return "#bababa";
                });
        }

    }

    // updateRegionMap(year){
    //     let that = this;
    //     let yr_csv = "yr_"+year;

    //     let indicatorSelected = this.findIndicator();
    //     let indicatorData = this.data[indicatorSelected];

    //    let color = d3.scaleQuantize()
    //             .domain([1, 100])
    //             .range(d3.schemeYlGnBu[9]);

    //     let allPaths = d3.select("#worldmap").selectAll("path")
    //         .attr("fill",function(d){
    //             if(that.nameArray.includes(d.id)){
    //                 let index = that.nameArray.indexOf(d.id);
    //                 if(indicatorData[index][yr_csv]!="")
    //                     return color(parseFloat(indicatorData[index][yr_csv]));
    //                 else
    //                     return "#bababa";
    //             }
    //             else
    //                 return "#bababa";
    //         });
    // }

    findIndicator(){
        let selectValue = d3.select('select').property('value');
        switch(selectValue){
            case "Adult literacy rate, population 15+ years, both sexes (%)":
                return "indicator1";
            case "Adult literacy rate, population 15+ years, female (%)":
                return "indicator2";
            case "Adult literacy rate, population 15+ years, male (%)":
                return "indicator3";
        }
    }

    findyear(){
        let year = d3.select("#yearslider").select('input').property('value');
        return "yr_"+year;
    }
}