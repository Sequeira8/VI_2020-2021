//todo - treat input, don't know how 0's react
//todo - if everything is 0 - what to do
//todo - colors and legend
//todo - get data directly
//todo minor - when 3-4 names on right side is inverted


/*colors.push(["#ff0000","#bf0000","#800000"]) //red
colors.push(["#7FB3D5","#1F618D","#154360"]) //blue
colors.push(["#52BE80","#229954","#145A32"]) //green
colors.push(["#BB8FCE","#8E44AD","#5B2C6F"]) //purple
colors.push(["#F39C12","#B9770E","#9C640C"]) //orange
colors.push(["#F7DC6F","#F1C40F","#B7950B"]) //yellow
colors.push(["#DC7633","#BA4A00","#6E2C00"]) //brown
colors.push(["#FADBD8","#F5B7B1","#F1948A"]) //pink
colors.push(["#B2BABB","#7F8C8D","#616A6B"]) //grey*/

var svg_width = $(window).width() * 400 / 1626
var	inner_circle_text_size = 13
var selected
var stroke_letters = "0.8px"

var dropdown_pie_options = ['a','b','c','d','e']

var colors_inside = ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]
var colors = []
colors.push(["#ff0000","#800000"]) //red
colors.push(["#7FB3D5","#154360"]) //blue
colors.push(["#52BE80","#145A32"]) //green
colors.push(["#BB8FCE","#5B2C6F"]) //purple
colors.push(["#F39C12","#9C640C"]) //orange
colors.push(["#F7DC6F","#B7950B"]) //yellow
colors.push(["#DC7633","#6E2C00"]) //brown
colors.push(["#FADBD8","#F1948A"]) //pink
colors.push(["#B2BABB","#616A6B"]) //grey

var map_ethnicity = {"Black or of African descent": "African Descent", 'East Asian': 'East Asian', 'Hispanic or Latino/Latina': "Hispanic", 'Middle Eastern': 'Middle Eastern', 'Multiracial': 'Multiracial', "South Asian": "South Asian", 'White or of European descent': "Euopean"}
var map_education = {"Bachelor's Degree": "Bachelor's", "Master's Degree": "Master's", "Some college/university study without earning a Degree": "No Degree", "Secondary school": "Secondary school","Associate Degree": "Associate Degree","Doctoral Degree":"Ph.D"}
var map_employment = {"Employed full-time": "Full-time", "Independent contractor, freelancer, or self-employed": "Freelancer", 
    "Not employed, but looking for work": "Looking for work", "Employed part-time": "Part-time", "Not employed, and not looking for work": "Unemployed"}
var map_job = {"Very satisfied": "Very satisfied", "Slightly satisfied": "Slightly satisfied", "Slightly dissatisfied": "Slightly dissatisfied", "Neither satisfied nor dissatisfied": "Neither", "Very dissatisfied": "Very dissatisfied"}
var map_language = {"Bash/Shell/PowerShell": "Bash", "HTML/CSS": "HTML", "C#":"C#","C":"C", "Assembly": "Assembly", "Java":"Java", "Python":"Python", "C++": "C++"}
var map_branch = {"I am a developer by profession": "Developer", "I am a student who is learning to code": "Student","I am not primarily a developer, but I write code sometimes as part of my work": "Code ocasionally", "I code primarily as a hobby": "Hobby", "I used to be a developer by profession, but no longer am":"No longer Developer"}
var map_system = {"Windows": "Windows", "MacOS": "MacOS", "Linux-based": "Linux", "BSD": "BSD"}

var map_sexuality = {"Straight / Heterosexual": "Heterosexual", "Bisexual": "Bisexual", "Gay or Lesbian": "Homosexual"}

var map_remote = {"Less than once per month / Never": "Never", "A few days each month": "A few a month", "All or almost all the time (I'm full-time remote)": "All the time", "Less than half the time, but at least one day each week": "Once a week", "It's complicated": "Complicated", "More than half, but not all, the time": "More than half", "About half the time": "Half the time"}

const stroke_width_inner = "2px"
const stroke_width_outter = "2px"
const stroke_width_selected = "6px"

const neutral_outer_color = "#616A6B"

const center_x = "33.5%"
const center_y = "35%"

const legend_x = "67%"
const legend_y = "15%"

const outer_circle_text_size = 12
const outer_size = svg_width/ 2.5

const inside_radius = svg_width / 29
const inner_size = svg_width/ 6
var inner_data = []
var inner_names = ["Education","Employment","Ethnicity","Job Satisfaction",
    "Programming Language","MainBranch","Operating System","Sexuality","Remote Frequency" ]

