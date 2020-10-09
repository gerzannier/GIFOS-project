//function timer() {

    let hours = `00`;
    let    minutes = `00`;
    let    seconds = `00`;
    let    chronometerDisplay = document.getElementById('reloj');
    let    chronometerCall;
  
    function chronometer() {
  
      seconds ++
  
      if (seconds < 10) seconds = `0` + seconds
  
      if (seconds > 59) {
        seconds = `00`
        minutes ++
  
        if (minutes < 10) minutes = `0` + minutes
      }
  
      if (minutes > 59) {
        minutes = `00`
        hours ++
        
        if (hours < 10) hours = `0` + hours
      }
  
      chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
  
    }
  
    function timerStart() {
      chronometerCall = setInterval(chronometer, 1000);
      console.log(seconds)
    };
  
    function timerStop() {
      clearInterval(chronometerCall);
      console.log(seconds)
    };
  
    function timerReset()  {
      clearInterval(chronometerCall)
      chronometerDisplay.textContent = `00:00:00`
      
        hours = `00`,
        minutes = `00`,
        seconds = `00`
    };

  chronometerDisplay.addEventListener('click',()=>{
      if(chronometerDisplay.textContent =='REPETIR CAPTURA'){
          boton2.style.backgroundColor='#FFFFFF';
          boton2.style.color='#572EE5'; 
          subirGifBtn.style.display='none';  
          timerReset()
          activarCamara()
      }
});