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

/*-------------------------------------------YEAR SLIDER-----------------------------------------------*/
var slider = d3.select("#yearslider")
        .append("input")
            .attr("type", "range")
            .attr("min", 1940)
            .attr("max", 2018)
            .attr("step", 1)
            .on("input", function() {
                var year = this.value;
                update(year);
            });

function update(year){
        slider.property("value", year);
        d3.select("#year").text(year);
    }


/*-------------------------------------------INITIAL MAP-----------------------------------------------*/
let mapObject = new Map();
d3.json('data/world.json').then(mapData => {
        mapObject.drawMap(mapData);
    });
   

/*------------------------------------------WORLD MAP----------------------------------------------*/

function onchange() {
    selectValue = d3.select('select').property('value');
    // d3.select("#worldmap").select("svg").remove();
    // let newMapObject = new Map();
    // d3.select('body')
    //     .append('p')
    //     .text(selectValue + ' is the last selected option.');
};
