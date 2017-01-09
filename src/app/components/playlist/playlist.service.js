;(function () {
	'use strict';

	angular
		.module('app.playlist')
		.factory('playlistService', playlistService);

	/* @ngInject */
	function playlistService(utilsService, $q) {
		var list = [],
			activeIndex = 0;

		return {
			get: get,
			add: add,
			remove: remove,
			play: play,
			pause: pause,
			stop: stop,
			next: next,
			prev: prev,
			setVolume: setVolume,
			setActive: setActive,
			getActive: getActive,
			resetConfig: resetConfig,
			getConfig: getConfig
		};
		
		function get() {
			var deferred = $q.defer();

			deferred.resolve( list );

			return deferred.promise;
		}

		function add( file ) {
			var url = utilsService.getFileBlobURL( file );
			list.push({
				'url': url,
				'config': {
					'active': false,
					'paused': false,
					'volume': 1
				}
			});
		}

		function remove( index ) {
			list.splice( index, 1 );
		}

		function play( index ) {
			resetConfig();
			if (typeof index !== 'undefined') {
				setActive( index );
			}

			list[index]['config']['active'] = true;
			list[index]['config']['paused'] = false;
		}

		function pause() {
			list[activeIndex]['config']['paused'] = true;
		}

		function stop() {
			list[activeIndex]['config']['active'] = false;
			list[activeIndex]['config']['paused'] = true;
		}
		
		function next() {
			var nextIndex = activeIndex + 1;

			if (nextIndex > list.length - 1) {
				nextIndex = 0;
			}

			play( nextIndex );
		}
		
		function prev() {
			var prevIndex = activeIndex - 1;

			if (prevIndex < 0) {
				prevIndex = list.length - 1;
			}

			play( prevIndex );
		}

		function setVolume( volume ) {
			list[activeIndex]['config']['volume'] = volume;
		}
		
		function setActive( index ) {
			activeIndex = index;
		}

		function getActive() {
			return activeIndex;
		}

		function resetConfig() {
			list[activeIndex]['config']['active'] = false;
			list[activeIndex]['config']['paused'] = false;
			list[activeIndex]['config']['volume'] = 1;
		}

		function getConfig( prop ) {
			var result;

			if (prop) {
				result = list[activeIndex]['config']['prop'];
			} else {
				result = list[activeIndex]['config'];
			}

			return result;
		}
	}

})();