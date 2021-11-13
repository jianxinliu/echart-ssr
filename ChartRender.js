const express = require('express');
const nodeCharts = require('./nodeCharts');
const app = express();
app.use(express.json());

// Render server heleath check
app.get('/ping', function (_, resp) {
  resp.send('PONG');
});

app.post('/render', function (req, resp) {
  const body = req.body;
  if (!body) {
    resp.status(400);
    resp.send("Bad Request: use request body please!");
    return;
  }
  let { option, height, width } = body;
  if (!option) {
    resp.status(400);
    resp.send('Bad Request: should include option in request body!');
    return;
  }
  var config = {
    width: width || 1000, // Image width, type is number.
    height: height || 1000, // Image height, type is number.
    option, // Echarts configuration, type is Object.
    // If the path  is not set, return the Buffer of image.
    // path: './chart.png', // Path is filepath of the image which will be created.
    enableAutoDispose: true  // Enable auto-dispose echarts after the image is created.
  };
  const img = nodeCharts(config);
  resp.setHeader("content-type", "image/png");
  resp.end(img, 'binary');
});

app.listen(3004);
console.log('Chart Render Server listening on 3004...');