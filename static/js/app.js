function init() {
  d3.json("static/js/samples.json").then((data)=> {
      // loop through names object and grab all the ids/names and eppend them to demographics dropdown
      data.names.forEach((name) => {
          d3.select("#selDataset")
          .append("option")
          .text(name)
          .property("value");
      });
      // apply an ID for the intial plot
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
    height: 600,
    width: 500
    // margin: {
    //   l: 100,
    //   r: 100,
    //   t: 100,
    //   b: 100
    // }
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
  showlegend: false,
  height: 600,
  width: 1000
};

Plotly.newPlot('bubble', data, layout);

});}

function gaugePlot(id){
  d3.json("static/js/samples.json").then(function(data) {


    var wFreq = data.metadata.filter(data => data.id.toString() === id)[0].wfreq;
    console.log(wFreq);

    var data = [
      {
        type: "indicator",
        value: wFreq,
        // delta: { reference: 10 },
        gauge: { axis: { visible: true, range: [0, 10] } },
        domain: { row: 0, column: 0}
      }]
    
      var layout = {
        width: 800,
        height: 400,
        // margin: { t: 100, b: 80},
        grid: { rows: 1, columns: 2, pattern: "independent" },
        template: {
          data: {
            indicator: [
              {
                title: { text: "Scrubs Per Week" },
                mode: "number+delta+gauge"
                // delta: { reference: 90 }
              }]
          }
        }
      };
      Plotly.newPlot('gauge', data, layout);
  });
}


init();

