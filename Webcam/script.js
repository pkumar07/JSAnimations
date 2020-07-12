window.onload = init;
function init() {
   navigator.getUserMedia ({video: true, audio: false}, success, error);
}

// successCallback
function success(localMediaStream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(localMediaStream);
  // Do something with the video here, e.g. video.play()
}

// errorCallback
function error(err) {
  console.log("The following error occured: " + err);
}
