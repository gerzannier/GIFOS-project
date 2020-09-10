const urlTrend = 'https://api.giphy.com/v1/gifs/trending';
const urlSearch = 'https://api.giphy.com/v1/gifs/search';
const apiKey = 'RiYU8vvam7ixep09Qr1cm1tnTiklmuSm';

//TRAER TRENDING GIF AL HOME//

function trendingGif() {
    let gifCtn = document.getElementById('trendGifContainer');
    let trendQuantity = 10;
    async function trending() {
        let url = `${urlTrend}?api_key=${apiKey}&limit=${trendQuantity}`;
        const respuesta = await fetch(url);
        const resp = await respuesta.json();
        console.log(resp);
        return resp;
    };
    let resp = trending()
    resp.then(response => {
        for(i=0;i<response.data.length;i++){
             let gif = document.createElement('img');
            gif.setAttribute('src', response.data[i].images.downsized_large.url);
            gif.setAttribute('class','trendGif')
            gifCtn.appendChild(gif);
        };

    })
}

trendingGif()

//------BOTONES PARA SCROLL TRENDING GIF-------//

let slideButton = document.getElementById('slideBtn');
slideButton.onclick = function () {
    let trendContainer = document.getElementById('trendGifBox');
    sideScroll(trendContainer,'right',25,300,10);
};

let backButton = document.getElementById('slideBackBtn');
backButton.onclick = function () {
    let trendContainer = document.getElementById('trendGifBox');
    sideScroll(trendContainer,'left',25,300,10);
};

function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

//----------BUCAR GIF------------//

let userInputBusqueda = document.getElementById('inputBusqueda');
let searchBtn = document.getElementById('imagenLupa');
let searchResults = document.getElementById('searchResults');
searchBtn.addEventListener('click',buscarGif)

function buscarGif(){
    let userInput = userInputBusqueda.value;

    async function search() {
        let url = `${urlSearch}?api_key=${apiKey}&q=${userInput}&limit=${12}&offset=${0}`;
        const respuesta = await fetch(url);
        const resp = await respuesta.json();
        console.log(resp);
        return resp;
    };

    let resp = search()
    resp.then(response => {
        console.log(response)
        searchResults.innerHTML='';
        //Inserta titulo de busqueda//
        let searchWord= document.createElement('h1');
        searchWord.textContent= userInput;
        searchResults.appendChild(searchWord);

        //Crea grilla de Gifs//
        let searchGifGrid= document.createElement('div');
        searchGifGrid.setAttribute('id','searchGifGrid')
        searchResults.appendChild(searchGifGrid);

        //crea tarjetas gif//
        for(i=0;i<response.data.length;i++){
            
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
                //--////

            let iconContainer = document.createElement('div');
            iconContainer.setAttribute('class','iconContainer')

            let gif = document.createElement('img');
           gif.setAttribute('src', response.data[i].images.downsized_large.url);
           gif.setAttribute('class','searchGif')

           let favBtn = document.createElement('img');
           favBtn.setAttribute('src','/images/assets/icon-fav-hover.svg');
           favBtn.setAttribute('class','favBtn')

           let downBtn = document.createElement('img');
           downBtn.setAttribute('src','/images/assets/icon-download.svg');
           downBtn.setAttribute('class','downBtn')

           let expandBtn = document.createElement('img');
           expandBtn.setAttribute('src','/images/assets/icon-max.svg');
           expandBtn.setAttribute('class','expandBtn')


           searchGifGrid.appendChild(tarjetaSearchGif);
           tarjetaSearchGif.appendChild(gif);
           tarjetaSearchGif.appendChild(iconContainer);
           iconContainer.appendChild(favBtn);
           iconContainer.appendChild(downBtn);
           iconContainer.appendChild(expandBtn);
           
       };
        });
}




