class heatmap{

    //has to change on indicator and radio button selections

    constructor(data){
      this.data = data;
      this.nameArray = data["indicator1"].map(d => d.Country_Code);
    }
    
  

    plotheat_country() {
            let that =this;

            //for legend 
            let years = [];
            let year_axes = [];
            let country_codes = ["ABW","AFG","AGO","ALB","AND","ARE","ARG","ARM","ASM","ATG","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHR","BHS","BIH","BLR","BLZ","BMU","BOL","BRA","BRB","BRN","BTN","BWA","CAF","CAN","CHE","CHI","CHL","CHN","CIV","CMR","COD","COG","COL","COM","CPV","CRI","CUB","CUW","CYM","CYP","CZE","DEU","DJI","DMA","DNK","DOM","DZA","ECU","EGY","ERI","ESP","EST","ETH","FIN","FJI","FRA","FRO","FSM","GAB","GBR","GEO","GHA","GIN","GMB","GNB","GNQ","GRC","GRD","GRL","GTM","GUM","GUY","HKG","HND","HRV","HTI","HUN","IDN","IMN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KIR","KNA","KOR","KWT","LAO","LBN","LBR","LBY","LCA","LIE","LKA","LSO","LTU","LUX","LVA","MAC","MAF","MAR","MCO","MDA","MDG","MDV","MEX","MHL","MKD","MLI","MLT","MMR","MNE","MNG","MNP","MOZ","MRT","MUS","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PLW","PNG","POL","PRI","PRK","PRT","PRY","PSE","PYF","QAT","ROU","RUS","RWA","SAU","SDN","SEN","SGP","SLB","SLE","SLV","SMR","SOM","SRB","SSD","STP","SUR","SVK","SVN","SWE","SWZ","SXM","SYC","SYR","TCA","TCD","TGO","THA","TJK","TKM","TLS","TON","TTO","TUN","TUR","TUV","TZA","UGA","UKR","URY","USA","UZB","VCT","VEN","VIR","VNM","VUT","WSM","XKX","YEM","ZAF","ZMB","ZWE"];
            let country_axes = ["Aruba","Afghanistan","Angola","Albania","Andorra","United Arab Emirates","Argentina","Armenia","American Samoa","Antigua and Barbuda","Australia","Austria","Azerbaijan","Burundi","Belgium","Benin","Burkina Faso","Bangladesh","Bulgaria","Bahrain","Bahamas, The","Bosnia and Herzegovina","Belarus","Belize","Bermuda","Bolivia","Brazil","Barbados","Brunei Darussalam","Bhutan","Botswana","Central African Republic","Canada","Switzerland","Channel Islands","Chile","China","Cote d'Ivoire","Cameroon","Congo, Dem. Rep.","Congo, Rep.","Colombia","Comoros","Cabo Verde","Costa Rica","Cuba","Curacao","Cayman Islands","Cyprus","Czech Republic","Germany","Djibouti","Dominica","Denmark","Dominican Republic","Algeria","Ecuador","Egypt, Arab Rep.","Eritrea","Spain","Estonia","Ethiopia","Finland","Fiji","France","Faroe Islands","Micronesia, Fed. Sts.","Gabon","United Kingdom","Georgia","Ghana","Guinea","Gambia, The","Guinea-Bissau","Equatorial Guinea","Greece","Grenada","Greenland","Guatemala","Guam","Guyana","Hong Kong SAR, China","Honduras","Croatia","Haiti","Hungary","Indonesia","Isle of Man","India","Ireland","Iran, Islamic Rep.","Iraq","Iceland","Israel","Italy","Jamaica","Jordan","Japan","Kazakhstan","Kenya","Kyrgyz Republic","Cambodia","Kiribati","St. Kitts and Nevis","Korea, Rep.","Kuwait","Lao PDR","Lebanon","Liberia","Libya","St. Lucia","Liechtenstein","Sri Lanka","Lesotho","Lithuania","Luxembourg","Latvia","Macao SAR, China","St. Martin (French part)","Morocco","Monaco","Moldova","Madagascar","Maldives","Mexico","Marshall Islands","Macedonia, FYR","Mali","Malta","Myanmar","Montenegro","Mongolia","Northern Mariana Islands","Mozambique","Mauritania","Mauritius","Malawi","Malaysia","Namibia","New Caledonia","Niger","Nigeria","Nicaragua","Netherlands","Norway","Nepal","New Zealand","Oman","Pakistan","Panama","Peru","Philippines","Palau","Papua New Guinea","Poland","Puerto Rico","Korea, Dem. People’s Rep.","Portugal","Paraguay","West Bank and Gaza","French Polynesia","Qatar","Romania","Russian Federation","Rwanda","Saudi Arabia","Sudan","Senegal","Singapore","Solomon Islands","Sierra Leone","El Salvador","San Marino","Somalia","Serbia","South Sudan","Sao Tome and Principe","Suriname","Slovak Republic","Slovenia","Sweden","Swaziland","Sint Maarten (Dutch part)","Seychelles","Syrian Arab Republic","Turks and Caicos Islands","Chad","Togo","Thailand","Tajikistan","Turkmenistan","Timor-Leste","Tonga","Trinidad and Tobago","Tunisia","Turkey","Tuvalu","Tanzania","Uganda","Ukraine","Uruguay","United States","Uzbekistan","St. Vincent and the Grenadines","Venezuela, RB","Virgin Islands (U.S.)","Vietnam","Vanuatu","Samoa","Kosovo","Yemen, Rep.","South Africa","Zambia","Zimbabwe"];
            
            let index1 =0;
            let index2 =0;
            for(let i =1970; i<2018; i++){
              years[index1++] = "yr_"+i;
              year_axes[index2++] = i;
            }
              
            console.log(years,country_axes,year_axes,country_codes);
            
            //indicator selected
            let indicatorSelected = this.findIndicator();
            let indicatorData = this.data[indicatorSelected];

            console.log(indicatorData);


            var n = country_codes.length; //row
            var m = years.length; //column
            var matrix = new Array(n);
            for(var i = 0; i < n; i++) {
              matrix[i] = new Array(m);
              let index = that.nameArray.indexOf(country_codes[i]);
              for(var j = 0; j < m; j++) {
                if(indicatorData[index][years[j]]!="")
                  matrix[i][j] = parseFloat(indicatorData[index][years[j]]);
                else 
                  matrix[i][j] = 0;
              }
            }

            console.log(matrix);

            var width = 20*m; 
            var height = 20*n; 

            var svg = d3.select("#heatmap").append("svg").attr("id","allcells").attr("width", width).attr("height", height).attr("transform","translate(150, 200)");
            let g = svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");


            var scaleRow = d3.scaleBand().rangeRound([0, height]).domain(d3.range(n));
            var scaleCol = d3.scaleBand().rangeRound([0, width]).domain(d3.range(m));

            // var color = d3.scaleSequential(
            //     function(t) { return d3.interpolate("white", "steelblue")(t); }
            //   )
            //   .domain([0, d3.max(matrix, function(row) { return d3.max(row) })]);

            let color = d3.scaleQuantize()
                    .domain([1, 100])
                    .range(d3.schemeYlGnBu[9]);

            g.selectAll(".row")
              .data(matrix)
              .enter()
              .append("g")
              .attr("class", "row")
              .attr("transform", function(d, i) { return "translate(0," + scaleRow(i) + ")"; })
              .selectAll(".cell")
              .data(function(d) { return d })
              .enter()
              .append("rect")
              .attr("class", "cell")
              .attr("x", function(d, i) { return scaleCol(i); })
              .attr("width", scaleCol.bandwidth())
              .attr("height", scaleRow.bandwidth())
              .attr("opacity", 0.9)
              .attr("fill", function(d) {
                if (d==0) 
                  return "#bababa";
                else
                  return color(d); });

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
