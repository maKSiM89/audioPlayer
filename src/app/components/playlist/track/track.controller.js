;(function () {
	'use strict';

	angular
		.module('playlist.track')
		.controller('TrackController', TrackController);

	/* @ngInject */
	function TrackController( $element, $scope, playlistService, utilsService ) {
		var ctrl = this,
			audioElement = angular.element( $element ).find( 'audio' )[0],
			isManualTimeSetting = false,
			tracksLength = playlistService.get().length;

		ctrl.settings = {
			currentSpeed: 1,
			currentVolume: 1,
			currentTime: 0,
			currentTimeString: '0:00',
			currentVolumePercentage: 100,
			duration: 0,
			durationString: '0:00',
			isPlaying: false
		};

		ctrl.controls = {
			play: play,
			pause: pause,
			stop: stop,
			setTime: setTime,
			setSpeed: setSpeed,
			setVolume: setVolume
		};
		ctrl.$onInit = onInit;
		ctrl.handleMouseDown = handleMouseDown;
		ctrl.remove = remove;

		function play() {
			playlistService.play( ctrl.index );
		}

		function pause() {
			playlistService.pause();
		}

		function stop() {
			playlistService.stop();
		}

		function setVolume() {
			playlistService.setVolume( ctrl.settings.currentVolume );
		}

		function setSpeed() {
			audioElement.playbackRate = ctrl.settings.currentSpeed;
		}
		
		function setTime() {
			audioElement.currentTime = ctrl.settings.currentTime;
			isManualTimeSetting = false;
		}
		
		function handleMouseDown() {
			isManualTimeSetting = true;
		}

		function remove() {
			stop();
			ctrl.onRemove({index: ctrl.index});
		}

		function onInit() {
			audioElement.ontimeupdate = handleTimeUpdate;
			audioElement.onloadeddata = handleLoadedData;
			audioElement.onended = handleOnEndedTrack;

			$scope.$watch('ctrl.file.config', handleWatchConfig, true);
		}

		function handleWatchConfig(newConfig, oldConfig) {
			if (newConfig.active) {
				if (newConfig.paused) {
					audioElement.pause();
					ctrl.settings.isPlaying = false;
				} else {
					audioElement.play();
					ctrl.settings.isPlaying = true;
				}
			} else {
				audioElement.pause();
				audioElement.currentTime = 0;
				ctrl.settings.isPlaying = false;
			}

			if (newConfig.volume !== oldConfig.volume) {
				audioElement.volume = newConfig.volume;
				ctrl.settings.currentVolume = newConfig.volume;
				ctrl.settings.currentVolumePercentage = ctrl.settings.currentVolume * 100;
			}
		}

		function handleTimeUpdate() {
			if (!isManualTimeSetting) {
				ctrl.settings.currentTime = parseInt( audioElement.currentTime );
				ctrl.settings.currentTimeString = utilsService.getTimeFormatFromSeconds( ctrl.settings.currentTime );
				$scope.$digest();
			}
		}

		function handleLoadedData() {
			ctrl.settings.duration = parseInt( audioElement.duration );
			ctrl.settings.durationString = utilsService.getTimeFormatFromSeconds( ctrl.settings.duration );
			$scope.$digest();
		}

		function handleOnEndedTrack() {
			if (tracksLength === 1) {
				audioElement.play();
			} else {
				playlistService.next();
			}

			$scope.$digest();
		}
	}

})();