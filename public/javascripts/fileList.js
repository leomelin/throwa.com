/**
* Filelist Controller
* handles throwa -folder actions
*/
window.throwaApp.controller('FileList', function ($scope, $http, $timeout, $upload, helpers) {
  $scope.bytesToSize = helpers.bytesToSize

  $timeout(function () {
    // As soon as the template has loaded, send api request to check folder contents in the current Throwa -folder
    $http.get(window.apiURI + '/files/' + $scope.folder)
      .success(function (data) {
        $scope.files = data
      })
      .error(function (err) {
        console.log('Folder not found!', err)
        // TODO: Report error to user
        $scope.files = []
      })
  }, 0)

  // Remove ajax -handler for files
  $scope.remove = function (id) {
    $http.delete(window.apiURI + '/files/' + $scope.folder + '/' + id)
      .success(function (data) {
        $scope.files.splice(window._.findIndex($scope.files, { _id: id }), 1)
      })
      .error(function (err) {
        // TODO: Report error to user
        console.log('Error deleting file!', err)
      })
  }

  // Upload queue handler (triggered when user clicks upload button or drops file to the drop-zone)
  $scope.$watch('uploadQueue', function () {
    $scope.upload($scope.uploadQueue)
  })

  // Upload handler
  $scope.upload = function (files) {
    console.log(files)
    if (files && files.length) {
      files.forEach(function (file) {
        // Set temporary id for file to allow file to be rendered to template
        file._id = 'NEW_' + Math.random().toString(36).substring(2)

        $scope.files.push({
          _id: file._id,
          filename: file.name,
          size: file.size,
          progress: 0
        })

        var scopeFileIndex = window._.findIndex($scope.files, { _id: file._id })
        console.log('scopeFile', $scope.files[scopeFileIndex])
        // TODO: Report error to user

        // Send the upload API -request
        $upload.upload({
          url: window.apiURI + '/files/' + $scope.folder,
          method: 'POST',
          file: file
        }).progress(function (evt) {
          // Update progress bar
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10)
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name)

          $scope.files[scopeFileIndex].progress = progressPercentage
        }).success(function (data, status, headers, config) {
          // On success, get response from API and replace the temporary file -item
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data)
          var scopeFileIndex = window._.findIndex($scope.files, { _id: file._id })

          $scope.files.splice(scopeFileIndex, 1, data)

        })
      })
    }
  }

})
