let menuModoNocturno = document.getElementById('modoNocturno');

let backColor = '#FFFFFF';
let backColor2 = '#222326'
let textColor = '#FFFFFF';
let textColorFooter = '#000000'

//IMAGENES//
//botones slide trending
let slideBtn1Img =document.getElementById('slideBackBtnImg');
let slideBtn2Img =document.getElementById('slideBtnImg');
let botonCrearGifo1 = document.getElementById('masBtnImg');
let lupaImg1 = document.getElementById('imagenLupa');

//--//



menuModoNocturno.addEventListener('click',()=>{
    if(backColor=='#FFFFFF'){
        backColor = '#37383C';
        backColor2 = '#222326'
        textColor = '#FFFFFF';
        textColorFooter = '#FFFFFF';
        slideBtn1Img.src='/images/assets/button-slider-left-md-noct.svg';
        slideBtn2Img.src='/images/assets/button-slider-right-md-noct.svg'; 
        botonCrearGifo1.src = '/images/assets/CTA-crear-gifo-modo-noc.svg';   
        lupaImg1.src= '/images/assets/icon-search-mod-noc.svg'
    }else{
        backColor = '#FFFFFF';
        backColor2 = '#F3F5F8';
        textColor = '#572EE5';
        textColorFooter = '#000000';
        slideBtn1Img.src='/images/assets/button-slider-left.svg';
        slideBtn2Img.src='/images/assets/Button-Slider-right.svg';
        botonCrearGifo1.src =  '/images/assets/button-crear-gifo.svg';
        lupaImg1.src= '/images/assets/icon-search.svg';
    }
    //el fondo del body
    let bodie = document.body; 
    bodie.style.backgroundColor  = backColor ;
    //colores de textos dentro del body
    bodie.style.color = textColor;
    //el fondo del header
    let header = document.getElementsByTagName('header')[0]; 
    header.style.backgroundColor = backColor ;
    //el menu del header
    for(let i=0 ; i<3 ; i++){
        let menuList = document.getElementsByTagName('a')[i];
        menuList.style.color = textColor;
    };
    //la barra de busqueda
    let busquedas1 = document.getElementById('busqueda');
    busquedas1.style.borderColor = textColor;

    //fondo seccion trending
    let trendingBackGround = document.getElementById('seccion2-trending');
    trendingBackGround.style.backgroundColor = backColor2;
    //texto debajo titulo trending
    let textoEnTrending = document.getElementById('seccion2-text-mira');
    textoEnTrending.style.color = textColor;
    //footer
    let footer = document.getElementsByTagName('footer')[0];
    footer.style.backgroundColor=backColor;
    //footer texts
    let footerH3a= document.getElementById('footer-text-compartir');
    footerH3a.style.color = textColorFooter;
    let footerH3b= document.getElementById('copiright');
    footerH3b.style.color = textColorFooter;
    //titulo favoritos
    let tituloFavoritos = document.getElementById('h1Favoritos');
    tituloFavoritos.style.color = textColor;
    //titulo mis Gifos
    let tituloMisGifos = document.getElementById('h1MisGifos');
    tituloMisGifos.style.color = textColor;
    //texto crear tu propio Gif
    let textoCrearTuGif = document.getElementById('textoGrabarH1');
    textoCrearTuGif.style.color = textColor;
    let textoCrearTuGif2 = document.getElementById('textoGrabarH5');
    textoCrearTuGif2.style.color = textColorFooter;




})

