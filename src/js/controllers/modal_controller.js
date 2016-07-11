const _uibMODALINSTANCE = new WeakMap();

class ModalCtrl{
  constructor($uibModalInstance, timer){
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
    }
  }
  
  ok() {
    _uibMODALINSTANCE.get(this).close(this.timer);
  }

  cancel() {
    _uibMODALINSTANCE.get(this).dismiss('cancel');
  }

  openCalendar(event, picker) {
    event.preventDefault();
    event.stopPropagation();

    this[picker].open = true;
  }
  
}

ModalCtrl.$inject = ['$uibModalInstance', 'timer'];

export default ModalCtrl;