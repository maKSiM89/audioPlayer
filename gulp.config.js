module.exports = function () {
	return {
		sources: {
			index: 'src/index.html',
			scripts: 'src/app/**/*.js',
			stylesheets: [
                'src/app/**/*.scss',
                'src/assets/scss/**/*.scss'
            ],
			images: 'src/assets/images/**/*',
            fonts: 'src/assets/fonts/**/*',
            templates: 'src/app/**/*.tpl.html',
			vendorScripts: [
				'node_modules/angular/angular.js',
				'node_modules/angular-ui-router/release/angular-ui-router.js',
				'node_modules/ng-file-upload/dist/ng-file-upload-shim.js',
				'node_modules/ng-file-upload/dist/ng-file-upload.js',
				'node_modules/angular-material/angular-material.js',
				'node_modules/angular-animate/angular-animate.js',
				'node_modules/angular-aria/angular-aria.js'
			],
			vendorStylesheets: [
				'node_modules/angular-material/angular-material.css'
			]
		},
		destination: {
            index: 'build',
            scripts: 'build/app',
            stylesheets: 'build/stylesheets',
            images: 'build/images',
            fonts: 'build/fonts',
            templates: 'build/app',
            vendors: 'build/vendor'
        }
	}
};