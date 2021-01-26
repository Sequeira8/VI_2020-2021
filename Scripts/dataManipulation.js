//var csv is the CSV file with headers
const Education = ["Bachelor's Degree", 'Some college/university study without earning a Degree', "Master's Degree", 'Doctoral Degree', 'Primary/elementary school', 'Associate Degree', 'Secondary school', 'Professional Degree (JD, MD, etc.)', 'I never completed any formal education'];

const Employment = ['Employed full-time', 'Independent contractor, freelancer, or self-employed', 'Employed part-time', 'Not employed, but looking for work', 'Not employed, and not looking for work', 'Retired'];

const Ethnicity = ['White or of European descent', 'East Asian', 'Black or of African descent', 'Hispanic or Latino/Latina', 'Middle Eastern', 'South Asian', 'Multiracial', 'Biracial', 'Native American, Pacific Islander, or Indigenous Australian'];

const Job_Satisfaction = ['Slightly dissatisfied', 'Slightly satisfied', 'Neither satisfied nor dissatisfied', 'Very satisfied', 'Very dissatisfied'];

const Programming_Language = ['C++', 'Java', 'HTML/CSS', 'Bash/Shell/PowerShell', 'C#', 'Python', 'Elixir', 'JavaScript', 'Clojure', 'C', 'PHP', 'Assembly', 'Scala', 'Go', 'Dart', 'R', 'VBA', 'SQL', 'Ruby', 'Objective-C', 'Kotlin', 'Swift', 'F#', 'Erlang', 'TypeScript', 'Rust', 'WebAssembly'];

const MainBranch = ['I am a developer by profession', 'I am not primarily a developer, but I write code sometimes as part of my work', 'I am a student who is learning to code', 'I used to be a developer by profession, but no longer am', 'I code primarily as a hobby'];

const Operating_System = ['Linux-based', 'Windows', 'MacOS', 'BSD'];

const Sexuality = ['Straight / Heterosexual', 'Bisexual', 'Gay or Lesbian'];

const Remote_Frequency = ['A few days each month', "All or almost all the time (I'm full-time remote)", 'Less than once per month / Never', 'More than half, but not all, the time', 'Less than half the time, but at least one day each week', 'About half the time', "It's complicated"];

const Categories = [
    {name: "Education", value: Education},
    {name: "Employment", value: Employment},
    {name: "Ethnicity", value: Ethnicity},
    {name: "Job_Satisfaction", value: Job_Satisfaction},
    {name: "Programming_Language", value: Programming_Language},
    {name: "MainBranch", value: MainBranch},
    {name: "Operating_System", value: Operating_System},
    {name: "Sexuality", value: Sexuality},
    {name: "Remote_Frequency", value: Remote_Frequency}
]

var filtered_dataset;

function key_in_list_of_dictionaries(list, key){
    for(let x in list){
        if (x.axis === key) {
            return true
        }
    }
    return false
}

