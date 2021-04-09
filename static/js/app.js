

function demographics(id){
  d3.json("static/js/samples.json").then(function(data) {
    var metadata =  data.metadata;
    console.log(metadata);
    var panel = d3.select("#sample-metadata");
    var filteredInput = metadata.filter(results => results.id.toString() === id)[0];
    console.log(filteredInput)
    panel.html("");

    Object.entries(filteredInput).forEach((key)=> {
      panel.append("li").text(key[0] + ": " + key[1]);
    
    });
  });
}


function buildPlot(id) {
  d3.json("static/js/samples.json").then(function(data) {

  var filteredSample = data.samples.filter(sample => sample.id === id)[0];

  var sampleValues = filteredSample.sample_values;

  var sampleIDs = filteredSample.otu_ids;
  
  var sampleLabels = filteredSample.otu_labels;


  var valuesSlice = sampleValues.slice(0, 10);

  var IDslice = sampleIDs.slice(0, 10);

  var labelSlice = sampleLabels.slice(0,10);

  var sampleValue = valuesSlice.reverse();

  var sampleID = IDslice.reverse();

  const name = []

  sampleID.forEach(element => {
    name.push(` OTU_ID: ${element}`);
  });


  // Bar Chart
  var trace1 = {
    x: sampleValue,
    y: name,
    text: labelSlice,
    name: IDslice,
    type: "bar",
    orientation: "h"
  };

  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 samples",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", chartData, layout);


// Bubble plot

var trace1 = {
  x: sampleIDs,
  y: sampleValues,
  text: sampleLabels,
  mode: 'markers',
  marker: {
    color: sampleIDs,
    size: sampleValues
  }
};

var data = [trace1];

var layout = {
  title: 'Marker Size and Color',
  showlegend: false,
  height: 600,
  width: 1000
};

Plotly.newPlot('bubble', data, layout);


});}


function init() {

  d3.json("samples.json").then((data)=> {

      data.names.forEach((name) => {
          d3.select("#selDataset")
          .append("option")
          .text(name)
          .property("value");
      });
      buildPlot(data.names[0]);
      demographics(data.names[0]);
  });
};
init();

function optionChanged(id){
  buildPlot(id);
  demographics(id);
};
