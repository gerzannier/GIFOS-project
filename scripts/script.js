//API Giphy Endpoints//

const urlTrend = 'https://api.giphy.com/v1/gifs/trending';
const urlSearch = 'https://api.giphy.com/v1/gifs/search';
const urlSuggestions = 'https://api.giphy.com/v1/gifs/search/tags';
const urlGifsById ='https://api.giphy.com/v1/gifs';
const urlTrendTerms = 'https://api.giphy.com/v1/trending/searches';
const apiKey = 'RiYU8vvam7ixep09Qr1cm1tnTiklmuSm';

 
//CLICK A HOME//
let seccionTrending = document.getElementById('seccion2-trending');
let homeLogo=document.getElementById('logo');
homeLogo.addEventListener('click',()=>{
    seccion1Busquedas.style.display='flex';
    seccionFavoritos.style.display='none';
    seccion4CreaGifo.style.display='none';
    seccionTrending.style.display='flex';
    seccionMisGifos.style.display='none';
})


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
                response.data[i].id, //el id del objeto para el localstorage
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
};

//---TRAER TRENDING TERMS ---///

async function trendingTerm() {
    let url = `${urlTrendTerms}?api_key=${apiKey}`;
    const respuesta = await fetch(url);
    const resp = await respuesta.json();
    console.log(resp);
    return resp;
};
let resp = trendingTerm()
resp.then(response => {
    let listaTrendTerms = document.getElementById('listaTrendTerms');
    for(let i=0;i<5;i++){
        let trendTerm = document.createElement('li');
        trendTerm.textContent = response.data[i];
        trendTerm.setAttribute('class','trendWord');
        trendTerm.addEventListener('click',()=>{
            userInputBusqueda.value = trendTerm.textContent;
            nuevaBusqueda()
            cruzBorrar()
            })
        listaTrendTerms.appendChild(trendTerm);
    }
 });

//----------BUCAR GIF------------//

let userInputBusqueda = document.getElementById('inputBusqueda');
let searchBtn = document.getElementById('imagenLupa');
let searchResults = document.getElementById('searchResults');

//--lupa cambia a cruz y permite eliminar contenido--//
userInputBusqueda.addEventListener('input',cruzBorrar);
function cruzBorrar(){
    searchBtn.setAttribute('src','/images/assets/close.svg');
    searchBtn.style.height = '14px';
    searchBtn.style.width = '14px';
};
searchBtn.addEventListener('click',()=>{
    userInputBusqueda.value="";
    searchBtn.setAttribute('src','/images/assets/icon-search.svg');
    searchBtn.style.height = '24px';
    searchBtn.style.width = '24px';
});
//--//

//enter para inicar busqueda//
userInputBusqueda.addEventListener('keyup',function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
     nuevaBusqueda();
    }
  });
  //--//

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

        if(response.data.length==0){
            let ouchImg = document.createElement('img');
            ouchImg.setAttribute('src','/images/assets/icon-busqueda-sin-resultado.svg');
            ouchImg.setAttribute('id','ouchImg');
            let noResultText = document.createElement('h5');
            noResultText.setAttribute('id','noResultText');
            noResultText.textContent = 'Intenta con otra búsqueda.';
            searchResults.appendChild(ouchImg);
            searchResults.appendChild(noResultText);
            verMasBtn.style.display='none';
            return
        }

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
                nuevaBusqueda()
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


//--ABRIR GIF MOBILE O EXPAND DESKTOP--//
var xh = screen.height;
console.log(xh);
var xw = screen.width;
console.log(xw);

function AbrirGifMobile(gifUrl,iconoFav,iconoDown,textos){//trae directamente los iconos y textos creados en gifCard.js
    console.log('clickeaste en el gif');
    let screen = document.getElementsByTagName('body')[0];

    let contenedorOpenGif = document.createElement('div');
    contenedorOpenGif.setAttribute('id','contenedorOpenGif');
    if(xw > 750){
        contenedorOpenGif.style.height= xh +200 +'px';//se agrega px para asegurar que el contenedor cubra toda la pantalla
        }else{
    contenedorOpenGif.style.height= xh +'px';
        };

    let cruzClose = document.createElement('img');
    cruzClose.setAttribute('src','/images/assets/button-close.svg');
    cruzClose.setAttribute('id','cruzClose');
    cruzClose.addEventListener('click',()=>{
        contenedorOpenGif.remove();
    })

    let openedGif = document.createElement('img');
    openedGif.setAttribute('src',gifUrl);
    openedGif.setAttribute('id','openedGif');
    
    let iconsAndText = document.createElement('div');
    iconsAndText.setAttribute('id','iconsAndText');

    screen.appendChild(contenedorOpenGif);
    contenedorOpenGif.appendChild(cruzClose);
    contenedorOpenGif.appendChild(openedGif);
    contenedorOpenGif.appendChild(iconsAndText);
    iconsAndText.appendChild(textos);
    iconsAndText.appendChild(iconoFav);
    iconsAndText.appendChild(iconoDown);
};


//---MOSTRAR Y CARGAR FAVORITOS----//


