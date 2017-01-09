;(function () {
	'use strict';

	angular
		.module('app.upload')
		.factory('uploadService', uploadService);

	/* @ngInject */
	function uploadService( playlistService ) {
		return {
			uploadAudio: uploadAudio
		};

		function uploadAudio( files ) {
			files.forEach( function ( file ) {
				playlistService.add( file );
			});
		}
	}

})();

