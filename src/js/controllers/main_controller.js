const MODAL = new WeakMap();
const SERVICE = new WeakMap();

class MainCtrl{
  constructor($uibModal, TimerService){
    
    MODAL.set(this, $uibModal);
    SERVICE.set(this, TimerService);
    
    this.timer = {};
    this.timers = SERVICE.get(this).getTimers();
    
    this.currentDate = {date: new Date()};
    SERVICE.get(this).getCurrentDate(this.currentDate);
  }
  
  edit(id) {
    this.timer = angular.copy(SERVICE.get(this).getTimer(id));
    this.open();
  }
  
  reset(id) {
    SERVICE.get(this).resetTimer(id, this.currentDate.date);
  }
  
  open() {
    let modalInstance = MODAL.get(this).open({
      animation: true,
      templateUrl: 'views/partials/modal.html',
      controller: 'timer.ModalCtrl as vm',
      size: 'sm',
      resolve: {
        timer: () => this.timer
      }
    });

    modalInstance.result.then( timer => {
      SERVICE.get(this).saveTimer(timer);
      this.timer = {};
    });
  }
  
  delete(id) {
    this.timer = angular.copy(SERVICE.get(this).getTimer(id));
    
    let modalInstance = MODAL.get(this).open({
      animation: true,
      templateUrl: 'views/partials/confirm.html',
      controller: 'timer.ModalConfirmCtrl as vm',
      size: 'sm',
      resolve: {
        timer: () => this.timer
      }
    });

    modalInstance.result.then( id => {
      SERVICE.get(this).deleteTimer(id);
      this.timer = {};
    });
  }
  
  className(end) {
    return SERVICE.get(this).calculateClassName(end, this.currentDate.date);
  }
}

MainCtrl.$inject = ['$uibModal', 'TimerService'];

export default MainCtrl;