// function getLineObject(){
//     return
// }

class Map {

    constructor(data,lineObject) {
        this.data=data;
        this.lineObject = lineObject;
        this.nameArray = data["indicator1"].map(d => d.Country_Code);
        this.tooltip = d3.select("#worldmap").append("div").attr("class", "tooltip");
    }

    drawInitialMap(world) {
        let that = this;

        //find out the indicator selected
        let indicatorSelected = this.findIndicator();
        let indicatorData = this.data[indicatorSelected];
        

        //find the year on year slider
        let year = this.findyear();
        let current_radio = this.findregionorcountry();

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

        //initial countries map
        let allPaths = svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d",path)
            .attr("id",function(d){return d.id})
            .on("click", function(d){
                let this_ = this;
                that.handleClick(d,that);
            })
            .attr("class",function(d){
                if(that.nameArray.includes(d.id)){
                    let index = that.nameArray.indexOf(d.id);
                    let toReturn = indicatorData[index]["Region_Code"];
                    return toReturn;
                }
            })
            .on("mouseover",function(d){
                let this_ = that;
                let year_ = that.findyear();
                let r = indicatorData[that.nameArray.indexOf(d.id)]["Region_Code"];
                let region_name = indicatorData[that.nameArray.indexOf(r)]["Country_Name"];
                let region_year_val = indicatorData[that.nameArray.indexOf(r)][year_];
                
                let country_name = indicatorData[that.nameArray.indexOf(d.id)]["Country_Name"];
                let year_val = indicatorData[that.nameArray.indexOf(d.id)][year_];
                // if(year_val != "")
                this_.tooltip
                .style("visibility","visible")
                .html("Country: "+
                        this_.tooltip_render(country_name,year_val)+"</br>"+"Region: "+this_.tooltip_render(region_name,region_year_val));

            })
            .on("mouseout", function(d) {
                let this_ = that;
                this_.tooltip.style("visibility", "hidden");
            })
            .on("mousemove", function(d) {
                let this_ = that;
                this_.tooltip
                .style("top", (d3.event.pageY - 20) + "px")
                .style("left", (d3.event.pageX + 10) + "px");
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


        //color legend
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

        //get the data selected
        let indicatorSelected = this.findIndicator();
        let indicatorData = this.data[indicatorSelected];

        let color = d3.scaleQuantize()
                .domain([1, 100])
                .range(d3.schemeYlGnBu[9]);

        //check for country or region
        let form = document.getElementById("radiobuttons");
        let form_val;
        for(let i=0; i<form.length; i++){
            if(form[i].checked)
              form_val = form[i].id;
          }

        //retrive region data and fill 
        if(form_val == "region_radio"){
            let allPaths = d3.select("#worldmap").selectAll("path")
                    .on("mouseover",function(d){
                    let this_ = that;
                    let r = indicatorData[that.nameArray.indexOf(d.id)]["Region_Code"];
                    let region_name = indicatorData[that.nameArray.indexOf(r)]["Country_Name"];
                    let region_year_val = indicatorData[that.nameArray.indexOf(r)]["yr_"+year];
                    
                    let country_name = indicatorData[that.nameArray.indexOf(d.id)]["Country_Name"];
                    let year_val = indicatorData[that.nameArray.indexOf(d.id)]["yr_"+year];
                    // if(year_val != "")
                    this_.tooltip
                    .style("visibility","visible")
                    .html("Country: "+
                            this_.tooltip_render(country_name,year_val)+"</br>"+"Region: "+this_.tooltip_render(region_name,region_year_val));

                })
                .on("mouseout", function(d) {
                    let this_ = that;
                    this_.tooltip.style("visibility", "hidden");
                })
                .on("mousemove", function(d) {
                    let this_ = that;
                    this_.tooltip
                    .style("top", (d3.event.pageY - 20) + "px")
                    .style("left", (d3.event.pageX + 10) + "px");
                })
                .attr("fill",function(d){
                    if(that.nameArray.includes(d.id)){
                        let index = that.nameArray.indexOf(d.id);
                        let region_code = indicatorData[index]["Region_Code"];
                        if(region_code=="")
                            return "#bababa";
                        let r_index = that.nameArray.indexOf(region_code);
                        // console.log(r_index,region_code,index,d.id);
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

        //else fill according to country colors
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

    findregionorcountry(){
               let form = document.getElementById("radiobuttons");
        let form_val;
        for(let i=0; i<form.length; i++){
            if(form[i].checked)
              form_val = form[i].id;
          }
          return form_val;
    }

    tooltip_render(name,value){
        let text = "";
        if(value!="")
        return name+"</br>"+parseFloat(value).toFixed(2)+"%";
        else
        return name+"</br>Data missing"
    }

    handleClick(d,that){
    let line = that.lineObject;

    d3.selectAll(".clicked").classed("clicked",false);

    let color = document.getElementById(d3.select(d).property('id')).getAttribute("fill");

    //check for country or region
    let form = document.getElementById("radiobuttons");
    let form_val;
    for(let i=0; i<form.length; i++){
        if(form[i].checked)
          form_val = form[i].id;
      }


      if(color != "#bababa"){
        if(form_val=="region_radio"){
            let class_clicked =  document.getElementById(d3.select(d).property('id')).getAttribute("class");
            d3.selectAll("." +class_clicked)
                .classed("clicked",true);
            line.drawPlot(class_clicked);

        }
        else{
            d3.select("#"+d.id)
                .classed("clicked",true);
            line.drawPlot(d3.select(d).property('id'));
        }
        }

        if(color != "#bababa"){
            if(form_val=="region_radio"){
            if(event.bubbles){
                var e = document.createEvent('UIEvents');
                e.initUIEvent('click', false, true, /* ... */);
                let class_clicked =  document.getElementById(d3.select(d).property('id')).getAttribute("class").split(" ");
                d3.selectAll("#sunburst").select("#"+class_clicked[0]).node().dispatchEvent(e);
            }}
            else{
                if(event.bubbles){
                var e = document.createEvent('UIEvents');
                e.initUIEvent('click', false, true, /* ... */);
                let id = "#"+d.id;
                d3.selectAll("#sunburst").select(id).node().dispatchEvent(e);
                }
            }    
        }
        //d3.selectAll("#sunburst").select("#"+d3.select(this).property('id')).on("click")();
    }
}