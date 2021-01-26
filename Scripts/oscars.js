
var dataset, full_dataset;

var padding = 60;

var svg_bar_chart, svg_scatterplot, svg_line_chart;


var radius = 5;

var dispatch;


var context = 0; // 0 - Reset; 1 - New; 2 - Old.

var test;

var load_info= Promise.all([
    d3.json("./datasets/world.json"),
    d3.json('./datasets/json_map.json')]);

d3.json("json.json").then(function (data) {
  full_dataset = data; // this variable is always the full dataset
  dataset = data; // this variable is the dataset that we will work with

  create_map('users');

  prepare_settings();

  
});


function change_load_info(new_json){
    load_info = Promise.all([d3.json("./datasets/world.json"), new_json])
}

function prepare_settings(){
var translatex = 30;
//AGE
var age = [10, 90];

var allCategory = ["Ethnicity", "Education", "Employment", "Job_Satisfaction", "Programming_Language",
    "MainBranch", "Operating_System", "Sexuality", "Remote_Frequency"];
var allEducationMin = ["Secondary School or Less", "Bachelors Degree","Masters Degree", "PhD"]
var allEducationMax = ["PhD", "Masters Degree", "Bachelors Degree", "Secondary School or Less"]

var sliderAge = d3
    .sliderBottom()
    .min(d3.min(age))
    .max(d3.max(age))
    .width(180)
    .step(1)
    .ticks(5)
    .tickValues([10, 30, 50, 70, 90])
    .default([10, 90])
    .tickPadding(1)
    .fill("#ff8614")
    .on('end', val => on_change_age(val));

var gAge = d3
  .select('div#slider-range1')
  .append('svg')
  .attr('width', 400)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(35,10)').call(sliderAge);

//DOLARS PER HOUR
var Dollars = [0, 2000];

var sliderDollars = d3
  .sliderBottom()
  .min(d3.min(Dollars))
  .max(d3.max(Dollars))
  .width(180)
  .step(10)
  .ticks(5)
  .tickValues([0,500,1000,1500,2000])
  .default([0, 2000])
  .tickPadding(1)
  .fill("#ff8614")
    .on('end', val => on_change_dollars(val));

var gDollars = d3
  .select('div#slider-range2')
  .append('svg')
  .attr('width', 400)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(35,10)').call(sliderDollars);


//Salary
var Salary = [0, 2000000];

var sliderSalary = d3
  .sliderBottom()
  .min(d3.min(Salary))
  .max(d3.max(Salary))
  .width(180)
  .step(10000)
  .ticks(5)
  .tickValues([0,500000,1000000,1500000,2000000])
  .default([0, 2000000])
  .tickPadding(1)
  .fill("#ff8614")
  .tickFormat(d3.format('.2s'))
    .on('end', val => on_change_salary(val));

var gSalary = d3
  .select('div#slider-range3')
  .append('svg')
  .attr('width', 400)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(35,10)').call(sliderSalary);

//Work Hours per Week
var Workhours = [10, 130];

var sliderWorkHours = d3
  .sliderBottom()
  .min(d3.min(Workhours))
  .max(d3.max(Workhours))
  .width(180)
  .step(2)
  .ticks(5)
  .tickValues([10,40,70,100,130])
  .default([10,130])
  .tickPadding(1)
  .fill("#ff8614")
    .on('end', val => on_change_workHours(val));

var gWorkhours = d3
  .select('div#slider-range4')
  .append('svg')
  .attr('width', 400)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(35,10)').call(sliderWorkHours);

//Years Coding
var YearCoding = [0, 60];

var sliderYearsCoding = d3
  .sliderBottom()
  .min(d3.min(YearCoding))
  .max(d3.max(YearCoding))
  .width(180)
  .step(2)
  .ticks(5)
  .tickValues([0,15,30,45,60])
  .default([0,60])
  .tickPadding(1)
  .fill("#ff8614")
    .on('end', val => on_change_yearsCoding(val));

var gSalary = d3
  .select('div#slider-range5')
  .append('svg')
  .attr('width', 400)
  .attr('height', 80)
  .append('g')
  .attr('transform', 'translate(35,10)').call(sliderYearsCoding);

//DropDownCategory
var dropCategory = d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allCategory)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

var dropCategory = d3.select("#donut_category2")
    .selectAll('myOptions')
    .data(allCategory.filter(e => e !== 'Ethnicity'))
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

//DropDown Min
var dropMin = d3.select("#selectButton2")
      .selectAll('myOptions')
      .data(allEducationMin)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

