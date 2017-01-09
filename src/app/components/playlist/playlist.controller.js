;(function () {
	'use strict';

	angular
		.module('app.playlist')
		.controller('PlaylistController', PlaylistController);

	/* @ngInject */
	function PlaylistController(playlistService, audioList, $state, $scope) {
		var ctrl = this;

		ctrl.list = audioList;
		ctrl.isPlaying = false;
		ctrl.volume = 1;
		ctrl.controls = {
			play: play,
			pause: pause,
			stop: stop,
			next: next,
			prev: prev,
			decreaseVolume: decreaseVolume,
			increaseVolume: increaseVolume
		};
		ctrl.onRemove = remove;

		$scope.$watch(function () {
			var activeIndex = playlistService.getActive();
			return ctrl.list[activeIndex]['config'];
		}, handleWatchConfig, true);

		function remove( index ) {
			playlistService.remove( index );

			if ( ctrl.list.length === 0 ) {
				$state.go( 'upload' );
			}
		}

		function play() {
			playlistService.play();
			ctrl.isPlaying = true;
		}

		function pause() {
			playlistService.pause();
			ctrl.isPlaying = false;
		}

		function stop() {
			playlistService.stop();
			ctrl.isPlaying = false;
		}

		function next() {
			playlistService.next();
		}

		function prev() {
			playlistService.prev();
		}

		function increaseVolume() {
			var newVolume = ctrl.volume + 0.1;

			if (newVolume > 1) {
				newVolume = 1;
			}
			playlistService.setVolume( newVolume );
		}
		
		function decreaseVolume() {
			var newVolume = ctrl.volume - 0.1;

			if (newVolume < 0) {
				newVolume = 0;
			}
			playlistService.setVolume( newVolume );
		}

		function handleWatchConfig( newConfig ) {
			if (newConfig) {
				console.log( newConfig );
				ctrl.isPlaying = newConfig['active'] && !newConfig['paused'];
				ctrl.volume = newConfig['volume'];
			}
		}
	}
})();