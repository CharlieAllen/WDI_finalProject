angular
  .module('tedchatApp', [])
  .constant('YOUTUBE_URL', 'https://www.youtube.com/embed/')
  .config(whitelistUrls);

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