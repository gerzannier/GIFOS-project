const urlTrend = 'https://api.giphy.com/v1/gifs/trending';
const urlSearch = 'https://api.giphy.com/v1/gifs/search';
const urlSuggestions = 'https://api.giphy.com/v1/gifs/search/tags';

const apiKey = 'RiYU8vvam7ixep09Qr1cm1tnTiklmuSm';

//TRAER TRENDING GIF AL HOME//

function trendingGif() {
    let trendGifContainer = document.getElementById('trendGifContainer');
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
            trendGifContainer.appendChild(gif);
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

searchBtn.addEventListener('click',nuevaBusqueda);

function nuevaBusqueda(){
    searchResults.innerHTML="";
    offsetValue=12 //este valor se usa para el boton ver mas
    verMasBtn.style.display='block'
    buscarGif(12,0);
}

function buscarGif(limit,offset){
    let userInput = userInputBusqueda.value;

    async function search() {
        let url = `${urlSearch}?api_key=${apiKey}&q=${userInput}&limit=${limit}&offset=${offset}`;
        const respuesta = await fetch(url);
        const resp = await respuesta.json();
        console.log(resp);
        return resp;
    };

    let resp = search()
    resp.then(response => {
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
                //--//

            let iconContainer = document.createElement('div');
            iconContainer.setAttribute('class','iconContainer')

            let gif = document.createElement('img');
           gif.setAttribute('src', response.data[i].images.downsized_large.url);
           gif.setAttribute('class','searchGif')

           let favBtn = document.createElement('img');
           favBtn.setAttribute('src','/images/assets/icon-fav-hover.svg');
           favBtn.setAttribute('class','favBtn')
           let objetoStorage=response.data[i];
           let keyStorage = response.data[i].id;
           favBtn.addEventListener('click',()=>{
            localStorage.setItem(keyStorage, JSON.stringify(objetoStorage));
           })

           let downBtn = document.createElement('img');
           downBtn.setAttribute('src','/images/assets/icon-download.svg');
           downBtn.setAttribute('class','downBtn')

           let expandBtn = document.createElement('img');
           expandBtn.setAttribute('src','/images/assets/icon-max.svg');
           expandBtn.setAttribute('class','expandBtn')
        
           let textContainer = document.createElement('div');
           textContainer.setAttribute('class','textContainer');
           let gifTitle = document.createElement('h6');
           gifTitle.setAttribute('class','gifTitle');
           gifTitle.textContent = response.data[i].title;
           let gifUser = document.createElement('h6');
           gifUser.setAttribute('class','gifUser');
           gifUser.textContent = response.data[i].username;


           searchGifGrid.appendChild(tarjetaSearchGif);
           tarjetaSearchGif.appendChild(gif);
           tarjetaSearchGif.appendChild(iconContainer);
           tarjetaSearchGif.appendChild(textContainer);
           iconContainer.appendChild(favBtn);
           iconContainer.appendChild(downBtn);
           iconContainer.appendChild(expandBtn);
           textContainer.appendChild(gifUser);
           textContainer.appendChild(gifTitle);
           
       };
        });
}

//--boton ver mas --//

let verMasBtn = document.getElementById('verMasSearches');
verMasBtn.addEventListener('click',verMas);

let offsetValue=12;
function verMas(){
        buscarGif(12,offsetValue);
        offsetValue =12+offsetValue;
        console.log(offsetValue)
}



///SEARCH SUGGESTIONS///

let busquedaSection = document.getElementById('busqueda');
function suggestions() {

    let searchTerm = userInputBusqueda.value;
    async function suggestedGif() {
        let url = `${urlSuggestions}?api_key=${apiKey}&q=${searchTerm}`;
        const respuesta = await fetch(url);
        const resp = await respuesta.json();
        return resp;
    };
    let resp = suggestedGif()
    resp.then(response => {
        if(document.getElementById('suggestionList')!==null){
            let borrarDeLista=document.getElementById('suggestionList')
            borrarDeLista.remove();
        }

        let suggestionList = document.createElement('ul');
        suggestionList.setAttribute('id','suggestionList');
        suggestionList.setAttribute('class','suggestionList');
        busquedaSection.appendChild(suggestionList);
        

        for(i=0;i<response.data.length;i++){
            
            let suggestionWord = document.createElement('li');
            suggestionWord.textContent = response.data[i].name;
            suggestionWord.setAttribute('class','suggestionWord');
            suggestionWord.addEventListener('click',()=>{
                userInputBusqueda.value = suggestionWord.textContent;
                suggestionList.style.display='none';
                })
            suggestionList.appendChild(suggestionWord);
            

            let LupaImg = document.createElement('img');
            LupaImg.setAttribute('src','/images/assets/icon-search.svg');
            suggestionWord.appendChild(LupaImg);

        }
        

    })
}
userInputBusqueda.addEventListener('keyup',suggestions);

//-----------//