;(function () {
	'use strict';

	angular
		.module('utils')
		.factory('utilsService', fileUtilsService);

	/* @ngInject */
	function fileUtilsService() {
		return {
			getFileBlobURL: getFileBlobURL,
			getTimeFormatFromSeconds: getTimeFormatFromSeconds
		};

		function getFileBlobURL( file ) {
			return createFileURL( file );
		}

		function createFileURL( file ) {
			var URL = window.URL || window.webkitURL;

			return URL.createObjectURL( file );
		}

		function getTimeFormatFromSeconds( seconds ) {
			var sec, min;

			sec = parseInt( seconds % 60 ).toString();
			min = Math.floor( seconds / 60 ).toString();

			if ( sec.length === 1 ) {
				sec = '0' + sec;
			}

			return min + ':' + sec;
		}
	}

})();

