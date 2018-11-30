class lineChart{

	constructor(data){
		this.data = data;
		this.nameArray = data["indicator1"].map(d => d.Country_Code);
	}

	drawPlot(country_region){

		//find out the indicator selected
        let indicatorSelected = this.findIndicator();
        let indicatorData = this.data[indicatorSelected];

		let margin = {top: 40, right: 40, bottom: 40, left: 40},
		    width = 1250 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		let x = d3.scaleTime()
    	.domain([new Date(1970, 0, 1), new Date(2017, 0, 1)])
		    .range([0, width]);

		let y = d3.scaleLinear()
			.domain([0,100])
		    .range([height, 0]);

		d3.select("#world-line").remove();
		d3.select("#lineChartSVG").remove();

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

		// ************************************************LINE CHART***************************************************

		//create data array ([year,%])
		let index = this.nameArray.indexOf("WLD");
		let country_data = indicatorData[index];
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
  		d3.select("#world-line").remove();
  		d3.select('#lineChartSVG')
  			.append("path")
  			.attr("id","world_line")
  			.attr('d', line(filteredData))
  			.attr("class", "line")
  			.style("opacity",1)
  			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let dataForCircles = plotData.filter(d=>d[1]!=null);
		d3.select("#lineChartSVG")
			.selectAll("circle")	
			.data(dataForCircles)
			.enter()		  			
  			.append("circle")
  			.attr("r",3)
  			.attr("class","dot")
  			.attr("cx",function(d){return d[0]})
  			.attr("cy",function(d){return d[1]})
  			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	// ************************************************BAR CHART***************************************************
		let g = svg.append('g').attr("id","rectg").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		index = this.nameArray.indexOf(country_region);
		country_data = indicatorData[index];
		plotData = [];
		plotDataItem = [];
		for(let i=1970;i<2017;i++){
			let yr_csv = "yr_" + i;
			let value = country_data[yr_csv];
			plotDataItem = [];
			plotDataItem.push(x(new Date(i, 0, 1)));
			if(value == "")
				plotDataItem.push(0);
			else
				plotDataItem.push(y(parseFloat(value)));
			plotData.push(plotDataItem)
		}

		let bars = g.selectAll("rect")
					.data(plotData);

		bars.enter()
			.append("rect")
			.attr("class",country_region)
			.attr("id","rectg")
			.style("fill","#1b9e77")
			.attr("x",function(d){return d[0]-47;})
            .attr("y",function(d){return d[1]-40;})
			.attr("width",14)
            .attr("height",function(d){
            	if(d[1]==0)
            		return 0;
            	else
            		return 420 - d[1]});


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

}