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

MainController.$inject = ['$window', '$scope', 'YOUTUBE_URL', 'TokenService', 'User', '$location'];

function MainController($window, $scope, YOUTUBE_URL, TokenService, User, $location){
  var main = this;

  this.all = [];
  main.user = {};
  main.youtubeLoaded = false;
  main.loading = false;

  $window.init = function() {
    gapi.client.load('youtube', 'v3').then(function() {
      gapi.client.setApiKey('AIzaSyDTU2aqu4zGnwda1KYKF2VwLYqG8hcTaM8');
      main.youtubeLoaded = true;
      search();
    });
  }

  function handleLogin(res) {
    console.log(res);
    var token = res.token ? res.token : null;

    if (token) {
      //console.log(res);
      TokenService.saveToken(token);
      main.user = TokenService.decodeToken();
      main.getUsers();
    }

    main.message = res.message;
  }

  main.register = function() {
     User.register(main.user, handleLogin);
   }

  main.login = function() {
    console.log('running');
    User.login(main.user, handleLogin);
    //$location.path('/profile');
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

  function search() {
    main.loading = true;
    createSearch(main.keyword).execute(function(res) {

      // $scope.apply forces angular to refresh the view
      $scope.$apply(function() {
        main.videoIds = res.items.map(function(item) {
          return YOUTUBE_URL + item.id.videoId;
        });

        main.loading = false;
      });
    });
  };

  main.search = search;
}