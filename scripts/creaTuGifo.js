
 function activarCamara() {
  async function getStreamAndRecord () { 
    stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        width: { ideal: 480 },
        height: { ideal: 320 }
        }
    });
    return stream;
};
let stream = getStreamAndRecord ();
 stream.then(response => {
     video=document.getElementById('video');
    video.srcObject = stream;
    video.play()
 });
 };

 let crearGifoBtn = document.getElementById('crearGifoBtn');
 crearGifoBtn.addEventListener('click',activarCamara);

