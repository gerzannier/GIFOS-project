let boton1=document.getElementById('boton1');
let boton2=document.getElementById('boton2');
let boton3=document.getElementById('boton3');

let textosGrabar=document.getElementById('textosGrabar');
let textosGrabarH1=document.getElementById('textoGrabarH1');
let textosGrabarH5=document.getElementById('textoGrabarH5');

let grabarBtn = document.getElementById('grabarBtn');
let finalizarBtn = document.getElementById('finalizarBtn');
let subirGifBtn = document.getElementById('subirGifBtn');
let comenzarBtn = document.getElementById('comenzarBtn');
comenzarBtn.addEventListener('click', activarCamara);

let returnData ="";

//Solicitar permiso para activar camara y mostrar en pantalla
function activarCamara() {
    comenzarBtn.style.display='none';
    textosGrabarH1.textContent='¿Nos das acceso a tu cámara?';
    textosGrabarH5.textContent='El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
    boton1.style.backgroundColor='#572EE5';
    boton1.style.color='#FFFFFF ';
    async function getStreamAndRecord() {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: { ideal: 480 },
                height: { ideal: 320 }
            }
        });
        return stream;
    };
    let stream = getStreamAndRecord();
    stream.then(response => {
        grabarBtn.style.display='block';
        boton1.style.backgroundColor='#FFFFFF';
        boton1.style.color='#572EE5';
        boton2.style.backgroundColor='#572EE5';
        boton2.style.color='#FFFFFF';

        textosGrabar.style.display='none';
        video = document.getElementById('video');
        video.style.display='block';
        video.srcObject = stream;
        video.play();
        grabando(stream);
    });
};

//Iniciar grabacion//
function grabando(stream){
    let recorder = new RecordRTC(stream,{
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,  
      });
    grabarBtn.addEventListener('click',()=>{
        video.play();
        recorder.startRecording();
        console.log(recorder.state);
        grabarBtn.style.display='none';
        finalizarBtn.style.display='block';
        return
    });
    //finalizar grabacion//
    finalizarBtn.addEventListener('click',()=>{
        video.pause();
        recorder.stopRecording();
        console.log(recorder.state);
        finalizarBtn.style.display='none';
        subirGifBtn.style.display='block';
        return
    });
    
    //subir gif//
    subirGifBtn.addEventListener('click',()=>{

        let uploadImg = document.getElementById('uploadImg');
        let textoSubiendo= document.getElementById('textoSubiendo');
        let chronometerDisplay=document.getElementById('reloj');
        uploadImg.style.display = 'block';
        textoSubiendo.style.display = 'block';
        chronometerDisplay.style.display = 'none';

        subirGifBtn.style.display='none';
        boton2.style.backgroundColor='#FFFFFF';
        boton2.style.color='#572EE5';
        boton3.style.backgroundColor='#572EE5';
        boton3.style.color='#FFFFFF';
        let videoContainer=document.getElementById('contenido');
        videoContainer.style.backgroundColor='#572EE5';
        videoContainer.style.width=video.clientWidth + 'px';
        video.style.opacity = '0.6';

        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file')); //para chequear que el objeto FormData se creó correctamente

        fetch("https://upload.giphy.com/v1/gifs?api_key="+ apiKey, {
                method: "POST",
                body: form
        })
        .then(
        response =>{
        dato = response.json();
        console.log(dato); 
        uploadImg.src='/images/assets/ok.svg';
        textoSubiendo.textContent = "GIFO subido con éxito";
        iconosUploadedGif = document.getElementById('iconosUploadedGif');
        iconosUploadedGif.style.display='flex';
        });             
    
    })

};

let misGifosArray = ["WfTAfkU6b3RezYlsxf","V5NroZm9d0YVQ5SMWk","TSpz0mtAtWLAHh3A95"];

/*
function grabando(stream){
    let grabarBtn = document.getElementById('grabarBtn');
    let finalizarBtn = document.getElementById('finalizarBtn');
    
    let recorder = new MediaRecorder(stream,{
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,  
      });
    let chunks = [];
    
    grabarBtn.addEventListener('click',(ev)=>{
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    })
    finalizarBtn.addEventListener('click',(ev)=>{
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    });
    
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    };
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks,{'type':'gif'});
        console.log(blob);
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        console.log(videoURL);
        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
        fetch("https://upload.giphy.com/v1/gifs?api_key="+ apiKey, {
                method: "POST",
                body: form
        })
        .then(
        response =>{
        let data = response.json();
        console.log(data);
        }
        )       
    }

};*/