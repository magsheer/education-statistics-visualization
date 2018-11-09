class lineChart{

	constructor(data, csvName){
		this.nameArray = data[csvName].map(d => d.Country_Code);
		this.indicatorData = data[csvName]
	}

	drawPlot(){
		let margin = {top: 40, right: 40, bottom: 40, left: 40},
		    width = 1250 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		let x = d3.scaleTime()
    	.domain([new Date(1970, 0, 1), new Date(2017, 0, 1)])
		    .range([0, width]);

		let y = d3.scaleLinear()
			.domain([0,100])
		    .range([height, 0]);

		// let line = d3.line()
		//     .defined(function(d) { return d; })
		//     .x(function(d) { return x(d.x); })
		//     .y(function(d) { return y(d.y); });

		let svg = d3.select("#linechart").append("svg").attr("id","lineChartSVG")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
			.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
		    .attr("class", "x_axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x)
		    	.tickFormat(d3.timeFormat("%Y"))
		    	.ticks(d3.timeYear)
		    	)
		    .selectAll("text")
		    .attr("y", 0)
    		.attr("x", -20)
    		.attr("dy", ".35em")
		    .attr("transform", "rotate(-90)");

		svg.append("g")
		    .attr("class", "y_axis")
		    .call(d3.axisLeft(y));

		//create data array ([year,%])
		let index = this.nameArray.indexOf("WLD");
		let country_data = this.indicatorData[index];
		let plotData = [];
		let plotDataItem = [];
		for(let i=1970;i<2017;i++){
			let yr_csv = "yr_" + i;
			let value = country_data[yr_csv];
			plotDataItem = [];
			plotDataItem.push(x(new Date(i, 0, 1)));
			if(value == "")
				plotDataItem.push(null);
			else
				plotDataItem.push(y(parseFloat(value)));
			plotData.push(plotDataItem)
		}

		var line = d3.line()
  					.defined(function (d) { return d[1] !== null; });


  		var filteredData = plotData.filter(line.defined());

  		d3.select('#lineChartSVG').append("path").attr("id","segments-line").attr('d', line(plotData)).attr("class", "line").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	}
}