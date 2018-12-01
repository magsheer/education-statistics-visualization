
loadData().then(allCSVdata => {
/*-------------------------------------------DROPDOWN-----------------------------------------------*/
let dropdown_data = ["Adult literacy rate, population 15+ years, both sexes (%)", "Adult literacy rate, population 15+ years, female (%)","Adult literacy rate, population 15+ years, male (%)"];

let select = d3.select('#dropdown')
                .append('select')
                .attr('class','select')
                .on('change',onDropdownChange);

let options = select
                .selectAll('option')
                .data(dropdown_data).enter()
                .append('option')
                .text(function (d) { return d; });

function onDropdownChange() {
    // d3.select('body')
    //     .append('p')
    //     .text(selectValue + ' is the last selected option.');
    let year = d3.select("#yearslider").select('input').property('value');
    mapObject.updateMap(year);
    let current_selection = document.getElementById("rectg").getAttribute("class");
    lineObject.drawPlot(current_selection);
    heatmapObject.updateHeatMap();
};

/*-------------------------------------------RADIOBUTTONS-----------------------------------------------*/

let radios = d3.select("#radiobuttons")
                .on("change",onRadiobuttonChange);

function onRadiobuttonChange(){
    
        let year = d3.select("#yearslider").select('input').property('value');
        mapObject.updateMap(year);
        d3.selectAll(".clicked").classed("clicked",false);
        heatmapObject.updateHeatMap();

}
/*---------------------------------------------CHECKBOX-----------------------------------------------------*/
d3.select("#compare_world").on("change",function(){
    let opacity = d3.select("#world_line").style("opacity");
    let newOpacity = (opacity==1) ? 0 : 1;
        // Hide or show the elements
        d3.select("#world_line").style("opacity", newOpacity);
        d3.selectAll(".dot").style("opacity", newOpacity);
        
});



/*-------------------------------------------INITIAL MAP, CHARTS-----------------------------------------------*/

let lineObject = new lineChart(allCSVdata);
lineObject.drawPlot("WLD");

let infoboxObject = new infobox(allCSVdata);

let mapObject = new Map(allCSVdata,lineObject,infoboxObject);
d3.json('data/world.json').then(mapData => {
        mapObject.drawInitialMap(mapData);
    });

let sunburstObject = new Sunburst();
sunburstObject.drawSunburst();

let heatmapObject = new heatmap(allCSVdata);
heatmapObject.drawLegend();
heatmapObject.plotheat_country();


/*-------------------------------------------YEAR SLIDER-----------------------------------------------*/
let slider = d3.select("#yearslider")
        .append("input")
            .attr("type", "range")
            .attr("min", 1970)
            .attr("max", 2017)
            .attr("step", 1)
            //initial year
            .property("value",2016)
            .on("input", function() {
                var year = this.value;
                updateSlider(year);
            });


// infoboxObject.updateInfo("IND");

function updateSlider(year){
        slider.property("value", year);
        d3.select("#year").text(year);
        mapObject.updateMap(year);
    }


function updateViews(){
    let year = d3.select("#yearslider").select('input').property('value');
    mapObject.updateMap(year);
    // lineObject.drawPlot();
}

});

/*---------------------------------------------LINE CHART-------------------------------------------------*/


/*-----------------------------------------LOAD CSV-------------------------------------------------*/
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

//load all csv files related to the indicators mentioned in the dropdown
async function loadData() {
    let indicator1 = await loadFile('data/adult_literacy_rate_both_sexes.csv');
    let indicator2 = await loadFile('data/adult_literacy_rate_female.csv');
    let indicator3 = await loadFile('data/adult_literacy_rate_male.csv');

    return {
        'indicator1': indicator1,
        'indicator2': indicator2,
        'indicator3': indicator3,
    };
}