angular
  .module('tedchatApp', ['ui.router', 'angular-jwt', 'ngResource'])
  .constant('YOUTUBE_URL', 'https://www.youtube.com/embed/')
  .constant('API', 'http://localhost:3000/')
  .config(whitelistUrls)
  .config(MainRouter);

// Google API callback function...
function init() {
  console.log("LOADED!");
  gapi.client.load('youtube', 'v3').then(function() {
    gapi.client.setApiKey('AIzaSyDTU2aqu4zGnwda1KYKF2VwLYqG8hcTaM8');
  });
};

whitelistUrls.$inject = ['$sceDelegateProvider', 'YOUTUBE_URL'];
function whitelistUrls($sceDelegateProvider, YOUTUBE_URL){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self', 
    YOUTUBE_URL + '**'
  ])
};

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html'
    })
    .state('signup', {
      url: '/signup', 
      templateUrl: 'signup.html'
    });
  
  $urlRouterProvider.otherwise("/");
}