//DropDown Max
var dropMax = d3.select("#selectButton3")
      .selectAll('myOptions')
      .data(allEducationMax)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button


/*
d3.select('p#value-range1').text(
  sliderRange
    .value()
    .map(d3.format('0'))
    .join('-')
);
*/

}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

// Map legend
var legendW = 520;
var legendtop = 45;
var legendleft = 25;

// Map Varianbles
const width_map = ($(window).width() * 700 / 1920);
const height_map = $(window).height() * 400 / 800;
var lowColor = '#787878';
var highColor = '#ff8614';

var dict = {}
var selected_countries = {}

function create_map(map_type){
    const format = d3.format(',');

    var tip_tusers;
    var tip_salary;
    var tip_dollarshour;
    var tip_age;
    var tip_work;
    var tip_yearscode;

    const margin = {top: 20, right: 20, bottom: 20, left: 20};


    const svg = d3.select('#map')
        .append('svg')
        .attr('wi' +
            'dth', width_map)
        .attr('height', height_map)
        .append('g')
        .attr('class', 'map');

    const projection = d3.geoMercator()
        .scale(60)
        .rotate([352, 0, 0])
        .translate( [(width_map / 2)-85, 40 +height_map / 2]);

    const path = d3.geoPath().projection(projection);

    function call_map_tusers(){

        tip_tusers = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Total Users: </strong><span class='details'>${format(d.tusers)}</span><br></span><strong>Percentage: </strong><span class='details'>${format(parseFloat(d.tusersper).toFixed(2))}</span><strong class="details">%</strong>`);

        svg.call(tip_tusers);
        load_info.then(
            d => ready_tusers(null, d[0], d[1])
        );
    }

    function call_map_yearscode(){
        tip_yearscode= d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Avg Years of code: </strong><span class='details'>${format(parseFloat(d.yearscodeavg).toFixed(0))}</span>`);

        svg.call(tip_yearscode);
        load_info.then(
            d => ready_yearscode(null, d[0], d[1])
        );
    }

    function call_map_work(){
        tip_work = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Avg Work hours(week): </strong><span class='details'>${format(parseFloat(d.workweekhrsavg).toFixed(0))}</span>`);


        svg.call(tip_work);
        load_info.then(
            d => ready_work(null, d[0], d[1])
        );
    }

    function call_map_age(){
        tip_age = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Avg Age: </strong><span class='details'>${format(parseFloat(d.ageavg).toFixed(0))}</span>`);

        svg.call(tip_age);
        load_info.then(
            d => ready_age(null, d[0], d[1])
        );
    }

    function call_map_salary(){
        tip_salary = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Avg Salary: </strong><span class='details'>${format(parseFloat(d.salaryavg).toFixed(2))}</span>`);

        svg.call(tip_salary);
        load_info.then(
            d => ready_salary(null, d[0], d[1])
        );
    }

    function call_map_dollarshour(){
        tip_dollarshour = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]).html((event,d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Avg Dollars(hour): </strong><span class='details'>${format(parseFloat(d.dollarshouravg).toFixed(2))}</span>`);

        svg.call(tip_dollarshour);
        load_info.then(
            d => ready_dollarshour(null, d[0], d[1])
        );
    }
    if(map_type == 'age'){
        call_map_age();
    }
    if(map_type == 'yearscode'){
        call_map_yearscode();
    }
    if(map_type == 'dollarshour'){
        call_map_dollarshour();
    }
    if(map_type == 'workweek'){
        call_map_work();
    }
    if (map_type == 'salary'){
        call_map_salary()
    }
    if(map_type == 'users'){
        call_map_tusers()
    }

    var countries = []


    function ready_tusers(error, data, population) {


        var populationById = {};
        var populationPerById = {};

        population.forEach(d => { populationById[d.id] = +d.tusers; countries.push(d.name);});
        population.forEach(d => { populationPerById[d.id] = +d.tusersper; });

        add_scroll(countries);

        data.features.forEach(d => { d.tusers = populationById[d.id] });
        data.features.forEach(d => { d.tusersper = populationPerById[d.id] });


        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.tusers != 'undefined') {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_tusers.show(event, d)
            }
        }

        let mouseLeave = function (event,d) {
            if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                if (typeof d.tusers != 'undefined') {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
            }
            tip_tusers.hide(event,d)
        }

        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average Users of StackOverFlow");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])

        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);
    }

    function ready_age(error, data, population) {
        var populationById = {};

        population.forEach(d => { populationById[d.id] = +d.ageavg;countries.push(d.name); });
        add_scroll(countries);
        data.features.forEach(d => { d.ageavg = populationById[d.id] });

        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.ageavg != 'undefined'){
                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_age.show(event,d)
            }
        }

        let mouseLeave = function (event,d) {
            if (typeof d.ageavg != 'undefined'){
                if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
                tip_age.hide(event,d)
            }
        }

        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average Age of StackOverFlow Users");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])


        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);
    }

    function ready_yearscode(error, data, population) {

        var populationById = {};

        population.forEach(d => { populationById[d.id] = +d.yearscodeavg;countries.push(d.name); });
        add_scroll(countries);
        data.features.forEach(d => { d.yearscodeavg = populationById[d.id] });



        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.yearscodeavg != 'undefined'){

                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_yearscode.show(event,d)
            }
        }

        let mouseLeave = function (event,d) {
            if (typeof d.yearscodeavg != 'undefined'){

                if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
                tip_yearscode.hide(event,d)
            }
        }

        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average of years of code of StackOverFlow Users");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])


        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);
    }


    function ready_work(error, data, population) {

        var populationById = {};

        population.forEach(d => { populationById[d.id] = +d.workweekhrsavg;countries.push(d.name);});
        add_scroll(countries);
        data.features.forEach(d => { d.workweekhrsavg = populationById[d.id] });



        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.workweekhrsavg != 'undefined'){

                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_work.show(event,d)
            }
        }

        let mouseLeave = function (event,d) {
            if (typeof d.workweekhrsavg != 'undefined'){

                if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
                tip_work.hide(event,d)
            }
        }

        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average Work Hours Per Week of StackOverFlow Users");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])


        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);
    }


    function ready_salary(error, data, population) {

        var populationById = {};

        population.forEach(d => { populationById[d.id] = +d.salaryavg;countries.push(d.name); });
        add_scroll(countries);
        data.features.forEach(d => { d.salaryavg = populationById[d.id] });



        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.salaryavg != 'undefined'){

                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_salary.show(event,d)
            }
        }

        let mouseLeave = function (event,d) {
            if (typeof d.salaryavg != 'undefined'){

                if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
                tip_salary.hide(event,d)
            }
        }
        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average Salary of StackOverFlow Users");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])


        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);


    }

    function ready_dollarshour(error, data, population) {

        var populationById = {};

        population.forEach(d => { populationById[d.id] = +d.dollarshouravg;countries.push(d.name); });
        add_scroll(countries);
        data.features.forEach(d => { d.dollarshouravg = populationById[d.id] });



        let clickmouse = function (event,d) {
            clickmouse_scroll(d.properties.name)
        }
        let mouseOver = function (event,d) {
            if (typeof d.dollarshouravg != 'undefined'){

                d3.select(this)
                    .transition()
                    .duration(50)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                tip_dollarshour.show(event,d)
            }
        }

        let mouseLeave = function (event,d) {
            if (typeof d.dollarshouravg != 'undefined'){

                if (dict[d.properties.name] == 0 || dict[d.properties.name] == null) {
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .style("opacity", 1)
                        .style('stroke-width', 0.5)
                        .style("stroke", "#ececec")
                }
                tip_dollarshour.hide(event,d)
            }
        }
        var key_min = 10000000000000000
        var key_max = -1
        var keys = Object.keys(populationById);

        keys.forEach(function(key){
            if (key_min > populationById[key]){key_min = populationById[key];}
            if (key_max < populationById[key]){key_max = populationById[key];}
        });

        add_legend(key_min,key_max,"Average Hourly Earnings of StackOverFlow Users");

        let color_fill = d3.scaleLinear().domain([key_min,key_max]).range([lowColor,highColor])


        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(data.features)
            .enter().append('path')
            .attr("id", function (d){return d.properties.name;})
            .attr('d', path).attr("transform", "translate(0,40)")
            .style('fill', function(d) {
                return color_fill(populationById[d.id]);
            })
            .attr("class", "CountryLocation")
            .style("stroke", "#ececec")
            .style('opacity', 1)
            .style('stroke-width', 0.5)
            .on("click", clickmouse)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave);
    }


    function add_legend(minValue,maxValue,text_to_show) {
        // add a legend
        var x = d3.scaleTime()
            .rangeRound([0, 500])
            .domain([0, maxValue])

        svg.append("g")
            .attr("id", "Wx-axis")
            .attr("class", "x-axis")
            .attr("transform", "translate(" + legendleft + "," +  legendtop + ")")
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")));

        var colorRange = [lowColor, highColor]

        var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5]);


        var linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "linear-gradient");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", color(1));

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", color(2));

        svg.append("rect")
            .attr("x", legendleft +  0.5)
            .attr("y", legendtop - 15)
            .attr("width", 500)
            .attr("height", 15)
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .style("fill", "url(#linear-gradient)");

        svg.append("text")
            .attr("x", legendleft +  (legendW /2))
            .attr("y", legendtop - 18)
            .text(text_to_show)
            .style("font-size", 20)
            .style("font-family", "sans-serif")
            .attr("text-anchor", "middle")
    }


    function updateScroll(event){
        dir = event.wheelDelta/120;

        d3.selectAll(".ScrollCountry").attr("y", function(){
            let y = parseFloat(this.getAttribute("y")) + (25) * dir;
            if (y<0) {y = y + (170*25)}
            if (y> 25*170) {y = y - (170*25)}
            return y;
        })
    }


    function check_country(c){
        var Countries_not_allowed = ['Greenland','South Sudan','Central African Republic','Somaliland','Eritrea','Niger',
            'Sierra Leone','Suriname']

        var i;
        for (i = 0; i < Countries_not_allowed.length; i++) {
            if( c == Countries_not_allowed[i]){
                return true;
            }
        }
        return false;


    }

    function clickmouse_scroll(Country_name) {
        if (check_country(Country_name) == true){
            return ;
        }
        else{
            if (selected_countries[Country_name] == 0 || selected_countries[Country_name] == null) {
                d3.select("#" + Country_name + "_Map").attr("fill", "black")
                    .attr("font-weight", "bold");
                selected_countries[Country_name] = 1;

            }
            else{
                d3.select(("#" + Country_name + "_Map")).attr("fill", "#707B7C")
                    .attr("font-weight", "normal");
                selected_countries[Country_name] = 0;

            }
            if (dict[Country_name] == 0 || dict[Country_name] == null) {
                d3.select("#" + Country_name)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style('stroke-width', 1.5)
                    .style("stroke", "Black")
                dict[Country_name] = 1
                send_countries(dict)
            } else {
                d3.select("#" + Country_name)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "transparent")
                    .style('stroke-width', 0.5)
                delete dict[Country_name]
                send_countries(dict)
            }
        }


    }

    let mouseOver_scroll = function (Country_name) {

        d3.select("#" + Country_name)
            .transition()
            .duration(50)
            .style("opacity", 1)
            .style('stroke-width', 1.5)
            .style("stroke", "Black")
    }

    let mouseLeave_scroll = function (Country_name) {
        if (dict[Country_name] == 0 || dict[Country_name] == null) {
            d3.select("#" + Country_name)
                .transition()
                .duration(50)
                .style("opacity", 1)
                .style('stroke-width', 0.5)
                .style("stroke", "transparent")
        }
    }


    function add_scroll(population){

        d3.select("#ScrollMap").on("wheel.zoom", function(event){
            updateScroll(event)
        })

        var scrollSVG = d3.select("#ScrollMap").append("svg")
            .attr("class", "scroll-svg")
            .style("height", 350)
            .attr("y", 40)
            .style("overflow", "hidden")



        var chartGroup = scrollSVG.append("g")
            .attr("class", "chartGroup")
            .style("overflow-y", "auto")

        chartGroup.selectAll("text")
            .data(population)
            .enter()
            .append("text")
            .style("font-size", 13)
            .attr("class", "ScrollCountry")
            .attr("id", function (d){return d + "_List";} )
            .attr("width", 10)
            .attr("height", 10)
            .attr("text-anchor", "start")
            .style("cursor", "pointer ")
            .attr("position", "absolute")
            .attr("fill", "#707B7C")
            .attr("x", 20)
            .attr("y", function(d,i){ return 25*(i+1); })
            .text(function(d) {selected_countries[d] = 0; return d;})
            .on("click", function(d){
                country_cmp = d.path[0].innerHTML;
                clickmouse_scroll(country_cmp);
            })
            .on("mouseover", function(d){
                d3.select(this).attr("fill", "black")
                    .attr("font-weight", "bold");
                country_cmp = d.path[0].innerHTML;
                mouseOver_scroll(country_cmp);
            })
            .on("mouseout", function(d){
                if (selected_countries[d.path[0].innerHTML] == 0){
                    d3.select(this).attr("fill", "#707B7C")
                        .attr("font-weight", "normal");
                }
                country_cmp = d.path[0].innerHTML;
                mouseLeave_scroll(country_cmp);
            })

    }


}

function delete_scroll(){
    dict = {}
    d3.select("#ScrollMap").selectAll("scrollSVG").remove();
    d3.select("#ScrollMap").selectAll("chartGroup").remove();
}