let seccion1Busquedas=document.getElementById('seccion1');
let seccionFavoritos=document.getElementById('seccion-favoritos')
let seccionMisGifos=document.getElementById('seccion-misGifos');
let favMenu = document.getElementById('favMenu');
favMenu.addEventListener('click',()=>{
    seccion1Busquedas.style.display='none';
    seccionFavoritos.style.display='flex';
    seccion4CreaGifo.style.display='none';
    seccionMisGifos.style.display='none';
    seccionTrending.style.display='flex';
    favGifToDisplay = 12;
    crearFavoritos();
});

var favGifToDisplay = 12 //it starts showing max 12 gifs
var favoritosKey = "favoritos";
var favoritosIdArray = JSON.parse(localStorage.getItem(favoritosKey)); //el array con los ID defavoritos ya almacenados

function crearFavoritos(){
favoritosIdArray = JSON.parse(localStorage.getItem(favoritosKey)); 
let favoriteGifGrid= document.getElementById('favoriteGifGrid');
favoriteGifGrid.innerHTML="";
//eliminar texto de sin favoritos cuando corresponde//
let noFavImg = document.getElementById('noFavImg');
let noFavText = document.getElementById('h1Guarda');
if(favoritosIdArray!=null){
    noFavImg.style.display="none";
    noFavText.style.display="none";
}else{
    noFavImg.style.display="flex";
    noFavText.style.display="flex";
}
///traer favoritos con un fetch usando el id//
    async function getFavoritos() {
        let url = `${urlGifsById}?api_key=${apiKey}&ids=${favoritosIdArray}`;
        const respuesta = await fetch(url);
        const resp = await respuesta.json();
        return resp;
    };
    let resp = getFavoritos()
    resp.then(response => {
        for(i=0;i<favGifToDisplay;i++){
            crearGifCards(
                response.data[i].images.downsized_large.url,//el gif
                favoritosIdArray, //el objeto para el local storage
                response.data[i].id, //el id del objeto para el localstorage key
                response.data[i].title, //titulo
                response.data[i].username, //username
                favoriteGifGrid //a donde se append la tarjeta creada
                );
        };
        if(response.data.length>12){           
            verMasFab.style.display = 'block';
        }
    })
};
let verMasFab = document.getElementById('verMasFav');
verMasFab.addEventListener('click',()=>{
    favGifToDisplay = favGifToDisplay +12;
    crearFavoritos();
}) 

//--CREAR TU PROPIO GIF --//

let seccion4CreaGifo = document.getElementById('seccion4-creaGifo');
let botonMas = document.getElementById('masBtn');
let botonMasImg = document.getElementById('masBtnImg');
//hover boton crear gif en header
botonMasImg.addEventListener('mouseover',()=>{
    if(backColor=='#FFFFFF'){
    botonMasImg.src ='/images/assets/CTA-crear-gifo-hover.svg';
    }else{
    botonMasImg.src ='/images/assets/CTA-crear-gifo-hover-modo-noc.svg';
    }
});
botonMasImg.addEventListener('mouseout',()=>{
    if(backColor=='#FFFFFF'){
    botonMasImg.src ='/images/assets/button-crear-gifo.svg';
    }else{
    botonMasImg.src ='/images/assets/CTA-crear-gifo-modo-noc.svg';
    }
});
//--//

botonMas.addEventListener('click',()=>{
    seccion1Busquedas.style.display='none';
    seccionFavoritos.style.display='none';
    seccion4CreaGifo.style.display='flex';
    seccionTrending.style.display='none';
    seccionMisGifos.style.display='none';
});


//--SECCION MIS GIFOS --//

let misGifMenu = document.getElementById('misGifMenu');
misGifMenu.addEventListener('click',()=>{
    seccion1Busquedas.style.display='none';
    seccionFavoritos.style.display='none';
    seccion4CreaGifo.style.display='none';
    seccionMisGifos.style.display='flex';
    seccionTrending.style.display='flex';
    displayMisGifos();
});

var misGifosKey = "misGifos";
var misGifosArray = JSON.parse(localStorage.getItem(misGifosKey));

function displayMisGifos(){
    let misGifGrid= document.getElementById('misGifGrid');
    misGifGrid.innerHTML="";
    misGifosArray = JSON.parse(localStorage.getItem(misGifosKey));
    
    //eliminar texto de sin gifos cuando corresponde//
    let noMisGifosImg = document.getElementById('noMisGifosImg');
    let noGifText = document.getElementById('h1Animate');
    if(misGifosArray!=null){
        noMisGifosImg.style.display="none";
        noGifText.style.display="none";
    }else{
        noMisGifosImg.style.display="flex";
        noGifText.style.display="flex";
    };
    ///traer mis gifos con un fetch usando  el id//
        async function getMisGifos() {
            let url = `${urlGifsById}?api_key=${apiKey}&ids=${misGifosArray}`;
            const respuesta = await fetch(url);
            const resp = await respuesta.json();
            return resp;
        };
        let resp = getMisGifos()
        resp.then(response => {
            for(i=0;i<response.data.length;i++){
                crearGifCards(
                    response.data[i].images.downsized_large.url,//el gif
                    misGifosArray, //el objeto para el local storage
                    response.data[i].id, //el id del objeto para el localstorage key
                    response.data[i].title, //titulo
                    response.data[i].username, //username
                    misGifGrid //a donde se append la tarjeta creada
                    );
            };
        })
    } 