
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
    // let selectValue = d3.select('select').property('value');
    // console.log(selectValue);s
    // d3.select("#worldmap").select("svg").remove();
    // let newMapObject = new Map();
    // d3.select('body')
    //     .append('p')
    //     .text(selectValue + ' is the last selected option.');
    let year = d3.select("#yearslider").select('input').property('value');
    mapObject.updateCountryMap(year);
};

/*-------------------------------------------RADIOBUTTONS-----------------------------------------------*/

let radios = d3.select("#radiobuttons")
                .on("change",onRadiobuttonChange);

function onRadiobuttonChange(){
    // let form = document.getElementById("radiobuttons");
    // let form_val;
    // for(let i=0; i<form.length; i++){
    //         if(form[i].checked)
    //           form_val = form[i].id;
    //       }
    // if(form_val == "region_radio"){
    //     console.log("call regionmap");
    // }
    // else{
    //     let year = d3.select("#yearslider").select('input').property('value');
    //     mapObject.updateCountryMap(year);
    // }
        let year = d3.select("#yearslider").select('input').property('value');
        mapObject.updateCountryMap(year);

}


/*-------------------------------------------INITIAL MAP, CHARTS-----------------------------------------------*/

let mapObject = new Map(allCSVdata);
d3.json('data/world.json').then(mapData => {
        mapObject.drawInitialMap(mapData);
    });

let sunburstObject = new Sunburst();
sunburstObject.drawSunburst();

let lineObject = new lineChart(allCSVdata, 'indicator1');
lineObject.drawPlot();


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
                update(year);
            });

function update(year){
        slider.property("value", year);
        d3.select("#year").text(year);
        mapObject.updateCountryMap(year);
    }
   

/*------------------------------------------WORLD MAP ON CHANGES----------------------------------------------*/


});

/*---------------------------------------------SUNBURST CHART-------------------------------------------------*/



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