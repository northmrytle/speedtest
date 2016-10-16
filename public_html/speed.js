
    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);
    // device APIs are available
    //
    
    var lastlon;
    var lastlat;
    var lasttime;
    
    var curlon;
    var curlat;
    var curtime; 
    
    var speed;
    
    startSpeed();    
    
    function onDeviceReady() {
        startSpeed();
    };
    
    function startSpeed(){
        console.log('start()');;
        navigator.geolocation.watchPosition(onSuccess, onError);
        console.log ("curlat " + curlat );
        console.log ("curlon " + curlon );
        lastlat = curlat;
        lastlon = curlon;
//        setInterval('getSpeed()', 1000);
        
        
    }
    
    

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        curlat = position.coords.latitude;
        curlon = position.coords.longitude;
        curtime = position.timestamp;
        
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    
        calcSpeed();
    
        lastlat = curlat;
        lastlon = curlon;
        lasttime = curtime;
    
   
    
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    function calcDist(lat1, lon1, lat2, lon2) {
//        console.log ('distance_on_geoid');
    
	// Convert degrees to radians
	lat1 = lat1 * Math.PI / 180.0;
	lon1 = lon1 * Math.PI / 180.0;

	lat2 = lat2 * Math.PI / 180.0;
	lon2 = lon2 * Math.PI / 180.0;

	// radius of earth in metres
	var r = 6378100;

	// P
	var rho1 = r * Math.cos(lat1);
	var z1 = r * Math.sin(lat1);
	var x1 = rho1 * Math.cos(lon1);
	var y1 = rho1 * Math.sin(lon1);

	// Q
	var rho2 = r * Math.cos(lat2);
	var z2 = r * Math.sin(lat2);
	var x2 = rho2 * Math.cos(lon2);
	var y2 = rho2 * Math.sin(lon2);

	// Dot product
	var dot = (x1 * x2 + y1 * y2 + z1 * z2);
	var cos_theta = dot / (r * r);

	var theta = Math.acos(cos_theta);

	// Distance in Metres
	var ret_val =  r * theta;
        
        return ret_val;
    }

    function calcSpeed(){
//    navigator.geolocation.getCurrentPosition(onSuccess, onError);
//    console.log(lastlat +','+ lastlon + ',' + curlat + ',' + curlon);
   
    var dist = calcDist(lastlat, lastlon, curlat, curlon);
//    console.log ("distance " + dist);
        
    var time_s = (curtime - lasttime) / 1000.0;
    var speed_mps = dist / time_s;
    var speed_kph = (speed_mps * 3600.0) / 1000.0;
    var speed_mph = (speed_kph * 0.621371);
    console.log('speed: ' + speed_kph);
    

   var element = document.getElementById('speed');
        element.innerHTML = "mps " + speed_mps + '<br />' +
                            "Kph " + speed_kph + '<br />' +
                            "Mph " + speed_mph + '<br />';
    
    
    
    }