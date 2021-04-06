// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {

  var sampleIndZero = data.samples[0];

  var sampleValues = sampleIndZero.sample_values;

  var sampleIDs = sampleIndZero.otu_ids;

  var sampleLabels = sampleIndZero.otu_labels;

  var valuesSlice = sampleValues.slice(0, 10);

  var IDslice = sampleIDs.slice(0, 10);

  var labelSlice = sampleLabels.slice(0,10);

  var sampleValue = valuesSlice.reverse();

  var sampleID = IDslice.reverse();

  var name = []

  sampleID.forEach(element => {
    name.push(` OTU_ID: ${element}`);
  });

  console.log(name)

  var trace1 = {
    x: sampleValue,
    y: name,
    text: labelSlice,
    name: IDslice,
    type: "bar",
    orientation: "h"
  };

  // data
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

});

// d3.selectAll("#selDataset").on("change", updatePlotly);