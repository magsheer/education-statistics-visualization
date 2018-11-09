loadData().then(allCSVdata => {
/*-------------------------------------------DROPDOWN-----------------------------------------------*/
let dropdown_data = ["Adult literacy rate, population 15+ years, both sexes (%)", "Adult literacy rate, population 15+ years, female (%)","Adult literacy rate, population 15+ years, male (%)", "Adult literacy rate, population 15+ years, gender parity index (GPI)"];

let select = d3.select('#dropdown')
  .append('select')
    .attr('class','select')
    .on('change',onchange);

let options = select
  .selectAll('option')
    .data(dropdown_data).enter()
    .append('option')
        .text(function (d) { return d; });



/*-------------------------------------------INITIAL MAP, CHARTS-----------------------------------------------*/

let mapObject = new Map(allCSVdata, 'indicator1');
d3.json('data/world.json').then(mapData => {
        mapObject.drawMap(mapData);
    });

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
        mapObject.updateMap(year);
    }
   

/*------------------------------------------WORLD MAP ON CHANGES----------------------------------------------*/

function onchange() {
    selectValue = d3.select('select').property('value');
    // d3.select("#worldmap").select("svg").remove();
    // let newMapObject = new Map();
    // d3.select('body')
    //     .append('p')
    //     .text(selectValue + ' is the last selected option.');
};
});

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


async function loadData() {
    let indicator1 = await loadFile('data/adult_literacy_rate_both_sexes.csv');

    return {
        'indicator1': indicator1,
    };
}
