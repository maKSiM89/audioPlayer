;(function () {
	'use strict';

	angular
		.module('playlist.track')
		.component('audioTrack', {
			templateUrl: 'components/playlist/track/track.tpl.html',
			controller: 'TrackController as ctrl',
			bindings: {
				file: '<',
				remove: '&',
				index: '<'
			}
		});

})();

