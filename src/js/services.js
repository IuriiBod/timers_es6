const INTERVAL = new WeakMap();
let moduleName='timer.services';
let _timers = [], _id = 0;

function getIndexOf(id) {
  for(var i = _timers.length - 1; i >= 0; i--) {
    if (_timers[i].id === id) {
      return i;
    }
  }
  return -1;
}

class TimerService {
  constructor($interval) {
    INTERVAL.set(this, $interval);
  }
  
  getTimers() {
    return _timers;
  }
  
  getTimer(id) {
    if (angular.isNumber(id)) {
      let index = getIndexOf(id);
      return _timers[index];
    } else {
      return {};
    }
  }
  
  saveTimer(timer) {
    if (angular.isNumber(timer.id)) {
      let index = getIndexOf(timer.id);
      _timers.splice(index, 1, timer);
    } else {
      timer.id = _id;
      _timers.push(timer);
      _id++;
    }
  }
  
  resetTimer(id, date) {
    let timer = this.getTimer(id);
    timer.date = date;
    this.saveTimer(timer);
  }
  
  deleteTimer(id) {
    let index = getIndexOf(id);
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