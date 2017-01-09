;(function () {
	angular
		.module('app')
		.config(config);

	/* @ngInject */
	function config($stateProvider) {

		$stateProvider
			.state('playlist', {
				url: '/playlist',
				parent: 'standard',
				templateUrl: 'components/playlist/playlist.tpl.html',
				controller: 'PlaylistController as ctrl',
				resolve: {
					audioList: getAudioList
				}
			});
	}

	/* @ngInject */
	function getAudioList( playlistService, $state, $timeout, $q ) {
		var deferred = $q.defer(),
			list = playlistService.get();

		$timeout(function () {
			if (list.length === 0) {
				$state.go('upload');
				deferred.reject( 'list is empty' );
			} else {
				playlistService.resetConfig();
				deferred.resolve( list );
			}
		}, 0);


		return deferred.promise;
	}
})();