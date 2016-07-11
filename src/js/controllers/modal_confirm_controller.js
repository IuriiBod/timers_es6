const _uibMODALINSTANCE = new WeakMap();

class ModalConfirmCtrl{
  constructor($uibModalInstance, timer){
    _uibMODALINSTANCE.set(this, $uibModalInstance);
    
    this.timer = timer;
  }
  
  ok() {
    _uibMODALINSTANCE.get(this).close(this.timer.id);
  }

  cancel() {
    _uibMODALINSTANCE.get(this).dismiss('cancel');
  }
}

ModalConfirmCtrl.$inject = ['$uibModalInstance', 'timer'];

export default ModalConfirmCtrl;