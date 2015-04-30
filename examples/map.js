var fs = require("fs");
var path = require("path");
var watch = require("watch");
var sys = require('sys');
var exec = require('child_process').exec;
var filePath = path.join("../../renewable/panda/weather.json");
var pandaDir = path.join("../../renewable/panda");
var recompile_counter = 0;

var oohDatMap = function() {
  fs.readFile(filePath, { encoding: 'utf-8'}, function(err, data) {
    var weather_data = JSON.parse(data);
    var coords = weather_data["coord"];
    var lon = coords["lon"];
    var lat = coords["lat"];

    var blessed = require('blessed')
      , contrib = require('../')
      , screen = blessed.screen()
      , map = contrib.map({label: 'World Map'});

    screen.append(map);
    map.addMarker({"lon" : lon, "lat" : lat, color: "red", char: "X" });

    screen.render();
  });
}

oohDatMap();
