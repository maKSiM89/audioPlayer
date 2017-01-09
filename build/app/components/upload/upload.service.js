;(function () {
	'use strict';

	uploadService.$inject = ["playlistService"];
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

