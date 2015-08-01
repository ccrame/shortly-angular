angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.sending = false;
  $scope.url = {
    text: ''
  };

  $scope.addLink = function(){
    if($scope.validUrl()){
      $scope.sending = true;
      Links.postLink($scope.url.text)
        .then(function(){
          $scope.sending = false;
          $scope.url.text = "";
        })
        .catch(function(err){
          console.err(err);
        });
    }
  };

  var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  $scope.validUrl = function(){
    return $scope.url.text && $scope.url.text.match(rValidUrl);
  };
});