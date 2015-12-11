angular
  .module('tedchatApp', [])
  .controller('MainController', MainController)

function createSearch(keyword) {
  console.log("SEARCH!");
  return request = gapi.client.youtube.search.list({
      q: keyword,
      part: "snippet",
      channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
      maxResults: 5,
      type: "video"
    });
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












