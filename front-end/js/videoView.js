angular
  .module('tedchatApp', [])
  .controller('MainController', MainController)
  .directive('video', videoView);

function videoView(){
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  return directive;
}