const onvif = require('onvif');
const os = require('os');
const path = require('path');
const fs = require('fs');

function _rstp(host, port) { return "rstp://" + host + ":" + port + "/h264_ulaw.sdp"; }
function _http(host, port) { return "http://" + host + ":" + port + "/video"; }
function _onvif(host, port) { return host + ":" + port + "/onvif/device_service"; }

function getAllIpCameras(stream) {
    console.log('hostname, port, rstp, http, onvif');
    
    onvif.Discovery.probe(function(err, cams) {
        if(err) { Console.log("illo un error:\n" + err); }

        cams.forEach(function(cam) { 
            const host = cam.hostname, port = cam.port;
            var cam_data = [
                host, port, _rstp(host,port), _http(host,port), _onvif(host,port)
            ].join(", ");
            console.log(cam_data);
        }); 
    });
}

function main() {
    // const ff = path.join(os.homedir(), "ip_cameras.csv");
    // Returns an 'error' event with onvif.EventEmitter
    // var stream = fs.createWriteStream(ff);
    const stream = process.stdout;

    getAllIpCameras(stream);
}

main();
