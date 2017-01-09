;(function () {
	'use strict';

	angular
		.module('app.playlist')
		.controller('PlaylistController', PlaylistController);

	/* @ngInject */
	function PlaylistController(playlistService, audioList, $state, $scope) {
		var ctrl = this,
			activeAudioConfig = playlistService.getConfig();

		ctrl.list = audioList;
		ctrl.isPlaying = false;
		ctrl.volume = activeAudioConfig['volume'];
		ctrl.remove = remove;
		ctrl.play = play;
		ctrl.pause = pause;
		ctrl.stop = stop;
		ctrl.next = next;
		ctrl.prev = prev;
		ctrl.decreaseVolume = decreaseVolume;
		ctrl.increaseVolume = increaseVolume;

		$scope.$watchCollection(function () {
			return activeAudioConfig
		}, handleWatchConfig);

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

		function handleWatchConfig(newConfig, oldConfig) {
			if (!angular.equals( newConfig, oldConfig )) {
				ctrl.isPlaying = newConfig['active'] && !newConfig['paused'];
				ctrl.volume = newConfig['volume'];
			}
		}
	}
})();