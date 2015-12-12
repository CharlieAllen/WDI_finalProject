angular
  .module('tedchatApp')
  .controller('MainController', MainController);

// Youtube Data API search function
function createSearch(keyword) {
  return request = gapi.client.youtube.search.list({
      q: keyword,
      part: "snippet",
      channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
      maxResults: 6,
      type: "video"
    });
}

MainController.$inject = ['$scope', 'YOUTUBE_URL'];
function MainController($scope, YOUTUBE_URL){
  var main = this;

  main.videoIds = [];

  // added this
  main.keyword = "";

  main.search = function() {
    createSearch(main.keyword).execute(function(res) {

      // $scope.apply forces angular to refresh the view
      $scope.$apply(function() {
        main.videoIds = res.items.map(function(item) {
          return YOUTUBE_URL + item.id.videoId;
        });
      });
    });
  };
}