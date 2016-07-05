const INTERVAL = new WeakMap();
let moduleName='timer.services';
let _timers = [];

class TimerService {
	constructor($interval) {
		INTERVAL.set(this, $interval);
	}
	
	getTimers() {
		return _timers;
	}
	
	getTimer(index) {
		if (angular.isNumber(index)) {
      return _timers[index];
    } else {
      return {};
    }
	}
	
	saveTimer(timer) {
    if (angular.isNumber(timer.id)) {
      _timers.splice(timer.id, 1, timer);
    } else {
			timer.id = _timers.length;
      _timers.push(timer);
		}
	}
	
	resetTimer(index, date) {
		let timer = this.getTimer(index);
		timer.date = date;
		this.saveTimer(timer);
  }
	
	deleteTimer(index) {
    _timers.splice(index, 1);
  }
	
	getCurrentDate(date) {
		INTERVAL.get(this)(() => {
			date.date = new Date();
		}, 1000);
  }
	
	calculateClassName(end, current) {
    let ms = end - current;
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
	
	static TimerServiceFactory($interval){
    return new TimerService($interval);
  }
}

TimerService.TimerServiceFactory.$inject = ['$interval'];

angular.module(moduleName, [])
  .factory('TimerService', TimerService.TimerServiceFactory);

export default moduleName;