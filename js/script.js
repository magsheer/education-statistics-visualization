/*-------------------------------------------DROPDOWN-----------------------------------------------*/
let dropdown_data = ["Adult literacy rate, population 15+ years, both sexes (%)", "Adult literacy rate, population 15+ years, female (%)","Adult literacy rate, population 15+ years, male (%)", "Adult literacy rate, population 15+ years, gender parity index (GPI)"];

let select = d3.select('.dropdown')
  .append('select')
    .attr('class','select')
    .on('change',onchange);

let options = select
  .selectAll('option')
    .data(dropdown_data).enter()
    .append('option')
        .text(function (d) { return d; });


/*-------------------------------------------INITIAL MAP-----------------------------------------------*/
d3.csv("/data/Viz_Adult literacy rate, population 15+ years, both sexes (%).csv", function(csvData) {
    let year = 1984
    console.log(csvData[0].year);
    let mapObject = new Map();
    mapObject.drawMap(csvData);
});
   

/*------------------------------------------WORLD MAP----------------------------------------------*/
// let csvData = d3.csv('data/Viz_Adult literacy rate, population 15+ years, both sexes (%).csv');



function onchange() {
    selectValue = d3.select('select').property('value');
    // d3.select("#worldmap").select("svg").remove();
    // let newMapObject = new Map();
    // d3.select('body')
    //     .append('p')
    //     .text(selectValue + ' is the last selected option.');
};
