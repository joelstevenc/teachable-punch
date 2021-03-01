/*
Please try with devices with camera!
*/
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
/*
Reference: 
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en#stop-ended-and-active
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
*/

// reference to the current media stream
var mediaStream = null;

// Prefer camera resolution nearest to 1280x720.
const videoConstraints = {
    width: {ideal: 200}, 
    height: {ideal: 200},
    facingMode: "environment"
    //facingMode: { exact: "environment" }
    //facingMode: 'user'
  };
  const constraints = {
    video: videoConstraints,
    audio: false
  };
//var constraints = { 
  //audio: false, 
  //video: { 
   // width: {ideal: 200}, 
   // height: {ideal: 200},
    //facingMode: "user"
    //facingMode: "environment"
  //} 
//}; 

async function getMediaStream(constraints) {
  try {
    mediaStream =  await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById('cam');    
    video.srcObject = mediaStream;
    video.onloadedmetadata = (event) => {
      video.play();
    };
  } catch (err)  {    
    console.error(err.message);   
  }
};

async function switchCamera(cameraMode) {  
  try {
    // stop the current video stream
    if (mediaStream != null && mediaStream.active) {
      var tracks = mediaStream.getVideoTracks();
      tracks.forEach(track => {
        track.stop();
      })      
    }
    
    // set the video source to null
    document.getElementById('cam').srcObject = null;
    
    // change "facingMode"
    //constraints.video.facingMode = cameraMode;
     videoConstraints.facingMode = cameraMode;
    
    // get new media stream
    await getMediaStream(constraints);
  } catch (err)  {    
    console.error(err.message); 
    alert(err.message);
  }
}

function takePicture() {  
  let canvas = document.getElementById('canvas');
  let video = document.getElementById('cam');
  let photo = document.getElementById('photo');  
  let context = canvas.getContext('2d');
  
  const height = video.videoHeight;
  const width = video.videoWidth;
  
  if (width && height) {    
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);    
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    
  } else {
    clearPhoto();
  }
}

function clearPhoto() {
  let canvas = document.getElementById('canvas');
  let photo = document.getElementById('photo');
  let context = canvas.getContext('2d');
  
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

document.getElementById('switchFrontBtn').onclick = (event) => {
  switchCamera("user");
}

document.getElementById('switchBackBtn').onclick = (event) => {  
  switchCamera("environment");
  //navigator.mediaDevices
            //.getUserMedia(constraints)
            //.then(stream => stream.getTracks().forEach(track => track.stop()))
            //.then(() => this.setState(prevState => ({ isFacingMode: !prevState.isFacingMode })));
    };

document.getElementById('snapBtn').onclick = (event) => {  
  takePicture();
  event.preventDefault();
}
clearPhoto();  //new after


document.getElementById('shotBtn').onclick = (event) => {  
  takeScreenshot();
  event.preventDefault();
}

function takeScreenshot() {  
  let canvas2 = document.getElementById('canvas2');
  let video2 = document.getElementById('graph-wrapper');
  let photo2 = document.getElementById('graph-wrapper2');  
  let context = canvas2.getContext('2d');
    
    context.drawImage(video2, 0, 0);// width, height);    
    var data2 = canvas2.toDataURL('image/png');
    photo2.setAttribute('src', data2);

}        