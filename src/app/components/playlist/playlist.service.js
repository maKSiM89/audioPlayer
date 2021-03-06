;(function () {
	'use strict';

	angular
		.module('app.playlist')
		.factory('playlistService', playlistService);

	/* @ngInject */
	function playlistService(utilsService) {
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
			getVolume: getVolume,
			setActive: setActive,
			getActive: getActive,
			resetConfig: resetConfig
		};
		
		function get() {
			return list;
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
			stop();
			if (typeof index !== 'undefined') {
				setActive( index );
			}

			list[activeIndex]['config']['active'] = true;
			list[activeIndex]['config']['paused'] = false;
		}

		function pause() {
			list[activeIndex]['config']['paused'] = true;
		}

		function stop() {
			list[activeIndex]['config']['active'] = false;
			list[activeIndex]['config']['paused'] = false;
			setActive(0);
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

		function setVolume( volume, global ) {
			var setGlobalVolume = global || false;

			if (setGlobalVolume) {
				list.forEach(function (element) {
					element['config']['volume'] = volume;
				});
			} else {
				list[activeIndex]['config']['volume'] = volume;
			}
		}

		function getVolume() {
			return generalVolume;
		}
		
		function setActive( index ) {
			activeIndex = index;
		}

		function getActive() {
			return activeIndex;
		}

		function resetConfig() {
			list.forEach(function (element) {
				element['config']['active'] = false;
				element['config']['paused'] = false;
				element['config']['volume'] = 1;
			})
		}
	}

})();