var outer_data = [5,10,3,2,6,7,8,9]//[1,2,3]//[3,2,4.4,2,1,5,4,2,1]
var outer_names = ["White","Hispanic","African Descent","East Asian","South Asian","Middle Eastern","Multiracional","Sexuality","Biracial" ]
var pie2 = d3.pie();

var legend_pie;

var initialized = 0

var current_data 

var current_x_selected 
var first_category
var second_category

const barCharts = function barCharts(inside,values,names,select,data){

    inner_names = inside
    outer_names = names
    outer_data = values
    current_data = data


for (var i=0; i<inner_names.length ; i++){
    inner_data.push(1)
}

// Selecting SVG using d3.select()
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", svg_width + svg_width/2)
    .attr("height", svg_width + 100)

// Creating Pie generator
var pie1 = d3.pie();


// Creating arc
var arc = d3.arc()
//    .innerRadius(0)
//    .outerRadius(100);
let g = svg.append("g")
    .attr("class", "slices1")
    .attr("id","inner")
    .style('transform', 'translate('+center_x+','+ center_y+')')
    .attr("stroke", "black")
    .style("stroke-width", stroke_width_inner)
    .style("opacity", 1);

// Grouping different arcs
var arcs = g.selectAll("arc")
    .data(pie1(inner_data))
    .enter()
    .append("g")
    .attr("class", "slice");

// Appending path
arcs.append("path")
    .attr("fill", (data, i)=>{
        return colors_inside[i];
    })
    .attr("name",(data, i)=>{
            return inner_names[i];
        })
    .attr("opacity","0.95")
    .attr("d", arc
        .innerRadius(inside_radius)         // This is the size of the donut hole
        .outerRadius(inner_size)
    );

// Adding data to each arc
/*arcs.append("text")
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    .attr("transform",(d)=>{
            var x = arc.centroid(d)[0]
            var y = arc.centroid(d)[1]

            var rotation = d.endAngle < Math.PI ?
                (d.startAngle/2 + d.endAngle/2) * 180/Math.PI :
                (d.startAngle/2  + d.endAngle/2 + Math.PI) * 180/Math.PI ;

            return `translate(${arc.centroid(d)}) rotate(${-90}) rotate(${rotation}) `;
            //return `rotate(${x_new - 90}) translate(${x},${y}) rotate(${x < 180 ? 0 : 180})`;

            //return "translate("+ arc.centroid(d)+ ")";
    })
    .attr("dy", "0.35em")
    .attr("font-size", inner_circle_text_size)
    .attr("stroke-width",stroke_letters)
    .text(function(d,i){
       return inner_names[i];
       });*/

let g2 = svg.append("g")
    .attr("class", "slices")
    .style('transform', 'translate('+center_x+','+ center_y+')')
    .attr("stroke", "black")
    .style("stroke-width", stroke_width_outter)
    .style("opacity", 1)
    .attr("id", "outer")

var arcs2 = g2.selectAll("g")
    .data(pie2(outer_data))
    .enter()
    .append("g")
    .attr("class", "slice");

// Appending path
arcs2.append("path")
    .attr("fill", (data, i)=>{
        return neutral_outer_color;
    })
    .attr("name",(data, i)=>{
            return outer_names[i];
        })
    .attr("d", arc
        .innerRadius(inner_size)         // This is the size of the donut hole
        .outerRadius(outer_size)
    )
    .attr("class","path");

// Adding data to each arc
arcs2.append("text")
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    .attr("transform",(d)=>{
        var x = (d.startAngle + d.endAngle)/2 * 180 / Math.PI;
        var y = (d.startAngle + d.endAngle)/2
        // y = arc.centroid(d)[1]

        var rotation = d.endAngle < Math.PI ?
            (d.startAngle/2 + d.endAngle/2) * 180/Math.PI :
            (d.startAngle/2 + d.endAngle/2 + Math.PI) * 180/Math.PI ;
        return `translate(${arc.centroid(d)}) rotate(${-90}) rotate(${rotation})`;
        //return `translate(${arcs.centroid(d)}) rotate(${x -90}) rotate(${x < 180 ? 0 :180}) `;
        //return `rotate(${x_new - 90}) translate(${x},${y}) rotate(${x < 180 ? 0 : 180})`;

        //return "translate("+ arc.centroid(d)+ ")";
    })
    .attr("dy", "0.35em")
    .attr("font-size", outer_circle_text_size)
    .attr("stroke-width",stroke_letters)
    .text(function(d,i){
        return outer_names[i];
    });

    legend_pie = svg.append("g")
        .attr("id","legend_pie")
    legend_pie.append("rect").attr("fill","#444444").attr("height","42%").attr("width","100%")

setup_click()

//add dropdown options, default 1: a, 2:b

change_legend()

}


