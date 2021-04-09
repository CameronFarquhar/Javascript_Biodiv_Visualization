// Fetch the JSON data
d3.json("samples.json").then(function(data) {

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

var idNum = sampleIndZero.id;
console.log(idNum);

// d3.append("ul").text(idNum);

// var wfreqNum = data.metadata[0];

// console.log(wfreqNum);

// part of data to input
// var traceGauge = {
//   type: 'pie',
//   showlegend: false,
//   hole: 0.4,
//   rotation: 90,
//   values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
//   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//   direction: 'clockwise',
//   textinfo: 'text',
//   textposition: 'inside',
//   marker: {
//     colors: ['','','','','','','','','','white'],
//     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//     hoverinfo: 'label'
//   }
// }

// // needle
// var degrees = 50, radius = .9
// var radians = degrees * Math.PI / 180
// var x = -1 * radius * Math.cos(radians) * wfreqNum
// var y = radius * Math.sin(radians)

// var gaugeLayout = {
//   shapes: [{
//     type: 'line',
//     x0: 0.5,
//     y0: 0.5,
//     x1: 0.6,
//     y1: 0.6,
//     line: {
//       color: 'black',
//       width: 3
//     }
//   }],
//   title: 'Chart',
//   xaxis: {visible: false, range: [-1, 1]},
//   yaxis: {visible: false, range: [-1, 1]}
// }

// var dataGauge = [traceGauge]

// Plotly.plot('gauge', dataGauge, gaugeLayout)


});