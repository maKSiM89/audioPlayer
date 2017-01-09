;(function () {
	angular
		.module('app')
		.config(config);

	/* @ngInject */
	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/upload');

		$stateProvider
			.state('standard', {
				abstract: true,
				templateUrl: 'layout/layout.tpl.html'
			});
	}
})();