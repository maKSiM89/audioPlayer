(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/layout.tpl.html',
    '<div class="container">\n' +
    '	<ap-header></ap-header>\n' +
    '	<ap-menu></ap-menu>\n' +
    '\n' +
    '	<md-content layout-padding>\n' +
    '		<ui-view></ui-view>\n' +
    '	</md-content>\n' +
    '\n' +
    '	<ap-footer></ap-footer>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/playlist/playlist.tpl.html',
    '<md-card md-whiteframe="5">\n' +
    '    <md-card-title class="md-headline">\n' +
    '        My playlist\n' +
    '    </md-card-title>\n' +
    '    <md-card-header class="playlist-controls">\n' +
    '        <span><img ng-src="images/bigPlay.png" ng-click="ctrl.play()" alt="Play" ng-if="!ctrl.isPlaying"/></span>\n' +
    '        <span><img ng-src="images/bigPause.png" ng-click="ctrl.pause()" alt="Pause" ng-if="ctrl.isPlaying"/></span>\n' +
    '        <span><img ng-src="images/bigStop.png" ng-click="ctrl.stop()" alt="Stop"/></span>\n' +
    '\n' +
    '        <span><img ng-src="images/bigPrev.png" ng-click="ctrl.prev()" alt="Prev"/></span>\n' +
    '        <span><img ng-src="images/bigNext.png" ng-click="ctrl.next()" alt="Next"/></span>\n' +
    '\n' +
    '        <span><img ng-src="images/bigMinus.png" ng-click="ctrl.decreaseVolume()" alt="Pause"/></span>\n' +
    '        <span><img ng-src="images/bigPlus.png" ng-click="ctrl.increaseVolume()" alt="Stop"/></span>\n' +
    '    </md-card-header>\n' +
    '    <md-divider></md-divider>\n' +
    '    <md-card-content class="playlist">\n' +
    '        <md-list>\n' +
    '            <md-list-item ng-repeat="item in ctrl.list">\n' +
    '                <audio-track\n' +
    '                    ng-class="{active: item.config.active}"\n' +
    '                    file="item"\n' +
    '                    remove="ctrl.remove(index)"\n' +
    '                    index="$index"\n' +
    '                ></audio-track>\n' +
    '            </md-list-item>\n' +
    '        </md-list>\n' +
    '    </md-card-content>\n' +
    '</md-card>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/upload/upload.tpl.html',
    '<form name="uploadFileForm">\n' +
    '    <md-card md-whiteframe="5">\n' +
    '        <md-card-title class="md-headline">\n' +
    '            Upload the new audio file\n' +
    '        </md-card-title>\n' +
    '        <md-divider></md-divider>\n' +
    '        <md-card-content>\n' +
    '            <md-button\n' +
    '                class="md-raised md-warn"\n' +
    '                ng-model="ctrl.audioFiles"\n' +
    '                name="files"\n' +
    '                ngf-accept="\'audio/*\'"\n' +
    '                ngf-max-size="5MB"\n' +
    '                required\n' +
    '                ngf-select\n' +
    '                ngf-multiple="true"\n' +
    '            >\n' +
    '                Choose files\n' +
    '            </md-button>\n' +
    '\n' +
    '            <div class="warn">\n' +
    '                <ul>\n' +
    '                    <li ng-repeat="file in ctrl.audioFiles">{{ file.name }}</li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="error" ng-if="uploadFileForm.files.$error && !uploadFileForm.$pristine">\n' +
    '                <span ng-show="uploadFileForm.files.$error.maxSize">\n' +
    '                    One of the selected files is too large. Maximum size is 5MB.\n' +
    '                </span>\n' +
    '                <span ng-show="uploadFileForm.files.$error.required">\n' +
    '                    Selecting files is required\n' +
    '                </span>\n' +
    '            </div>\n' +
    '        </md-card-content>\n' +
    '        <md-card-actions>\n' +
    '            <md-button class="md-primary md-raised" ng-click="ctrl.addToPlayList()" ng-disabled="!uploadFileForm.$valid">\n' +
    '                Add to Playlist\n' +
    '            </md-button>\n' +
    '            <div ng-if="ctrl.uploadCompleted" class="warn">\n' +
    '                Files were added to your <a ui-sref="playlist()">playlist!</a>\n' +
    '            </div>\n' +
    '        </md-card-actions>\n' +
    '    </md-card>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/footer/footer.tpl.html',
    '<div class="footer" layout="column" layout-align="center center">\n' +
    '    <strong>&copy; All right reserved!</strong>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/header/header.tpl.html',
    '<div class="header">\n' +
    '	<a ui-sref="upload()">\n' +
    '		<img class="logo" src="images/AudioPlayer_logo.jpg" alt="Coolest audioPlayer ever"/>\n' +
    '	</a>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/menu/menu.tpl.html',
    '<nav role="navigation" class="menu">\n' +
    '	<ul>\n' +
    '		<li>\n' +
    '			<a ui-sref="upload()" ui-sref-active="active">Add new audio</a>\n' +
    '		</li>\n' +
    '		<li>\n' +
    '			<a ui-sref="playlist()" ui-sref-active="active">My playlist</a>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '</nav>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/playlist/track/track.tpl.html',
    '<audio buffered>\n' +
    '    <source ng-src="{{ ctrl.file.url }}" type="audio/ogg">\n' +
    '    <source ng-src="{{ ctrl.file.url }}" type="audio/mpeg">\n' +
    '    Your browser does not support the audio tag.\n' +
    '</audio>\n' +
    '\n' +
    '<md-slider-container class="trackTime">\n' +
    '    <div class="controls">\n' +
    '        <span>\n' +
    '            <img ng-src="images/play.png" ng-click="ctrl.play()" alt="Play" ng-if="!ctrl.isPlaying"/>\n' +
    '        </span>\n' +
    '        <span>\n' +
    '            <img ng-src="images/pause.png" ng-click="ctrl.pause()" alt="Pause" ng-if="ctrl.isPlaying"/>\n' +
    '        </span>\n' +
    '        <span>\n' +
    '            <img ng-src="images/stop.png" ng-click="ctrl.stop()" alt="Stop" />\n' +
    '        </span>\n' +
    '        <span class="currentTime">\n' +
    '            {{ ctrl.currentTimeString }} / {{ ctrl.durationString }}\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <md-slider flex\n' +
    '        ng-model="ctrl.currentTime"\n' +
    '        min="0"\n' +
    '        max="{{ ctrl.duration }}"\n' +
    '        aria-label="time"\n' +
    '        ng-value="0"\n' +
    '        ng-mouseup="ctrl.setTime()"\n' +
    '    >\n' +
    '    </md-slider>\n' +
    '    <div class="controls">\n' +
    '        <span>\n' +
    '            <img ng-src="images/remove.png" ng-click="ctrl.remove({index: ctrl.index})" alt="Remove audio"/>\n' +
    '        </span>\n' +
    '    </div>\n' +
    '</md-slider-container>\n' +
    '\n' +
    '<md-slider-container class="short layout-align-start" >\n' +
    '    <span>Speed</span>\n' +
    '    <md-slider flex\n' +
    '        ng-model="ctrl.currentSpeed"\n' +
    '        min="0.5"\n' +
    '        max="1.5"\n' +
    '        step="0.01"\n' +
    '        aria-label="speed"\n' +
    '        class="md-accent"\n' +
    '        defaultValue="0"\n' +
    '        ng-mouseup="ctrl.setSpeed()"\n' +
    '    >\n' +
    '    </md-slider>\n' +
    '    <span>x{{ ctrl.currentSpeed | number: 1 }}</span>\n' +
    '</md-slider-container>\n' +
    '\n' +
    '<md-slider-container class="short">\n' +
    '    <span>Volume</span>\n' +
    '    <md-slider flex\n' +
    '        ng-model="ctrl.currentVolume"\n' +
    '        min="0"\n' +
    '        max="1"\n' +
    '        step="0.01"\n' +
    '        aria-label="speed"\n' +
    '        class="md-accent"\n' +
    '        defaultValue="0"\n' +
    '        ng-mouseup="ctrl.setVolume()"\n' +
    '    >\n' +
    '    </md-slider>\n' +
    '    <span>{{ ctrl.currentVolumePercentage | number: 0 }}%</span>\n' +
    '</md-slider-container>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '');
}]);
})();
