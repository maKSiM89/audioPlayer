;(function () {
	config.$inject = ["$stateProvider"];
	getAudioList.$inject = ["playlistService", "$state"];
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
	function getAudioList( playlistService, $state ) {
		return playlistService.get()
			.then( function (list) {
				if ( list.length === 0 ) {
					$state.go( 'upload' );
				}

				playlistService.resetConfig();
				return list;
			})
			.catch( function(error) {
				console.log( error );
			})
	}
})();