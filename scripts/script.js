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
            crearGifCards(
                response.data[i].images.downsized_large.url,//el gif
                response.data[i], //el objeto para el local storage
                response.data[i].id, //el id del objeto para el localstorage key
                response.data[i].title, //titulo
                response.data[i].username, //username
                trendGifContainer //a donde se append la tarjeta creada
                );

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
            
            crearGifCards(
                response.data[i].images.downsized_large.url,//el gif
                response.data[i], //el objeto para el local storage
                response.data[i].id, //el id del objeto para el localstorage key
                response.data[i].title, //titulo
                response.data[i].username, //username
                searchGifGrid //a donde se append la tarjeta creada
                );
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

//--DESCARGAR GIF--//

function descargarGif (urlDescarga){
    var x=new XMLHttpRequest();
    x.open("GET",urlDescarga , true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, "descarga.gif", "image/gif" ); }
    x.send();
};