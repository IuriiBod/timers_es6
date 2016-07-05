import { default as controllersModuleName } from './controllers';
import { default as servicesModuleName } from './services';
import { default as directivesModuleName } from './directives';
import { default as filtersModuleName } from './filters';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'views/partials/home.html',
      controller: 'timer.MainCtrl',
      controllerAs: 'vm'
    })
		.otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

angular.module('timer', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'infinite-scroll', 
	servicesModuleName, controllersModuleName, directivesModuleName, filtersModuleName])
	.config(config);

angular.bootstrap(document, ['timer']);
//export default moduleName;