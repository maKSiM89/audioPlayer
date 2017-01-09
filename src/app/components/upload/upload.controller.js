;(function () {

	angular
		.module('app.upload')
		.controller('UploadController', UploadController);
	
	/* @ngImject */
	function UploadController( uploadService ) {
		var ctrl = this;

		ctrl.audioFiles = '';
		ctrl.addToPlayList = addToPlayList;
		ctrl.errorFile = false;
		ctrl.uploadCompleted = false;

		function addToPlayList() {
			uploadService.uploadAudio( ctrl.audioFiles );
			ctrl.uploadCompleted = true;
		}
	}
})();