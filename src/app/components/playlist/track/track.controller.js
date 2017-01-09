;(function () {
	'use strict';

	angular
		.module('playlist.track')
		.controller('TrackController', TrackController);

	/* @ngInject */
	function TrackController( $element, $scope, playlistService, utilsService ) {
		var ctrl = this,
			audioElement = angular.element( $element ).find( 'audio' )[0];

		ctrl.currentSpeed = 1;
		ctrl.currentVolume = 1;
		ctrl.currentTime = 0;
		ctrl.currentTimeString = '0:00';
		ctrl.currentVolumePercentage = 100;
		ctrl.duration = 0;
		ctrl.durationString = '0:00';
		ctrl.isPlaying = false;

		ctrl.play = play;
		ctrl.pause = pause;
		ctrl.stop = stop;
		ctrl.setTime = setTime;
		ctrl.setSpeed = setSpeed;
		ctrl.setVolume = setVolume;

		ctrl.$onInit = function () {
			audioElement.ontimeupdate = handleTimeUpdate;
			audioElement.onloadeddata = handleLoadedData;
			audioElement.onended = handleOnEndedTrack;

			function handleTimeUpdate() {
				ctrl.currentTime = parseInt( audioElement.currentTime );
				ctrl.currentTimeString = utilsService.getTimeFormatFromSeconds( ctrl.currentTime );
				$scope.$digest();
			}

			function handleLoadedData() {
				ctrl.duration = parseInt( audioElement.duration );
				ctrl.durationString = utilsService.getTimeFormatFromSeconds( ctrl.duration );
				$scope.$digest();
			}
			
			function handleOnEndedTrack() {
				playlistService.next();
			}

			$scope.$watchCollection(function () {
				return ctrl.file.config
			}, handleWatchConfig);
			
		};

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
			playlistService.setVolume( ctrl.currentVolume );
		}

		function setSpeed() {
			audioElement.playbackRate = ctrl.currentSpeed;
		}
		
		function setTime() {
			audioElement.currentTime = ctrl.currentTime;
		}

		function handleWatchConfig(newConfig, oldConfig) {
			if (newConfig.active) {
				if (newConfig.paused) {
					audioElement.pause();
					ctrl.isPlaying = false;
				} else {
					audioElement.play();
					ctrl.isPlaying = true;
				}
			} else {
				audioElement.pause();
				audioElement.currentTime = 0;
				ctrl.isPlaying = false;
			}

			if (newConfig.volume !== oldConfig.volume) {
				audioElement.volume = newConfig.volume;
				ctrl.currentVolume = newConfig.volume;
				ctrl.currentVolumePercentage = ctrl.currentVolume * 100;
			}
		}
	}

})();