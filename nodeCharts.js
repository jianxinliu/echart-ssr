// ref: https://github.com/hellosean1025/node-echarts
// https://www.npmjs.com/package/node-echart5

var echarts = require("echarts");
var fs = require('fs');
var canvas = require('canvas');

let defaultConfig = {
  width: 500,
  height: 500,
  option: {},
  enableAutoDispose: true
};

module.exports = function (config) {
  config = Object.assign({}, defaultConfig, config);
  // 官方建议：设置去除动画，防止渲染不一致
  config.option.animation = false;

  const ctx = canvas.createCanvas(config.height, config.width);
  echarts.setCanvasCreator(() => ctx);
  let chart = echarts.init(ctx);
  chart.setOption(config.option);

  const canvasChart = chart.getDom();
  const imgBuffer = canvasChart.toBuffer();
  if (config.path) {
    try {
      fs.writeFileSync(config.path, imgBuffer);
      if (config.enableAutoDispose) {
        chart.dispose();
      }
      console.log("Create Img:" + config.path);
    } catch (err) {
      console.error("Error: Write File failed" + err.message);
    }
  } else {
    var buffer = imgBuffer;
    try {
      if (config.enableAutoDispose) {
        chart.dispose();
      }
    } catch (e) { }
    return buffer;
  }
  if (config.enableAutoDispose) {
    chart.dispose();
  }
};