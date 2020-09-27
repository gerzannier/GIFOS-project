
//--CREA TARJETAS CONTENEDORAS DEL GIF, LOS ICONOS Y LOS TEXTOS---//

function crearGifCards(gifSource,storageInfo,storageKeyId,tituloGif,userNameGif,contendorTarjetas){
{
            
            let tarjetaSearchGif = document.createElement('div');
            tarjetaSearchGif.setAttribute('class','tarjetaSearchGif');
                //--funcion de mouseover para las tarjetas--//
                tarjetaSearchGif.addEventListener('mouseover',cambiaClase);
                tarjetaSearchGif.addEventListener('mouseout', vuelveClase);
                function cambiaClase(){
                    tarjetaSearchGif.className= 'tarjetaMouseOver';
                };
                function vuelveClase(){
                    tarjetaSearchGif.className= 'tarjetaSearchGif';
                };
                //--//

            let iconContainer = document.createElement('div');
            iconContainer.setAttribute('class','iconContainer')

            let gif = document.createElement('img');
           gif.setAttribute('src', gifSource);
           gif.setAttribute('class','searchGif');
           gif.addEventListener('click',()=>{
            if(screen.width < 750){
            AbrirGifMobile(gifSource,favBtn,downBtn,textContainer);
            }
           });

           let favBtn = document.createElement('img');
           favBtn.setAttribute('class','favBtn')
           let objetoStorage=storageInfo;
           let keyStorage = storageKeyId;
           if(localStorage.getItem(keyStorage) === null){ //checkear si existe en local storage para asignar el corazon pintado o no
            favBtn.setAttribute('src','/images/assets/icon-fav-hover.svg');
           }else{
            favBtn.setAttribute('src','/images/assets/icon-fav-active.svg')
           }
           favBtn.addEventListener('click',()=>{
               if(localStorage.getItem(keyStorage) === null){
                   localStorage.setItem(keyStorage, JSON.stringify(objetoStorage));
                   favBtn.setAttribute('src','/images/assets/icon-fav-active.svg');
               }else{
                favBtn.setAttribute('src','/images/assets/icon-fav-hover.svg');
                localStorage.removeItem(keyStorage);     
                 }
           });

           let downBtn = document.createElement('img');
           downBtn.setAttribute('src','/images/assets/icon-download.svg');
           downBtn.setAttribute('class','downBtn')
           downBtn.addEventListener('click',()=>{
            descargarGif(gif.src);
           })

           let expandBtn = document.createElement('img');
           expandBtn.setAttribute('src','/images/assets/icon-max.svg');
           expandBtn.setAttribute('class','expandBtn');
           expandBtn.addEventListener('click',()=>{
            AbrirGifMobile(gifSource,favBtn,downBtn,textContainer);
           });
        
           let textContainer = document.createElement('div');
           textContainer.setAttribute('class','textContainer');
           let gifTitle = document.createElement('h6');
           gifTitle.setAttribute('class','gifTitle');
           gifTitle.textContent = tituloGif;
           let gifUser = document.createElement('h6');
           gifUser.setAttribute('class','gifUser');
           gifUser.textContent = userNameGif;


           contendorTarjetas.appendChild(tarjetaSearchGif);
           tarjetaSearchGif.appendChild(gif);
           tarjetaSearchGif.appendChild(iconContainer);
           tarjetaSearchGif.appendChild(textContainer);
           iconContainer.appendChild(favBtn);
           iconContainer.appendChild(downBtn);
           iconContainer.appendChild(expandBtn);
           textContainer.appendChild(gifUser);
           textContainer.appendChild(gifTitle);
           
        };
}