function analyse_input(names,data){
    var aux_data = data.slice()
    var aux_names = names.slice();

    var sum = data.reduce((a, b) => a + b, 0)
    var new_data = []
    var new_names= []

    while ( aux_data.length>0 ){
        var min = -1
        var min_name
        var id;
        for (var i=0; i < aux_data.length; i++){
            if(min == -1){
                id = i
                min = aux_data[i]
            }
            else if (aux_data[i] < min){
                id = i
                min = aux_data[i]
            }
        }

        min_name = aux_names[id]
        aux_data.splice(id,1)
        aux_names.splice(id,1)
        new_data.push(min)
        new_names.push(min_name)
    }

    var max = 0.05 * sum
    var others = 0
    var to_remove = []
    for (var i=0; i< new_data.length; i++){ //outra forma era agrupar tudo o que é pequeno (menor de x% ex:5%)
        if (others + new_data[i] <= max){
            others += new_data[i]
            to_remove.push(i)
        }
    }
    if (to_remove.length >1){
        for (var i=to_remove.length -1; i>=0; i--){
            new_data.splice(i,1)
            new_names.splice(i,1)
        }
        //todo- adicionar o others so se for mais pequeno do que 8
        if (others>0){
            new_data.push(others)
            new_names.push("Others")
        }

    }
    return [new_names,new_data]


}


function change_legend(){
    var keys = inner_names

    var espacamento = 20
    var offset = 10
    var dots_pie = legend_pie.selectAll("#dots_pie")
        .data(inner_names)

    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet2);

    dots_pie.enter()
        .append("circle")
        .attr("cx", "8")
        .attr("cy", function(d,i){ return offset + i*espacamento}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d,i){ return  colors_inside[i]})
        .attr("id","dots_pie")

    dots_pie.exit().remove()

    //---------------- Nomes -------
    var names_pie = legend_pie.selectAll("#names_legend_pie")
        .data(inner_names)

    names_pie.enter()
        .append("text")
        .attr("x", "18")
        .attr("y", function(d,i){ return offset+1 + i*espacamento}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return colors_inside[i]})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("id","names_legend_pie")

    names_pie.exit().remove()

    legend_pie.style("transform","translate("+legend_x+','+legend_y+")")
}


function setup_click(){
    d3.select(".slices1").selectAll(".slice").on("click", click);
}

function click(){
    if (selected == null){
        d3.select(this).select("path") //simulate selection
            .attr("stroke-width",stroke_width_selected)
        selected = this
    }
    else{
        d3.select(selected).select("path").attr("stroke-width",stroke_width_inner)
        d3.select(this).select("path").attr("stroke-width",stroke_width_selected)

        selected = this
    }
    

    var select = d3.select(this).select("path").attr("name")
    var aux = 0
    for (var e=0; e<current_data.length; e++){
        if (current_data[e].name==select){
            aux = e
        }
    }
    current_x_selected = aux
    var result = makeData(data,aux) 
    var names = result[0]
    var values = result[1]

    var color = d3.select(this).select("path").attr("fill")


    change_outer(values,names,color)

    
}

function de_select(){

    if (selected !=null){
        d3.select(selected).select("path").attr("stroke-width",stroke_width_inner)
        selected = null
    }
    d3.select(".slices").selectAll("path")
        .attr("fill",neutral_outer_color)
    return
}

function change_inner(name){
    inner_names = name
    datas = []
    for (var i=0; i<name.length ; i++){
        datas.push(1)
    }
    console.log(datas)
    var pies = d3.pie()
    var arc = d3.arc()
    var g = d3.select('#inner')


    var new_arcs = g.selectAll('.slice')
        .data(pies(datas))


    var to_add = new_arcs.enter().append("g")
        .attr("class", "slice")
        .attr("id","new")
    to_add.append("path")
        .attr("class","path")
    to_add.append("text")

    new_arcs.exit().remove()

    new_arcs = g.selectAll('.slice').data(pies(datas))


    new_arcs.select("path")
        .transition()
        .duration(1000)
        .attr("fill", (data, i)=>{
            return colors_inside[i];
        })
        .attr("name",(data, i)=>{
            return inner_names[i];
        })
        .attr("d", arc
            .innerRadius(inside_radius)         // This is the size of the donut hole
            .outerRadius(inner_size)
        )
        .attr("class","path");


    //-Names-------------
    //assign_names(new_arcs,name,1000,arc)

    setup_click()
    change_legend()
}

