/**
* Frontpage Controller
* handles actions on "Home" -page
*/

window.throwaApp.controller('Frontpage', function ($scope, $http, $timeout) {
  // Handler for new folder -button
  $scope.newFolder = function () {
    // Fetch a new random UNUSED folder name from API
    $http.get(window.apiURI + '/folder')
      .success(function (data) {
        // Redirect to new data folder
        window.location.href = '/' + data.folder
      })
      .error(function (err) {
        // TODO: Report error to user
        console.log('Error getting new folder!', err)
      })
  }
})
