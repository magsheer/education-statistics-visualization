class infobox{
	
	constructor(data){
		this.data = data;
		this.nameArray = data["indicator1"].map(d => d.Country_Code);
	}

	updateInfo(id){
		//check country or region
		// d3.select("#infobox").append("div").attr("id","checkText").append("text").attr("id","gdpLabel").text("GDP per capita : ").style("float","left");
		let country_or_region = this.findregionorcountry();
		if(country_or_region == "region_radio")
			this.populate_region(id);
		else
			this.populate_country(id);


	}

	populate_country(id){

		d3.select("#checkText").remove();

		let indicatorSelected = this.findIndicator();
		let year = this.findyear();
        let indicatorData = this.data[indicatorSelected];

		let that = this;
		let index = that.nameArray.indexOf(id);

		
		let data_needed = indicatorData[index][year];

		d3.select("#infobox").append("div").attr("id","checkText").style("visibility","visible");
		d3.select("#checkText").append("text").text(" Country: "+indicatorData[index]["Country_Name"]).attr("dy", "0em");
		//region//income group//surveys
		d3.select("#checkText").append("div").append("text").text(" Region: "+indicatorData[index]["Region_name"]).attr("dy", "1em");
		d3.select("#checkText").append("div").append("text").text(" Income group: "+indicatorData[index]["Income_Group"]);

		if(indicatorData[index]["household_survey"]!="")
			d3.select("#checkText").append("div").append("text").text(" Latest household survey: "+indicatorData[index]["household_survey"]);
		if(indicatorData[index]["most_recent_survey"])
			d3.select("#checkText").append("div").append("text").text(" Source of most recent Income and expenditure data: "+indicatorData[index]["most_recent_survey"]);

	}

	populate_region(id){
		d3.select("#checkText").remove();
		let that = this;

		let indicatorSelected = this.findIndicator();
		let year = this.findyear();
        let indicatorData = this.data[indicatorSelected];
        let index = that.nameArray.indexOf(id);

		

		d3.select("#infobox").append("div").attr("id","checkText").style("visibility","visible");
		d3.select("#checkText").append("text").text("Region: "+indicatorData[index]["Country_Name"]).attr("dy", "0em");
		switch(id){
			case "ECS": 
					if(indicatorData[index][year]!=""){
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate including high income countries: "+indicatorData[that.nameArray.indexOf(id)][year]+"%").attr("dy", "0em");
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate not including high income countries: "+indicatorData[that.nameArray.indexOf("ECA")][year]+"%").attr("dy", "0em");
					}
					break;

			case "EAS": 
					if(indicatorData[index][year]!=""){
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate including high income countries: "+indicatorData[that.nameArray.indexOf(id)][year]+"%").attr("dy", "0em");
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate not including high income countries: "+indicatorData[that.nameArray.indexOf("EAP")][year]+"%").attr("dy", "0em");
					}
					break;

			case "MEA":
					if(indicatorData[index][year]!=""){
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate including high income countries: "+indicatorData[that.nameArray.indexOf(id)][year]+"%").attr("dy", "0em");
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate not including high income countries: "+indicatorData[that.nameArray.indexOf("MNA")][year]+"%").attr("dy", "0em");
					}
					break;

			case "LCN":
					if(indicatorData[index][year]!=""){
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate including high income countries: "+indicatorData[that.nameArray.indexOf(id)][year]+"%").attr("dy", "0em");
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate not including high income countries: "+xindicatorData[that.nameArray.indexOf("LAC")][year]+"%").attr("dy", "0em");
					}
					break;

			case "SAS":
					d3.select("#checkText").append("div").append("text").text("South Asia regional aggregate. There are no economies in South Asia classified as high income.").attr("dy", "0em");
					break;

			case "NAC": 
					d3.select("#checkText").append("div").append("text").text("North America regional aggregate. There are no economies in North America classified as low or middle income.").attr("dy", "0em");
					break;

			case "SSF":
				if(indicatorData[index][year]!=""){
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate including high income countries: "+indicatorData[that.nameArray.indexOf(id)][year]+"%").attr("dy", "0em");
						d3.select("#checkText").append("div").append("text").text("Adult literacy rate not including high income countries: "+indicatorData[that.nameArray.indexOf("SSA")][year]+"%").attr("dy", "0em");
					}
					break;

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


}