function change_outer(datas,name,color_outer) {

    outer_data = datas
    outer_names = name

    var pies = d3.pie()
    var arc = d3.arc()
    var g = d3.select('#outer')

    var new_arcs = g.selectAll('.slice')
        .data(pies(datas))


    var to_add = new_arcs.enter().append("g")
        .attr("class", "slice")
        .attr("id","new")
    to_add.append("path")
        .attr("class","path")
    to_add.append("text")

    new_arcs.exit().remove()

    new_arcs = g.selectAll('.slice').data(pies(datas))
    var aux = neutral_outer_color

    if (color_outer){
        aux = color_outer
    }
    
    new_arcs.select("path")
        .transition()
        .duration(500)
        .attr("fill", (data, i)=>{
            return aux ;
        })
        .attr("id",(i)=>{
            return outer_names[i];
        })
        .attr("d", arc
            .innerRadius(inner_size)         // This is the size of the donut hole
            .outerRadius(outer_size)
        )
        .attr("class","path");



    //-Names-------------
    assign_names(new_arcs,name,1000,arc)

}

function assign_names(node, names, transition,arc){
    node.select("text")
        .transition()
        .duration(transition)
        .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
        .attr("transform",(d)=>{
            var x = arc.centroid(d)[0]
            var y = arc.centroid(d)[1]

            var rotation = d.endAngle < Math.PI ?
                (d.startAngle/2 + d.endAngle/2) * 180/Math.PI :
                (d.startAngle/2 + d.endAngle/2 + Math.PI) * 180/Math.PI ;

            return `translate(${arc.centroid(d)}) rotate(${-90}) rotate(${rotation}) `;
            //return `rotate(${x_new - 90}) translate(${x},${y}) rotate(${x < 180 ? 0 : 180})`;

            //return "translate("+ arc.centroid(d)+ ")";
        })
        .attr("dy", "0.35em")
        .attr("font-size", outer_circle_text_size)
        .attr("stroke-width",stroke_letters)
        .text(function(d,i){
            return names[i];
        });
}

function get_data(number) {
    if (number == 0)
        return [3,2,4.4,2,1,5,4,2,1]
    else
        return [5,10,3,2]
}

function get_names(number) {
    if (number == 0)
        return ["White","Hispanic","African Descent","East Asian","South Asian","Middle Eastern","Multiracional","Sexuality","Biracial" ]
    else
        return ["Primary School","Bachelors","Masters","Ph.D"]
}

function barChartGetData(inside, outside, first_cat, second_cat, data){
    current_data = data
    inner_names = inside
    outer_names= outside
    first_category = first_cat
    second_category = second_cat

    //randomly select one and change color 

    //select first inside 
    var select = 0

    current_x_selected = select

    var result = makeData(data,select)

    var names = result[0]
    var values = result[1]

    //devolve -> values,names, select, data

    if (initialized==0){
        barCharts(inside,values,names,select,data)
        initialized=1
    }
    else{
        change_outer(values,names)
        change_inner(inside)
        //chamar as funcoes ja feitas

    }

}

function makeData(data,select){

    var aux = current_data[select].axes

    var names = []
    var values =[]

    for (var i=0; i<aux.length; i++){
        names.push(aux[i].name)
        values.push(aux[i].value)
    }
    /*
    var map = {"Ethnicity": map_ethnicity, "Education": map_education, "Employment": map_employment, 
    "Job_Satisfaction" : map_job, "Programming_Language": map_language, "MainBranch": map_branch, 
    "Operating_System": map_system, "Sexuality": map_sexuality, "Remote_Frequency": map_remote}
    var dict
    if(first_category=="Ethnicity"){
        dict = map_ethnicity
    }
    else if (first_category=="Education"){
        dict = map_education
    }
    else if (first_category=="Employment"){
        dict = map_employment
    }
    else if (first_category=="Job_Satisfaction"){
        dict = map_job
    }
    else if (first_category=="Programming_Language"){
        dict = map_language
    }
    else if (first_category=="MainBranch"){
        dict = map_branch
    }
    else if (first_category=="Operating_System"){
        dict = map_system
    }
    else if (first_category=="Sexuality"){
        dict = map_sexuality
    }
    else if (first_category=="Remote_Frequency"){
        dict = map_remote
    }

    var new_names =[]
    for (var e=0; e< names.length; e++){
        var category = names[e]
        new_names.push(dict[category])
    }
    console.log(new_names)*/


    
    return analyse_input(names,values)

}   