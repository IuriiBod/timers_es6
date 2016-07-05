import MainCtrl from './controllers/main_controller';
import ModalCtrl from './controllers/modal_controller';
import ModalConfirmCtrl from './controllers/modal_confirm_controller';

let moduleName='timer.controllers';

angular.module(moduleName, [])
    .controller('timer.MainCtrl', MainCtrl)
		.controller('timer.ModalCtrl', ModalCtrl)
		.controller('timer.ModalConfirmCtrl', ModalConfirmCtrl);

export default moduleName;