var moduleName='timer.directives';
const SERVICE = new WeakMap();

class ItemTimer {
	constructor(TimerService) {
		this.restrict = 'EA';
		this.templateUrl = 'views/partials/item.html';
		this.controller= 'timer.MainCtrl as vm';
		this.scope = {
			item: '=',
			current: '='
		}
		
		SERVICE.set(this, TimerService);
	}
	
  static directiveFactory(TimerService){
		return new ItemTimer(TimerService);
	}
}

ItemTimer.directiveFactory.$inject = ['TimerService'];

angular.module(moduleName, [])
  .directive('itemTm', () => new ItemTimer.directiveFactory);

export default moduleName;