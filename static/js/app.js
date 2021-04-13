function init() {
  d3.json("static/js/samples.json").then((data)=> {
      // loop through names object and grab all the ids/names and eppend them to demographics dropdown
      data.names.forEach((name) => {
          d3.select("#selDataset")
          .append("option")
          .text(name)
          .property("value");
      });
      // apply an ID for the intial plots
      buildPlot(data.names[0]);
      demographics(data.names[0]);
      gaugePlot(data.names[0]);
  });
};

function optionChanged(id){
  buildPlot(id);
  demographics(id);
  gaugePlot(id);
};

function demographics(id){
  d3.json("static/js/samples.json").then(function(data) {
    // assign variable path to metadata
    var metadata =  data.metadata;
    console.log(metadata);

    // tell JS where you want to put the new list of elements
    var panel = d3.select("#sample-metadata");

    // filtered metadata by selected id so you grab only the object that matches the id
    var filteredInput = metadata.filter(results => results.id.toString() === id)[0];
    console.log(filteredInput)

    // clear out the panel upon new entry
    panel.html("");

    // loop through each key and append them to the panel
    Object.entries(filteredInput).forEach((key)=> {
      panel.append("li").text(key[0] + ": " + key[1]);
    });
  });
}


function buildPlot(id) {
  d3.json("static/js/samples.json").then(function(data) {

    // filter the sample object by id
  var filteredSample = data.samples.filter(sample => sample.id === id)[0];
  console.log(filteredSample)
  
// assign variables to each of the 3 fields
  var sampleValues = filteredSample.sample_values;

  var sampleIDs = filteredSample.otu_ids;
  
  var sampleLabels = filteredSample.otu_labels;

// find the top 10 and reverse
  var valuesSlice = sampleValues.slice(0, 10);

  var IDslice = sampleIDs.slice(0, 10);

  var labelSlice = sampleLabels.slice(0,10);

  var sampleValue = valuesSlice.reverse();

  var sampleID = IDslice.reverse();

  // create a list to hold ID names and add OTU in front
  const name = []

  sampleID.forEach(element => {
    name.push(`OTU_ID: ${element}`);
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
    yaxis: {automargin: true},
    height: 600,
    width: 500,
    margin: {r:100}
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
    size: sampleValues,
    colorscale: "Earth"
  }
};

var data = [trace1];

var layout = {
  showlegend: false,
  height: 600,
  width: 1000
};

Plotly.newPlot('bubble', data, layout);

});}

function gaugePlot(id){
  d3.json("static/js/samples.json").then(function(data) {

    // find the object that matches the id entered then grab the list with [0] and identify the value of the key with wfreq.

    var wFreq = data.metadata.filter(data => data.id.toString() === id)[0].wfreq;
    console.log(wFreq);

      // gauge plot

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wFreq,
        title: { text: "Scrubs Per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10], color: "blue" },
          bar: { color: "rgb(0,30,110)", thickness: 0.25 },
          steps: [
            { range: [0, 1], color: "rgba(0, 150, 50, 0.1)"},
            { range: [1, 2], color: "rgba(0, 150, 50, 0.2)" },
            { range: [2, 3], color: "rgba(0, 150, 50, 0.3)" },
            { range: [3, 4], color: "rgba(0, 150, 50, 0.4)" },
            { range: [4, 5], color: "rgba(0, 150, 50, 0.5)" },
            { range: [5, 6], color: "rgba(0, 150, 50, 0.6)" },
            { range: [6, 7], color: "rgba(0, 150, 50, 0.7)" },
            { range: [7, 8], color: "rgba(0, 150, 50, 0.8)" },
            { range: [8, 9], color: "rgba(0, 150, 50, 0.9)" },
            { range: [9, 10], color: "rgba(0, 150, 50, 1)" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75
          }
        }
      }
    ];
    
    var layout = { width: 525, height: 450, margin: { t: 0, b: 0, l:1 }, 
    };
      Plotly.newPlot('gauge', data, layout);
  });
}

init();

