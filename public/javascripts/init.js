window.throwaApp = window.angular.module('throwaApp', ['angularFileUpload', 'ui.bootstrap'])

window.throwaApp.service('helpers', function () {
  // Format bytes to size -string
  this.bytesToSize = function (bytes) {
    if (typeof bytes === 'undefined') return 'unknown'
    if (bytes === 0) return '0 Byte'
    var k = 1000
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
  }
})
