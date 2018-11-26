class Sunburst{

	constructor(){

	}

	drawSunburst(){

		  //all dimensions
		  let width = 500;
		  let height = 300;
		  let radius = Math.min(width, height) / 2;
		  let centerRadius = 0.4 * radius;
		  let backCircleRadius = 0.1 * radius;

		  let data = this.jsonData();

		  //svg
		  let svg = d3.select("#sunburst").append("svg").attr("width", width).attr("height", height);
		  let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

		  //coloscale
		  let colorScale = d3.scaleOrdinal().range([
		    // "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
		    "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2271b5", "#09519c", "#08306b", "#08306b", "#deebf7"
		  ]);
		  // let colorScale = d3.scaleOrdinal.schemeYlGnBu[9];
		  let xScale = d3.scaleLinear().range([0, 2 * Math.PI]);
		  let rScale = d3.scaleLinear().range([0.4 * radius, radius]);

		
		  let root = d3.hierarchy(data);
		  root.sum(function(d) { return d.value; })
		    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

		  let partition = d3.partition();
		  partition(root);

		
		  let arc = d3.arc()
		    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xScale(d.x0))); })
		    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xScale(d.x1))); })
		    .innerRadius(function(d) { return Math.max(0, rScale(d.y0)); })
		    .outerRadius(function(d) { return Math.max(0, rScale(d.y1)); });

		  g.selectAll("path")
		    .data(root.descendants())
		    .enter()
		    .append("path")
		    .attr("d", arc)
		    .attr('stroke', '#fff')
		    .attr("fill", function(d) {
		      while(d.depth > 1) d = d.parent;
		      if(d.depth == 0) return "lightgray";
		      return colorScale(d.value);
		    })
		    .attr("opacity", 0.8)
		    .on("click", click)
		    .append("title")
		    .text(function(d) { return d.data.tooltip_name; });

		  g.selectAll("text")
		    .data(root.descendants())
		    .enter()
		    .append("text")
		    .attr("fill", "black")
		    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		    .attr("dy", "5px")
		    .attr("font", "10px")
		    .attr("text-anchor", "middle")
		    .on("click", click)
		    .text(function(d) { return d.data.name; })
		    .style('font-size','8px');

		
		  function click(d) {
		    let tween = g.transition()
		      .duration(500)
		      .tween("scale", function() {
		        let xdomain = d3.interpolate(xScale.domain(), [d.x0, d.x1]);
		        let ydomain = d3.interpolate(rScale.domain(), [d.y0, 1]);
		        let yrange = d3.interpolate(rScale.range(), [d.y0 ? backCircleRadius : centerRadius, radius]);
		        return function(t) {
		          xScale.domain(xdomain(t));
		          rScale.domain(ydomain(t)).range(yrange(t));
		        };
		      });

		    tween.selectAll("path")
		      .attrTween("d", function(d) {
		        return function() {
		          return arc(d);
		        };
		      });

		    tween.selectAll("text")
		      .attrTween("transform", function(d) {
		        return function() {
		          return "translate(" + arc.centroid(d) + ")";
		        };
		      })
		      .attrTween("opacity", function(d) {
		        return function() {
		          return(xScale(d.x0) < 2 * Math.PI) && (xScale(d.x1) > 0.0) && (rScale(d.y1) > 0.0) ? 1.0 : 0;
		        };
		      })
		      .attrTween("font", function(d) {
		        return function() {
		          return(xScale(d.x0) < 2 * Math.PI) && (xScale(d.x1) > 0.0) && (rScale(d.y1) > 0.0) ? "10px" : 1e-6;
		        };
		      });
		  }

	}

	jsonData(){
    let toReturn = {
    "name": "WORLD",
    "children": [
      { "name": "EA&P", "tooltip_name":"East Asia & Pacific",
        "children": [
            {
              "name": "ASM",
              "tooltip_name": "American Samoa",
              "value": 10
            },
            {
              "name": "AUS",
              "tooltip_name": "Australia",
              "value": 10
            },
            {
              "name": "BRN",
              "tooltip_name": "Brunei",
              "value": 10
            },
            {
              "name": "CHN",
              "tooltip_name": "China",
              "value": 10
            },
            {
              "name": "FJI",
              "tooltip_name": "Fiji",
              "value": 10
            },
            {
              "name": "FSM",
              "tooltip_name": "Micronesia",
              "value": 10
            },
            {
              "name": "GUM",
              "tooltip_name": "Guam",
              "value": 10
            },
            {
              "name": "HKG",
              "tooltip_name": "Hong Kong SAR, China",
              "value": 10
            },
            {
              "name": "IDN",
              "tooltip_name": "Indonesia",
              "value": 10
            },
            {
              "name": "JPN",
              "tooltip_name": "Japan",
              "value": 10
            },
            {
              "name": "KHM",
              "tooltip_name": "Cambodia",
              "value": 10
            },
            {
              "name": "KIR",
              "tooltip_name": "Kiribati",
              "value": 10
            },
            {
              "name": "KOR",
              "tooltip_name": "Korea",
              "value": 10
            },
            {
              "name": "LAO",
              "tooltip_name": "Lao PDR",
              "value": 10
            },
            {
              "name": "MAC",
              "tooltip_name": "Macao SAR, China",
              "value": 10
            },
            {
              "name": "MHL",
              "tooltip_name": "Marshall Islands",
              "value": 10
            },
            {
              "name": "MMR",
              "tooltip_name": "Myanmar",
              "value": 10
            },
            {
              "name": "MNG",
              "tooltip_name": "Mongolia",
              "value": 10
            },
            {
              "name": "MNP",
              "tooltip_name": "Northern Mariana Islands",
              "value": 10
            },
            {
              "name": "MYS",
              "tooltip_name": "Malaysia",
              "value": 10
            },
            {
              "name": "NCL",
              "tooltip_name": "New Caledonia",
              "value": 10
            },
            {
              "name": "NZL",
              "tooltip_name": "New Zealand",
              "value": 10
            },
            {
              "name": "PHL",
              "tooltip_name": "Philippines",
              "value": 10
            },
            {
              "name": "PLW",
              "tooltip_name": "Palau",
              "value": 10
            },
            {
              "name": "PNG",
              "tooltip_name": "Papua New Guinea",
              "value": 10
            },
            {
              "name": "PRK",
              "tooltip_name": "Dem. People's Rep. Korea",
              "value": 10
            },
            {
              "name": "PYF",
              "tooltip_name": "French Polynesia",
              "value": 10
            },
            {
              "name": "SGP",
              "tooltip_name": "Singapore",
              "value": 10
            },
            {
              "name": "SLB",
              "tooltip_name": "Solomon Islands",
              "value": 10
            },
            {
              "name": "THA",
              "tooltip_name": "Thailand",
              "value": 10
            },
            {
              "name": "TLS",
              "tooltip_name": "Timor-Leste",
              "value": 10
            },
            {
              "name": "TON",
              "tooltip_name": "Tonga",
              "value": 10
            },
            {
              "name": "TUV",
              "tooltip_name": "Tuvalu",
              "value": 10
            },
            {
              "name": "VNM",
              "tooltip_name": "Vietnam",
              "value": 10
            },
            {
              "name": "VUT",
              "tooltip_name": "Vanuatu",
              "value": 10
            },
            {
              "name": "WSM",
              "tooltip_name": "Samoa",
              "value": 10
            }
          ]
      },

      {
        "name": "E&CA", "tooltip_name": "Europe & Central Asia",
        "children": [
              {
                "name": "ALB",
                "tooltip_name": "Albania",
                "value": 10
              },
              {
                "name": "AND",
                "tooltip_name": "Andorra",
                "value": 10
              },
              {
                "name": "ARM",
                "tooltip_name": "Armenia",
                "value": 10
              },
              {
                "name": "AUT",
                "tooltip_name": "Austria",
                "value": 10
              },
              {
                "name": "AZE",
                "tooltip_name": "Azerbaijan",
                "value": 10
              },
              {
                "name": "BEL",
                "tooltip_name": "Belgium",
                "value": 10
              },
              {
                "name": "BGR",
                "tooltip_name": "Bulgaria",
                "value": 10
              },
              {
                "name": "BIH",
                "tooltip_name": "Bosnia and Herzegovina",
                "value": 10
              },
              {
                "name": "BLR",
                "tooltip_name": "Belarus",
                "value": 10
              },
              {
                "name": "CHE",
                "tooltip_name": "Switzerland",
                "value": 10
              },
              {
                "name": "CHI",
                "tooltip_name": "Channel Islands",
                "value": 10
              },
              {
                "name": "CYP",
                "tooltip_name": "Cyprus",
                "value": 10
              },
              {
                "name": "CZE",
                "tooltip_name": "Czech Republic",
                "value": 10
              },
              {
                "name": "DEU",
                "tooltip_name": "Germany",
                "value": 10
              },
              {
                "name": "DNK",
                "tooltip_name": "Denmark",
                "value": 10
              },
              {
                "name": "ESP",
                "tooltip_name": "Spain",
                "value": 10
              },
              {
                "name": "EST",
                "tooltip_name": "Estonia",
                "value": 10
              },
              {
                "name": "FIN",
                "tooltip_name": "Finland",
                "value": 10
              },
              {
                "name": "FRA",
                "tooltip_name": "France",
                "value": 10
              },
              {
                "name": "FRO",
                "tooltip_name": "Faeroe Islands",
                "value": 10
              },
              {
                "name": "GBR",
                "tooltip_name": "United Kingdom",
                "value": 10
              },
              {
                "name": "GEO",
                "tooltip_name": "Georgia",
                "value": 10
              },
              {
                "name": "GRC",
                "tooltip_name": "Greece",
                "value": 10
              },
              {
                "name": "GRL",
                "tooltip_name": "Greenland",
                "value": 10
              },
              {
                "name": "HRV",
                "tooltip_name": "Croatia",
                "value": 10
              },
              {
                "name": "HUN",
                "tooltip_name": "Hungary",
                "value": 10
              },
              {
                "name": "IMN",
                "tooltip_name": "Isle of Man",
                "value": 10
              },
              {
                "name": "IRL",
                "tooltip_name": "Ireland",
                "value": 10
              },
              {
                "name": "ISL",
                "tooltip_name": "Iceland",
                "value": 10
              },
              {
                "name": "ITA",
                "tooltip_name": "Italy",
                "value": 10
              },
              {
                "name": "KAZ",
                "tooltip_name": "Kazakhstan",
                "value": 10
              },
              {
                "name": "KGZ",
                "tooltip_name": "Kyrgyz Republic",
                "value": 10
              },
              {
                "name": "LIE",
                "tooltip_name": "Liechtenstein",
                "value": 10
              },
              {
                "name": "LTU",
                "tooltip_name": "Lithuania",
                "value": 10
              },
              {
                "name": "LUX",
                "tooltip_name": "Luxembourg",
                "value": 10
              },
              {
                "name": "LVA",
                "tooltip_name": "Latvia",
                "value": 10
              },
              {
                "name": "MCO",
                "tooltip_name": "Monaco",
                "value": 10
              },
              {
                "name": "MDA",
                "tooltip_name": "Moldova",
                "value": 10
              },
              {
                "name": "MKD",
                "tooltip_name": "Macedonia",
                "value": 10
              },
              {
                "name": "MNE",
                "tooltip_name": "Montenegro",
                "value": 10
              },
              {
                "name": "NLD",
                "tooltip_name": "Netherlands",
                "value": 10
              },
              {
                "name": "NOR",
                "tooltip_name": "Norway",
                "value": 10
              },
              {
                "name": "POL",
                "tooltip_name": "Poland",
                "value": 10
              },
              {
                "name": "PRT",
                "tooltip_name": "Portugal",
                "value": 10
              },
              {
                "name": "ROU",
                "tooltip_name": "Romania",
                "value": 10
              },
              {
                "name": "RUS",
                "tooltip_name": "Russia",
                "value": 10
              },
              {
                "name": "SMR",
                "tooltip_name": "San Marino",
                "value": 10
              },
              {
                "name": "SRB",
                "tooltip_name": "Serbia",
                "value": 10
              },
              {
                "name": "SVK",
                "tooltip_name": "Slovak Republic",
                "value": 10
              },
              {
                "name": "SVN",
                "tooltip_name": "Slovenia",
                "value": 10
              },
              {
                "name": "SWE",
                "tooltip_name": "Sweden",
                "value": 10
              },
              {
                "name": "TJK",
                "tooltip_name": "Tajikistan",
                "value": 10
              },
              {
                "name": "TKM",
                "tooltip_name": "Turkmenistan",
                "value": 10
              },
              {
                "name": "TUR",
                "tooltip_name": "Turkey",
                "value": 10
              },
              {
                "name": "UKR",
                "tooltip_name": "Ukraine",
                "value": 10
              },
              {
                "name": "UZB",
                "tooltip_name": "Uzbekistan",
                "value": 10
              },
              {
                "name": "XKX",
                "tooltip_name": "Kosovo",
                "value": 10
              }
            ]
      },
      { "name": "LA&C", "tooltip_name": "Latin America & Carribean",
        "children":
              [
              {
                "name": "ABW",
                "tooltip_name": "Aruba",
                "value": 10
              },
              {
                "name": "ARG",
                "tooltip_name": "Argentina",
                "value": 10
              },
              {
                "name": "ATG",
                "tooltip_name": "Antigua and Barbuda",
                "value": 10
              },
              {
                "name": "BHS",
                "tooltip_name": "The Bahamas",
                "value": 10
              },
              {
                "name": "BLZ",
                "tooltip_name": "Belize",
                "value": 10
              },
              {
                "name": "BOL",
                "tooltip_name": "Bolivia",
                "value": 10
              },
              {
                "name": "BRA",
                "tooltip_name": "Brazil",
                "value": 10
              },
              {
                "name": "BRB",
                "tooltip_name": "Barbados",
                "value": 10
              },
              {
                "name": "CHL",
                "tooltip_name": "Chile",
                "value": 10
              },
              {
                "name": "COL",
                "tooltip_name": "Colombia",
                "value": 10
              },
              {
                "name": "CRI",
                "tooltip_name": "Costa Rica",
                "value": 10
              },
              {
                "name": "CUB",
                "tooltip_name": "Cuba",
                "value": 10
              },
              {
                "name": "CUW",
                "tooltip_name": "Curaçao",
                "value": 10
              },
              {
                "name": "CYM",
                "tooltip_name": "Cayman Islands",
                "value": 10
              },
              {
                "name": "DMA",
                "tooltip_name": "Dominica",
                "value": 10
              },
              {
                "name": "DOM",
                "tooltip_name": "Dominican Republic",
                "value": 10
              },
              {
                "name": "ECU",
                "tooltip_name": "Ecuador",
                "value": 10
              },
              {
                "name": "GRD",
                "tooltip_name": "Grenada",
                "value": 10
              },
              {
                "name": "GTM",
                "tooltip_name": "Guatemala",
                "value": 10
              },
              {
                "name": "GUY",
                "tooltip_name": "Guyana",
                "value": 10
              },
              {
                "name": "HND",
                "tooltip_name": "Honduras",
                "value": 10
              },
              {
                "name": "HTI",
                "tooltip_name": "Haiti",
                "value": 10
              },
              {
                "name": "JAM",
                "tooltip_name": "Jamaica",
                "value": 10
              },
              {
                "name": "KNA",
                "tooltip_name": "St. Kitts and Nevis",
                "value": 10
              },
              {
                "name": "LCA",
                "tooltip_name": "St. Lucia",
                "value": 10
              },
              {
                "name": "MAF",
                "tooltip_name": "St. Martin (French part)",
                "value": 10
              },
              {
                "name": "MEX",
                "tooltip_name": "Mexico",
                "value": 10
              },
              {
                "name": "NIC",
                "tooltip_name": "Nicaragua",
                "value": 10
              },
              {
                "name": "PAN",
                "tooltip_name": "Panama",
                "value": 10
              },
              {
                "name": "PER",
                "tooltip_name": "Peru",
                "value": 10
              },
              {
                "name": "PRI",
                "tooltip_name": "Puerto Rico",
                "value": 10
              },
              {
                "name": "PRY",
                "tooltip_name": "Paraguay",
                "value": 10
              },
              {
                "name": "SLV",
                "tooltip_name": "El Salvador",
                "value": 10
              },
              {
                "name": "SUR",
                "tooltip_name": "Suriname",
                "value": 10
              },
              {
                "name": "SXM",
                "tooltip_name": "Sint Maarten (Dutch part)",
                "value": 10
              },
              {
                "name": "TCA",
                "tooltip_name": "Turks and Caicos Islands",
                "value": 10
              },
              {
                "name": "TTO",
                "tooltip_name": "Trinidad and Tobago",
                "value": 10
              },
              {
                "name": "URY",
                "tooltip_name": "Uruguay",
                "value": 10
              },
              {
                "name": "VCT",
                "tooltip_name": "St. Vincent and the Grenadines",
                "value": 10
              },
              {
                "name": "VEN",
                "tooltip_name": "Venezuela",
                "value": 10
              },
              {
                "name": "VIR",
                "tooltip_name": "Virgin Islands",
                "value": 10
              }
            ]
       },
      {
        "name": "ME&NA", "tooltip_name":"Middle East & North Africa",
        "children": 
        [
              {
                "name": "ARE",
                "tooltip_name": "United Arab Emirates",
                "value": 10
              },
              {
                "name": "BHR",
                "tooltip_name": "Bahrain",
                "value": 10
              },
              {
                "name": "DJI",
                "tooltip_name": "Djibouti",
                "value": 10
              },
              {
                "name": "DZA",
                "tooltip_name": "Algeria",
                "value": 10
              },
              {
                "name": "EGY",
                "tooltip_name": "Egypt",
                "value": 10
              },
              {
                "name": "IRN",
                "tooltip_name": "Iran",
                "value": 10
              },
              {
                "name": "IRQ",
                "tooltip_name": "Iraq",
                "value": 10
              },
              {
                "name": "ISR",
                "tooltip_name": "Israel",
                "value": 10
              },
              {
                "name": "JOR",
                "tooltip_name": "Jordan",
                "value": 10
              },
              {
                "name": "KWT",
                "tooltip_name": "Kuwait",
                "value": 10
              },
              {
                "name": "LBN",
                "tooltip_name": "Lebanon",
                "value": 10
              },
              {
                "name": "LBY",
                "tooltip_name": "Libya",
                "value": 10
              },
              {
                "name": "MAR",
                "tooltip_name": "Morocco",
                "value": 10
              },
              {
                "name": "MLT",
                "tooltip_name": "Malta",
                "value": 10
              },
              {
                "name": "OMN",
                "tooltip_name": "Oman",
                "value": 10
              },
              {
                "name": "PSE",
                "tooltip_name": "West Bank and Gaza",
                "value": 10
              },
              {
                "name": "QAT",
                "tooltip_name": "Qatar",
                "value": 10
              },
              {
                "name": "SAU",
                "tooltip_name": "Saudi Arabia",
                "value": 10
              },
              {
                "name": "SYR",
                "tooltip_name": "Syrian Arab Republic",
                "value": 10
              },
              {
                "name": "TUN",
                "tooltip_name": "Tunisia",
                "value": 10
              },
              {
                "name": "YEM",
                "tooltip_name": "Yemen",
                "value": 10
              }
            ]
      },
      { "name": "NA", "tooltip_name":"North America",
        "children": [
              {
                "name": "BMU",
                "tooltip_name": "Bermuda",
                "value": 10
              },
              {
                "name": "CAN",
                "tooltip_name": "Canada",
                "value": 10
              },
              {
                "name": "USA",
                "tooltip_name": "United States",
                "value": 10
              }
            ]
      },
      { "name": "SA", "tooltip_name":"South Asia",
        "children": 
        [
            {
              "name": "AFG",
              "tooltip_name": "Afghanistan",
              "value": 10
            },
            {
              "name": "BGD",
              "tooltip_name": "Bangladesh",
              "value": 10
            },
            {
              "name": "BTN",
              "tooltip_name": "Bhutan",
              "value": 10
            },
            {
              "name": "IND",
              "tooltip_name": "India",
              "value": 10
            },
            {
              "name": "LKA",
              "tooltip_name": "Sri Lanka",
              "value": 10
            },
            {
              "name": "MDV",
              "tooltip_name": "Maldives",
              "value": 10
            },
            {
              "name": "NPL",
              "tooltip_name": "Nepal",
              "value": 10
            },
            {
              "name": "PAK",
              "tooltip_name": "Pakistan",
              "value": 10
            }
          ]
      },
      { "name": "SSA", "tooltip_name":"Sub-Saharan Africa",
        "children": [
                  {
                    "name": "AGO",
                    "tooltip_name": "Angola",
                    "value": 10
                  },
                  {
                    "name": "BDI",
                    "tooltip_name": "Burundi",
                    "value": 10
                  },
                  {
                    "name": "BEN",
                    "tooltip_name": "Benin",
                    "value": 10
                  },
                  {
                    "name": "BFA",
                    "tooltip_name": "Burkina Faso",
                    "value": 10
                  },
                  {
                    "name": "BWA",
                    "tooltip_name": "Botswana",
                    "value": 10
                  },
                  {
                    "name": "CAF",
                    "tooltip_name": "Central African Republic",
                    "value": 10
                  },
                  {
                    "name": "CIV",
                    "tooltip_name": "Côte d'Ivoire",
                    "value": 10
                  },
                  {
                    "name": "CMR",
                    "tooltip_name": "Cameroon",
                    "value": 10
                  },
                  {
                    "name": "COD",
                    "tooltip_name": "Dem. Rep. Congo",
                    "value": 10
                  },
                  {
                    "name": "COG",
                    "tooltip_name": "Congo",
                    "value": 10
                  },
                  {
                    "name": "COM",
                    "tooltip_name": "Comoros",
                    "value": 10
                  },
                  {
                    "name": "CPV",
                    "tooltip_name": "Cabo Verde",
                    "value": 10
                  },
                  {
                    "name": "ERI",
                    "tooltip_name": "Eritrea",
                    "value": 10
                  },
                  {
                    "name": "ETH",
                    "tooltip_name": "Ethiopia",
                    "value": 10
                  },
                  {
                    "name": "GAB",
                    "tooltip_name": "Gabon",
                    "value": 10
                  },
                  {
                    "name": "GHA",
                    "tooltip_name": "Ghana",
                    "value": 10
                  },
                  {
                    "name": "GIN",
                    "tooltip_name": "Guinea",
                    "value": 10
                  },
                  {
                    "name": "GMB",
                    "tooltip_name": "The Gambia",
                    "value": 10
                  },
                  {
                    "name": "GNB",
                    "tooltip_name": "Guinea-Bissau",
                    "value": 10
                  },
                  {
                    "name": "GNQ",
                    "tooltip_name": "Equatorial Guinea",
                    "value": 10
                  },
                  {
                    "name": "KEN",
                    "tooltip_name": "Kenya",
                    "value": 10
                  },
                  {
                    "name": "LBR",
                    "tooltip_name": "Liberia",
                    "value": 10
                  },
                  {
                    "name": "LSO",
                    "tooltip_name": "Lesotho",
                    "value": 10
                  },
                  {
                    "name": "MDG",
                    "tooltip_name": "Madagascar",
                    "value": 10
                  },
                  {
                    "name": "MLI",
                    "tooltip_name": "Mali",
                    "value": 10
                  },
                  {
                    "name": "MOZ",
                    "tooltip_name": "Mozambique",
                    "value": 10
                  },
                  {
                    "name": "MRT",
                    "tooltip_name": "Mauritania",
                    "value": 10
                  },
                  {
                    "name": "MUS",
                    "tooltip_name": "Mauritius",
                    "value": 10
                  },
                  {
                    "name": "MWI",
                    "tooltip_name": "Malawi",
                    "value": 10
                  },
                  {
                    "name": "NAM",
                    "tooltip_name": "Namibia",
                    "value": 10
                  },
                  {
                    "name": "NER",
                    "tooltip_name": "Niger",
                    "value": 10
                  },
                  {
                    "name": "NGA",
                    "tooltip_name": "Nigeria",
                    "value": 10
                  },
                  {
                    "name": "RWA",
                    "tooltip_name": "Rwanda",
                    "value": 10
                  },
                  {
                    "name": "SDN",
                    "tooltip_name": "Sudan",
                    "value": 10
                  },
                  {
                    "name": "SEN",
                    "tooltip_name": "Senegal",
                    "value": 10
                  },
                  {
                    "name": "SLE",
                    "tooltip_name": "Sierra Leone",
                    "value": 10
                  },
                  {
                    "name": "SOM",
                    "tooltip_name": "Somalia",
                    "value": 10
                  },
                  {
                    "name": "SSD",
                    "tooltip_name": "South Sudan",
                    "value": 10
                  },
                  {
                    "name": "STP",
                    "tooltip_name": "São Tomé and Principe",
                    "value": 10
                  },
                  {
                    "name": "SWZ",
                    "tooltip_name": "Swaziland",
                    "value": 10
                  },
                  {
                    "name": "SYC",
                    "tooltip_name": "Seychelles",
                    "value": 10
                  },
                  {
                    "name": "TCD",
                    "tooltip_name": "Chad",
                    "value": 10
                  },
                  {
                    "name": "TGO",
                    "tooltip_name": "Togo",
                    "value": 10
                  },
                  {
                    "name": "TZA",
                    "tooltip_name": "Tanzania",
                    "value": 10
                  },
                  {
                    "name": "UGA",
                    "tooltip_name": "Uganda",
                    "value": 10
                  },
                  {
                    "name": "ZAF",
                    "tooltip_name": "South Africa",
                    "value": 10
                  },
                  {
                    "name": "ZMB",
                    "tooltip_name": "Zambia",
                    "value": 10
                  },
                  {
                    "name": "ZWE",
                    "tooltip_name": "Zimbabwe",
                    "value": 10
                  }
                ]
      }
    ]
  };

    return toReturn;
  } 
}
