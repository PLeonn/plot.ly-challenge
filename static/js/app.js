// This function grabs the metadata from samples.json file
function metaFunction(data) {

    d3.json("samples.json").then(function(d) {
        var demo = d.metadata;
        var filtData = demo.filter(jsonData => jsonData.id.toString() === data)[0];
        var sampleMetaData = d3.select("#sample-metadata");
        
        // Clear sampleMetaData variable and fill 
        sampleMetaData.html("");
        Object.entries(filtData).forEach(([key, value]) => {
          sampleMetaData.append("h5").text(`${key}:${value}`);
        })

    });
};

