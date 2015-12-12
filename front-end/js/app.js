angular
  .module('tedchatApp', [])
  .controller('MainController', MainController)
  .directive('youtube', youtubeView)
  .constant('YOUTUBE_URL', 'https://www.youtube.com/embed/')
  .config(whitelistUrls);

MainController.$inject = ['YOUTUBE_URL'];

whitelistUrls.$inject = ['$sceDelegateProvider', 'YOUTUBE_URL'];

function whitelistUrls($sceDelegateProvider, YOUTUBE_URL){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self', 
    YOUTUBE_URL + '/**'
  ])
};

function youtubeView(){
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '_youtubeView.html';
  directive.scope = {
    videoId: '='
  }
  return directive;
}

function createSearch(keyword) {
  return request = gapi.client.youtube.search.list({
      q: keyword,
      part: "snippet",
      channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
      maxResults: 6,
      type: "video"
    });
  onYouTubeIframeAPIReady();
}


function init() {
  gapi.client.load('youtube', 'v3').then(function() {
    gapi.client.setApiKey('AIzaSyDTU2aqu4zGnwda1KYKF2VwLYqG8hcTaM8');
  });
};

function MainController(YOUTUBE_URL){
  console.log("LOADED!");
  var main = this;

  main.videoIds = [];

  main.search = function() {
    createSearch(main.keyword).execute(function(res) {
      main.videoIds = res.items.map(function(item) {
        return YOUTUBE_URL + item.id.videoId;
      });

      console.log(main.videoIds);
    });
  };
}












