MY_MAP_DEFAULT_OPTION = {
	'backgroundColor': 'white',
	'controls': {
		'compass': true,
		'myLocationButton': false,
		'indoorPicker': true,
		'zoom': true
	},
	'gestures': {
		'scroll': true,
		'tilt': true,
		'rotate': true,
		'zoom': true
	}
};
CURRENT_LOCATION = {};
var global = (function(){
	var getLocalIcon = function (args) {
		args = args || {
			name: ''
		};
		console.log(cordova.file.applicationDirectory + 'img/' + (args.name || 'car.png'));
		return {
			'url': cordova.file.applicationDirectory + 'img/' + (args.name || 'car.png'),
			'size':{
		        width: (Number(args.w) || 40),
		        height: (Number(args.h) ||40)
		    }
		};
	}
	return {
		getLocalIcon: getLocalIcon
	}
})();