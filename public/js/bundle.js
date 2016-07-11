(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _main_controller = require('./controllers/main_controller');

var _main_controller2 = _interopRequireDefault(_main_controller);

var _modal_controller = require('./controllers/modal_controller');

var _modal_controller2 = _interopRequireDefault(_modal_controller);

var _modal_confirm_controller = require('./controllers/modal_confirm_controller');

var _modal_confirm_controller2 = _interopRequireDefault(_modal_confirm_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleName = 'timer.controllers';

angular.module(moduleName, []).controller('timer.MainCtrl', _main_controller2.default).controller('timer.ModalCtrl', _modal_controller2.default).controller('timer.ModalConfirmCtrl', _modal_confirm_controller2.default);

exports.default = moduleName;

},{"./controllers/main_controller":2,"./controllers/modal_confirm_controller":3,"./controllers/modal_controller":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MODAL = new WeakMap();
var SERVICE = new WeakMap();

var MainCtrl = function () {
  function MainCtrl($uibModal, TimerService) {
    _classCallCheck(this, MainCtrl);

    MODAL.set(this, $uibModal);
    SERVICE.set(this, TimerService);

    this.timer = {};
    this.timers = SERVICE.get(this).getTimers();

    this.currentDate = { date: new Date() };
    SERVICE.get(this).getCurrentDate(this.currentDate);
  }

  _createClass(MainCtrl, [{
    key: 'edit',
    value: function edit(id) {
      this.timer = angular.copy(SERVICE.get(this).getTimer(id));
      this.open();
    }
  }, {
    key: 'reset',
    value: function reset(id) {
      SERVICE.get(this).resetTimer(id, this.currentDate.date);
    }
  }, {
    key: 'open',
    value: function open() {
      var _this = this;

      var modalInstance = MODAL.get(this).open({
        animation: true,
        templateUrl: 'views/partials/modal.html',
        controller: 'timer.ModalCtrl as vm',
        size: 'sm',
        resolve: {
          timer: function timer() {
            return _this.timer;
          }
        }
      });

      modalInstance.result.then(function (timer) {
        SERVICE.get(_this).saveTimer(timer);
        _this.timer = {};
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      var _this2 = this;

      this.timer = angular.copy(SERVICE.get(this).getTimer(id));

      var modalInstance = MODAL.get(this).open({
        animation: true,
        templateUrl: 'views/partials/confirm.html',
        controller: 'timer.ModalConfirmCtrl as vm',
        size: 'sm',
        resolve: {
          timer: function timer() {
            return _this2.timer;
          }
        }
      });

      modalInstance.result.then(function (id) {
        SERVICE.get(_this2).deleteTimer(id);
        _this2.timer = {};
      });
    }
  }, {
    key: 'className',
    value: function className(end) {
      return SERVICE.get(this).calculateClassName(end, this.currentDate.date);
    }
  }]);

  return MainCtrl;
}();

MainCtrl.$inject = ['$uibModal', 'TimerService'];

exports.default = MainCtrl;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _uibMODALINSTANCE = new WeakMap();

var ModalConfirmCtrl = function () {
  function ModalConfirmCtrl($uibModalInstance, timer) {
    _classCallCheck(this, ModalConfirmCtrl);

    _uibMODALINSTANCE.set(this, $uibModalInstance);

    this.timer = timer;
  }

  _createClass(ModalConfirmCtrl, [{
    key: 'ok',
    value: function ok() {
      _uibMODALINSTANCE.get(this).close(this.timer.id);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      _uibMODALINSTANCE.get(this).dismiss('cancel');
    }
  }]);

  return ModalConfirmCtrl;
}();

ModalConfirmCtrl.$inject = ['$uibModalInstance', 'timer'];

exports.default = ModalConfirmCtrl;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _uibMODALINSTANCE = new WeakMap();

var ModalCtrl = function () {
  function ModalCtrl($uibModalInstance, timer) {
    _classCallCheck(this, ModalCtrl);

    _uibMODALINSTANCE.set(this, $uibModalInstance);

    this.timer = timer;
    this.isTimerStart = {
      open: false
    };
    this.isTimerPeriod = {
      open: false
    };
    this.timepickerOptions = {
      readonlyInput: false,
      showMeridian: false
    };
  }

  _createClass(ModalCtrl, [{
    key: 'ok',
    value: function ok() {
      _uibMODALINSTANCE.get(this).close(this.timer);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      _uibMODALINSTANCE.get(this).dismiss('cancel');
    }
  }, {
    key: 'openCalendar',
    value: function openCalendar(event, picker) {
      event.preventDefault();
      event.stopPropagation();

      this[picker].open = true;
    }
  }]);

  return ModalCtrl;
}();

ModalCtrl.$inject = ['$uibModalInstance', 'timer'];

exports.default = ModalCtrl;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moduleName = 'timer.directives';
var SERVICE = new WeakMap();

var ItemTimer = function () {
	function ItemTimer(TimerService) {
		_classCallCheck(this, ItemTimer);

		this.restrict = 'EA';
		this.templateUrl = 'views/partials/item.html';
		this.controller = 'timer.MainCtrl as vm';
		this.scope = {
			item: '=',
			current: '='
		};

		SERVICE.set(this, TimerService);
	}

	_createClass(ItemTimer, null, [{
		key: 'directiveFactory',
		value: function directiveFactory(TimerService) {
			return new ItemTimer(TimerService);
		}
	}]);

	return ItemTimer;
}();

ItemTimer.directiveFactory.$inject = ['TimerService'];

angular.module(moduleName, []).directive('itemTm', function () {
	return new ItemTimer.directiveFactory();
});

exports.default = moduleName;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*let moduleName='timer.filters';

angular.module(moduleName, [])
  .filter('timerFilter', () => {
		return (ms) => {
			if (ms < 0) {
				return '--:--';
			}

			let d, h, m, s, arr = [], arrDate = [];
			s = Math.floor(ms / 1000);
			m = Math.floor(s / 60);
			s = s % 60;
			h = Math.floor(m / 60);
			m = m % 60;
			d = Math.floor(h / 24);
			h = h % 24;

			arr.push(d,h,m,s);

			arrDate = arr.map(item => item > 9 ? item : ('0' + item) );

			return arrDate.join(':');
		}
	});
	
export default moduleName;
*/

var moduleName = 'timer.filters';

var TimerFilter = function () {
		function TimerFilter(ms) {
				_classCallCheck(this, TimerFilter);

				this.ms = ms;
		}

		_createClass(TimerFilter, [{
				key: 'parseMs',
				value: function parseMs() {
						var ms = this.ms;

						if (ms < 0) {
								return '--:--';
						}

						var d = void 0,
						    h = void 0,
						    m = void 0,
						    s = void 0,
						    arr = [],
						    arrDate = [];
						s = Math.floor(ms / 1000);
						m = Math.floor(s / 60);
						s = s % 60;
						h = Math.floor(m / 60);
						m = m % 60;
						d = Math.floor(h / 24);
						h = h % 24;

						arr.push(d, h, m, s);

						arrDate = arr.map(function (item) {
								return item > 9 ? item : '0' + item;
						});

						return arrDate.join(':');
				}
		}], [{
				key: 'TimerFilterFactory',
				value: function TimerFilterFactory(ms) {
						var filter = new TimerFilter(ms);
						return filter.parseMs();
				}
		}]);

		return TimerFilter;
}();

TimerFilter.TimerFilterFactory.$inject = ['ms'];

angular.module(moduleName, []).filter('timerFilter', function () {
		return TimerFilter.TimerFilterFactory;
});

exports.default = moduleName;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INTERVAL = new WeakMap();
var moduleName = 'timer.services';
var _timers = [],
    _id = 0;

function getIndexOf(id) {
  for (var i = _timers.length - 1; i >= 0; i--) {
    if (_timers[i].id === id) {
      return i;
    }
  }
  return -1;
}

var TimerService = function () {
  function TimerService($interval) {
    _classCallCheck(this, TimerService);

    INTERVAL.set(this, $interval);
  }

  _createClass(TimerService, [{
    key: 'getTimers',
    value: function getTimers() {
      return _timers;
    }
  }, {
    key: 'getTimer',
    value: function getTimer(id) {
      if (angular.isNumber(id)) {
        var index = getIndexOf(id);
        return _timers[index];
      } else {
        return {};
      }
    }
  }, {
    key: 'saveTimer',
    value: function saveTimer(timer) {
      if (angular.isNumber(timer.id)) {
        var index = getIndexOf(timer.id);
        _timers.splice(index, 1, timer);
      } else {
        timer.id = _id;
        _timers.push(timer);
        _id++;
      }
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer(id, date) {
      var timer = this.getTimer(id);
      timer.date = date;
      this.saveTimer(timer);
    }
  }, {
    key: 'deleteTimer',
    value: function deleteTimer(id) {
      var index = getIndexOf(id);
      _timers.splice(index, 1);
    }
  }, {
    key: 'getCurrentDate',
    value: function getCurrentDate(date) {
      INTERVAL.get(this)(function () {
        date.date = new Date();
      }, 1000);
    }
  }, {
    key: 'calculateClassName',
    value: function calculateClassName(end, current) {
      var ms = end - current;
      if (ms > 600000) {
        return 'before10';
      } else if (ms > 300000) {
        return 'before5';
      } else if (ms > 0) {
        return 'before1';
      } else {
        return 'before0';
      }
    }
  }], [{
    key: 'TimerServiceFactory',
    value: function TimerServiceFactory($interval) {
      return new TimerService($interval);
    }
  }]);

  return TimerService;
}();

TimerService.TimerServiceFactory.$inject = ['$interval'];

angular.module(moduleName, []).factory('TimerService', TimerService.TimerServiceFactory);

exports.default = moduleName;

},{}],8:[function(require,module,exports){
'use strict';

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/home.html',
    controller: 'timer.MainCtrl',
    controllerAs: 'vm'
  }).otherwise({ redirectTo: '/' });
}

config.$inject = ['$routeProvider'];

angular.module('timer', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'infinite-scroll', _services2.default, _controllers2.default, _directives2.default, _filters2.default]).config(config);

angular.bootstrap(document, ['timer']);
//export default moduleName;

},{"./controllers":1,"./directives":5,"./filters":6,"./services":7}]},{},[8]);
