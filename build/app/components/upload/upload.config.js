;(function () {
	config.$inject = ["$stateProvider"];
	angular
		.module('app')
		.config(config);

	/* @ngInject */
	function config($stateProvider) {

		$stateProvider
			.state('upload', {
				url: '/upload',
				parent: 'standard',
				templateUrl: 'components/upload/upload.tpl.html',
				controller: 'UploadController as ctrl'
			});
	}
})();