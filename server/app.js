var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var yaml = require('js-yaml');
var fs = require('fs');

var dataClient = require('./tcp/data_client');
var commandClient = require('./tcp/command_client');
var mapDownloader = require('./utils/map_downloader');
var ppmConverter = require('./utils/ppm_converter');
var wsCamera = require('./ws/ws_camera');

var dataRouter = require('./routes/data');
var videoRouter = require('./routes/video');
var commandRouter = require('./routes/command');
var missionRouter = require('./routes/mission');


// Config
global.config = yaml.safeLoad(fs.readFileSync(__dirname + '/../../Config/config.yaml', 'utf8'));

// Global data
global.currentMission = null;
global.globalData = {
    pos: [{
        type: '$POS',
        date: new Date(),
        content: {lat: config.map.initialPosition.lat, lng: config.map.initialPosition.lng, yaw: 0, speed: 0, signal: 0}
    }],
    mot: [],
    batt: [],
    data: [],
    state: []
};
global.commandTCP = undefined;
global.dataTCP = undefined;

// TCP Client
dataClient();
commandClient();

// Express App
var app = express();
app.use(mapDownloader);
app.use(ppmConverter);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Routers
app.use(dataRouter);
app.use(commandRouter);
app.use(missionRouter);

// Camera
if (config.camera && config.camera.enable) {
    app.use(videoRouter);
    wsCamera.initWebSocket();
}

app.listen(config.webServer.port);