const CSVData = function CSVData(initial_json, snapshot, options){
    // default settings
    let configurations = {
        category: "Ethnicity",
        countries: [],
        age: [],
        dollars: [],
        salary: [],
        workHours: [],
        yearsCoding: [],
        education: []
    };

    //Put all of the options into a variable called cfg
    if('undefined' !== typeof options){
        for(let i in options){
            if('undefined' !== typeof options[i]){configurations[i] = options[i]; }
        }//for i
    }//if

    // use filters

    var final_json = []

    if (configurations["countries"][0] && configurations["countries"][0].length > 0){
        for(let country of configurations["countries"]) {
            final_json = defiant.json.search(snapshot, "//*[Country='" + country + "']");
        }

    }

    if (configurations["age"] && configurations["age"].length > 0){
        if (final_json.length < 1) {
            final_json = (defiant.json.search(snapshot, "//*[Age >=" + configurations["age"][0] + "]"));
        } else {
            final_json = (defiant.json.search(final_json, "//*[Age >=" + configurations["age"][0] + "]"));
        }
        final_json = (defiant.json.search(final_json, "//*[Age <=" + configurations["age"][1] + "]"));
    }

    if (configurations["dollars"] && configurations["dollars"].length > 0){
        if (final_json.length < 1) {
            final_json = (defiant.json.search(snapshot, "//*[Dollars_per_Hour >=" + configurations["dollars"][0] + "]"));
        } else {
            final_json = (defiant.json.search(final_json, "//*[Dollars_per_Hour >=" + configurations["dollars"][0] + "]"));
        }
        final_json = (defiant.json.search(final_json, "//*[Dollars_per_Hour <=" + configurations["dollars"][1] + "]"));
    }

    if (configurations["salary"] && configurations["salary"].length > 0){
        if (final_json.length < 1) {
            final_json = (defiant.json.search(snapshot, "//*[Salary_in_USD >=" + configurations["salary"][0] + "]"));
        } else {
            final_json = (defiant.json.search(final_json, "//*[Salary_in_USD >=" + configurations["salary"][0] + "]"));
        }
        final_json = (defiant.json.search(final_json, "//*[Salary_in_USD <=" + configurations["salary"][1] + "]"));
    }

    if (configurations["workHours"] && configurations["workHours"].length > 0){
        if (final_json.length < 1) {
            final_json = (defiant.json.search(snapshot, "//*[WorkWeekHrs >=" + configurations["workHours"][0] + "]"));
        } else {
            final_json = (defiant.json.search(final_json, "//*[WorkWeekHrs >=" + configurations["workHours"][0] + "]"));
        }
        final_json = (defiant.json.search(final_json, "//*[WorkWeekHrs <=" + configurations["workHours"][1] + "]"));
    }

    if (configurations["yearsCoding"] && configurations["yearsCoding"].length > 0){
        if (final_json.length < 1) {
            final_json = (defiant.json.search(snapshot, "//*[YearsCode >=" + configurations["yearsCoding"][0] + "]"));
        } else {
            final_json = (defiant.json.search(final_json, "//*[YearsCode >=" + configurations["yearsCoding"][0] + "]"));
        }
        final_json = (defiant.json.search(final_json, "//*[YearsCode <=" + configurations["yearsCoding"][1] + "]"));
    }

    if (configurations["education"] && configurations["education"].length > 0){
        /*
        let possibilities = ["Bachelor's Degree",
            'Some college/university study without earning a Degree',
            "Master's Degree",
            'Doctoral Degree',
            'Primary/elementary school',
            'Associate Degree',
            'Secondary school',
            'Professional Degree (JD, MD, etc.)',
            'I never completed any formal education']

        var allEducationMin = ["Secondary School or Less", "Bachelors Degree","Masters Degree", "PhD"]

        if (arrayEquals(configurations['education'][0], 'Bachelors Degree')){
            possibilities = possibilities.filter(e => e !== 'I never completed any formal education')
            possibilities = possibilities.filter(e => e !== 'Primary/elementary school')
            possibilities = possibilities.filter(e => e !== 'Secondary school')
            possibilities = possibilities.filter(e => e !== 'Associate Degree')
            possibilities = possibilities.filter(e => e !== 'Professional Degree (JD, MD, etc.)')
            possibilities = possibilities.filter(e => e !== 'Some college/university study without earning a Degree')
        }

        if (arrayEquals(configurations['education'][0], "Masters Degree")){
            possibilities = possibilities.filter(e => e !== 'I never completed any formal education')
            possibilities = possibilities.filter(e => e !== 'Primary/elementary school')
            possibilities = possibilities.filter(e => e !== 'Secondary school')
            possibilities = possibilities.filter(e => e !== 'Associate Degree')
            possibilities = possibilities.filter(e => e !== 'Professional Degree (JD, MD, etc.)')
            possibilities = possibilities.filter(e => e !== 'Some college/university study without earning a Degree')
            possibilities = possibilities.filter(e => e !== "Bachelor's Degree")
        }

        if (arrayEquals(configurations['education'][0], "PhD")){
            possibilities = possibilities.filter(e => e !== 'I never completed any formal education')
            possibilities = possibilities.filter(e => e !== 'Primary/elementary school')
            possibilities = possibilities.filter(e => e !== 'Secondary school')
            possibilities = possibilities.filter(e => e !== 'Associate Degree')
            possibilities = possibilities.filter(e => e !== 'Professional Degree (JD, MD, etc.)')
            possibilities = possibilities.filter(e => e !== 'Some college/university study without earning a Degree')
            possibilities = possibilities.filter(e => e !== "Bachelor's Degree")
            possibilities = possibilities.filter(e => e !== "Master's Degree")
        }

         */
    }

    if (final_json.length < 1) {
        final_json = initial_json;
    }

    filtered_dataset = final_json;

    var gender_separated_json = [
        { name :'Non-binary',
            axes: []
        },
        { name: 'Woman',
            axes: []
        },
        { name: 'Man',
            axes: []
        },
        { name :'Transgender',
            axes: []
        }
    ];

    for (let i=0; i<Categories.length; i++) {
        if (Categories[i].name.normalize() === configurations.category.normalize()) {
            var category_name = Categories[i].name
            var subcategories = Categories[i].value
        }
    }

    // initialize json with all values 0
    for(let gender=0; gender<gender_separated_json.length; gender++) {
        for(let i=0; i<subcategories.length; i++) {
            let line = {axis: subcategories[i], value: 0}
            gender_separated_json[gender].axes.push(line)
        }
    }

    // go through data json and add to gender_separated_json
    for(let instance=0; instance<final_json.length; instance++) {
        for(let gender=0; gender<gender_separated_json.length; gender++){
            if (gender_separated_json[gender].name === final_json[instance].Gender){
                for(let i=0; i<gender_separated_json[0].axes.length; i++){
                    if (gender_separated_json[gender].axes[i].axis === final_json[instance][category_name]) {
                        gender_separated_json[gender].axes[i].value += 1
                    }
                }
            }
        }
    }

    return gender_separated_json
}

