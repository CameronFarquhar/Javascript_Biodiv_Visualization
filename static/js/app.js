// Fetch the JSON data

// @param {array} rows
// @param {integer} index

// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }


function demographics(id){
  d3.json("static/js/samples.json").then(function(data) {
    var metadata =  data.metadata;
    console.log(metadata);
    var panel = d3.select("#sample-metadata");
    var filteredInput = metadata.filter(results => results.id.toString() === id)[0];
    panel.html("");
    
    Object.defineProperties(filteredInput).forEach((key)=> {
      panel.append("ul").text(key[0] + ": " + key[1]);
    });
  });
}

demographics();


function buildPlot() {
  d3.json("static/js/samples.json").then(function(data) {
  // console.log(data);
  // var metadataID = data.metadata[0].id;
  // console.log(metadataID);



  var sampleIndZero = data.samples[0];

  var sampleValues = sampleIndZero.sample_values;

  var sampleIDs = sampleIndZero.otu_ids;
  
  console.log(sampleIndZero)
  
  var sampleLabels = sampleIndZero.otu_labels;

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

buildPlot();
