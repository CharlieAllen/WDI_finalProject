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

MainController.$inject = ['$scope', 'YOUTUBE_URL', 'TokenService', 'User'];

function MainController($scope, YOUTUBE_URL, TokenService, User){
  var main = this;

  this.all = [];
  main.user = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if (token) {
      console.log(res);
      main.getUsers();
      main.user = TokenService.decodeToken();
    }

    main.message = res.message;
  }

  main.login = function() {
    console.log('running');
    User.login(main.user, handleLogin);
  }

  main.disappear = function() {
    TokenService.removeToken();
    main.all = [];
  }

  main.getUsers = function() {
    main.all = User.query();
  }

  main.isLoggedIn = function() {
    return !!TokenService.getToken();
  }

  if (main.isLoggedIn()) {
    main.getUsers();
    main.user = TokenService.decodeToken();
  }

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
  //createSearch('TED');
}