function dataForBarChart(category1, category2) {
    var category1_names;
    var category2_names;

    var education = ["Bachelor's Degree", 'Some college/university study without earning a Degree', "Master's Degree", 'Doctoral Degree', 'Primary/elementary school', 'Associate Degree', 'Secondary school', 'Professional Degree (JD, MD, etc.)', 'I never completed any formal education']
    var employment = ['Employed full-time', 'Independent contractor, freelancer, or self-employed', 'Employed part-time', 'Not employed, but looking for work', 'Not employed, and not looking for work', 'Retired']
    var ethnicity = ['White or of European descent', 'East Asian', 'Black or of African descent', 'Hispanic or Latino/Latina', 'Middle Eastern', 'South Asian', 'Multiracial', 'Biracial', 'Native American, Pacific Islander, or Indigenous Australian']
    var job_satisfaction = ['Slightly dissatisfied', 'Slightly satisfied', 'Neither satisfied nor dissatisfied', 'Very satisfied', 'Very dissatisfied']
    var programing_language = ['C++', 'Java', 'HTML/CSS', 'Bash/Shell/PowerShell', 'C#', 'Python', 'Elixir', 'JavaScript', 'Clojure', 'C', 'PHP', 'Assembly', 'Scala', 'Go', 'Dart', 'R', 'VBA', 'SQL', 'Ruby', 'Objective-C', 'Kotlin', 'Swift', 'F#', 'Erlang', 'TypeScript', 'Rust', 'WebAssembly']
    var mainbranch = ['I am a developer by profession', 'I am not primarily a developer, but I write code sometimes as part of my work', 'I am a student who is learning to code', 'I used to be a developer by profession, but no longer am', 'I code primarily as a hobby']
    var operating_system = ['Linux-based', 'Windows', 'MacOS', 'BSD']
    var sexuality = ['Straight / Heterosexual', 'Bisexual', 'Gay or Lesbian']
    var remote_frequancy = ['A few days each month', "All or almost all the time (I'm full-time remote)", 'Less than once per month / Never', 'More than half, but not all, the time', 'Less than half the time, but at least one day each week', 'About half the time', "It's complicated"]

    if (category1 === "Education") {
        category1_names = education
    } else if (category1 === "Employment") {
        category1_names = employment
    } else if (category1 === "Ethnicity") {
        category1_names = ethnicity
    } else if (category1 === "Job_Satisfaction") {
        category1_names = job_satisfaction
    } else if (category1 === "Programming_Language") {
        category1_names = programing_language
    } else if (category1 === "MainBranch") {
        category1_names = mainbranch
    } else if (category1 === "Operating_System") {
        category1_names = operating_system
    } else if (category1 === "Sexuality") {
        category1_names = sexuality
    } else if (category1 === "Remote_Frequency") {
        category1_names = remote_frequancy
    }

    if (category2 === "Education") {
        category2_names = education
    } else if (category2 === "Employment") {
        category2_names = employment
    } else if (category2 === "Ethnicity") {
        category2_names = ethnicity
    } else if (category2 === "Job_Satisfaction") {
        category2_names = job_satisfaction
    } else if (category2 === "Programming_Language") {
        category2_names = programing_language
    } else if (category2 === "MainBranch") {
        category2_names = mainbranch
    } else if (category2 === "Operating_System") {
        category2_names = operating_system
    } else if (category2 === "Sexuality") {
        category2_names = sexuality
    } else if (category2 === "Remote_Frequency") {
        category2_names = remote_frequancy
    }

    var values = []

    for(let x of category1_names) {
        let z = {}
        z['name'] = x
        z['axes'] = []
        for (let y of category2_names) {
            let z2 = {}
            z2['name'] = y
            z2['value'] = 0
            z.axes.push(z2)
        }
        values.push(z)
    }

    for(let x=0; x<filtered_dataset.length; x++) {
        for (let i = 0; i < values.length; i++) {
            if (values[i].name.normalize() === filtered_dataset[x][category1].normalize()) {
                for (let j = 0; j < values[i].axes.length; j++) {
                    if (values[i].axes[j].name.normalize() === filtered_dataset[x][category2].normalize()) {
                        values[i].axes[j].value += 1
                    }
                }
            }
        }
    }

    console.log("calling bar chart")

    barChartGetData(category1_names, category2_names, category1, category2, values)

}