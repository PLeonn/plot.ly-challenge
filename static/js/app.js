// This function grabs the metadata from samples.json file
function grabMetaData(data) {

    d3.json("samples.json").then(function(d) {
        var metaData = d.metadata;
        var filtData = metaData.filter(jsonData => jsonData.id.toString() === data)[0];
        var sampleMetaData = d3.select("#sample-metadata");
        
        // Clear sampleMetaData variable and fill 
        sampleMetaData.html("");
        Object.entries(filtData).forEach(([key, value]) => {
          sampleMetaData.append("h5").text(`${key}:${value}`);
        })

    });
};

// Create funtion to render the bar chart/bubbles
function renderCharts() {
    // Bring in data and extract all data first
    d3.json("samples.json").then(function(dataImport) {
        var data = dataImport;
        var dataSamples = data.samples;

        var all_otu_ids = dataSamples[0].otu_ids;
        var all_sample_values = dataSamples[0].sample_values;
        var all_otu_labels = dataSamples[0].otu_labels;
        // Use .map and .slice to curate down to only desired data
        var otu_ids =  dataSamples.map(({ otu_ids }) => otu_ids.slice(0, 10))[0];
        // Added this step to clearly convey OTU information
        var otu_ids_final  = otu_ids.map(x => "OTU:" + " " + x);
        var otu_labels = dataSamples.map(({ otu_labels }) => otu_labels.slice(0, 10))[0];
        var sample_values = dataSamples.map(({ sample_values }) => sample_values.slice(0, 10))[0];

        // Populate dictionary with info for the bar graph
        var barInfo = [{
            x: sample_values.reverse(),
            y: otu_ids_final.reverse(),
            text: otu_labels.reverse(),
            type: "bar",
            orientation: "h"
        }];

        // Populate dictionary with info for the graph's "bubbles"
        var bubbleInfo = [{
            x: all_otu_ids,
            y: all_sample_values,
            text: all_otu_labels,
            mode: "markers",
            marker: {
                size: all_sample_values,
                color: all_otu_ids,
            }
        }];

        // Create the plots
        Plotly.newPlot("bar", barInfo);
        Plotly.newPlot("bubble", bubbleInfo);
    });
};
function init(){
    grabMetaData();
    renderCharts();
}
// Create option change function
function optionChanged(id) {
    renderCharts(id);
    grabMetaData(id);
}

// Add dropdown menu functionality
function dropdownMenu() {

    // Select dropdown menu
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then(function(data) {
        console.log(data);
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);
        });

        metaData(data.names[0]);
        charts(data.names[0]);
    });    
};

// Call dropdown function
dropdownMenu();
// Call init function
init();