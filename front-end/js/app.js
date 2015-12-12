angular
  .module('tedchatApp', [])
  .controller('MainController', MainController)
  .directive('video', videoView);

function videoView(){
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '_videoView.html';
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
      maxResults: 5,
      type: "video"
    });
  onYouTubeIframeAPIReady();
}


function init() {
  gapi.client.load('youtube', 'v3').then(function() {
    gapi.client.setApiKey('AIzaSyDTU2aqu4zGnwda1KYKF2VwLYqG8hcTaM8');
  });
};

function MainController(){
  console.log("LOADED!");
  var main = this;

  main.videoIds = [];

  main.search = function() {
    createSearch(main.keyword).execute(function(res) {
      main.videoIds = res.items.map(function(item) {
        return item.id.videoId;
      });

      console.log(main.videoIds);
    });
  };
}












