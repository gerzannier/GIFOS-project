let menuModoNocturno = document.getElementById('modoNocturno');

//COLORES 
let backColor = '#FFFFFF';//blanco a gris de fondo
let backColor2 = '#222326' //gris claro a gris oscuro
let textColor = '#572EE5'; //violeta a blanco
let textColorFooter = '#000000'; //negro a blanco
let colorBorderbody = '#572EE5'; //violeta a negro

//BOTONES
let claseBotones = 'botonesTipoVerMas';

//IMAGENES//
let slideBtn1Img =document.getElementById('slideBackBtnImg');
let slideBtn2Img =document.getElementById('slideBtnImg');
let botonCrearGifo1 = document.getElementById('masBtnImg');
let lupaImg1 = document.getElementById('imagenLupa');
let imgCinta = document.getElementById('imgCinta');



menuModoNocturno.addEventListener('click',()=>{
    if(backColor=='#FFFFFF'){
        backColor = '#37383C';
        backColor2 = '#222326'
        textColor = '#FFFFFF';
        textColorFooter = '#FFFFFF';
        colorBorderbody = '#000000';
        slideBtn1Img.src='/images/assets/button-slider-left-md-noct.svg';
        slideBtn2Img.src='/images/assets/button-slider-right-md-noct.svg'; 
        botonCrearGifo1.src = '/images/assets/CTA-crear-gifo-modo-noc.svg';   
        lupaImg1.src= '/images/assets/icon-search-mod-noc.svg';
        imgCinta.src = '/images/assets/element_cinta2-modo-noc.svg';
        claseBotones = 'botnesTipoVerMasNoctMode';
    }else{
        backColor = '#FFFFFF';
        backColor2 = '#F3F5F8';
        textColor = '#572EE5';
        textColorFooter = '#000000';
        colorBorderbody = '#572EE5';
        slideBtn1Img.src='/images/assets/button-slider-left.svg';
        slideBtn2Img.src='/images/assets/Button-Slider-right.svg';
        botonCrearGifo1.src =  '/images/assets/button-crear-gifo.svg';
        lupaImg1.src= '/images/assets/icon-search.svg';
        imgCinta.src ='/images/assets/element_cinta2.svg';
        claseBotones = 'botonesTipoVerMas';
    }
    //el fondo y bordes del body
    let bodie = document.body; 
    bodie.style.backgroundColor  = backColor ;
    bodie.style.borderBottomColor = colorBorderbody;
    bodie.style.borderTopColor = colorBorderbody;
    //colores de textos dentro del body
    bodie.style.color = textColor;
    //el fondo del header
    let header = document.getElementsByTagName('header')[0]; 
    header.style.backgroundColor = backColor ;

    //el menu del header y el fondo del menu en mobile mode
    if(xw<750){ //checkear ancho de pantalla - xw se define en script.js line 240
        let menu = document.getElementById('menu');
        menu.style.backgroundColor = colorBorderbody;
        console.log(xw);
    }else{
        for(let i=0 ; i<3 ; i++){
            let menuList = document.getElementsByTagName('a')[i];
            menuList.style.color = textColor;
        };
    }
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
    //recuadro video crea gif
    let recuadroVideo = document.getElementById('recuadroVideo');
    recuadroVideo.style.borderColor = textColor;
    //linea abajo botones en Crear gif
    let contenedorBtn = document.getElementById('contenedorBtn');
    contenedorBtn.style.borderBottomColor = textColor;
    //botones step grabacion
    for(let i=0 ; i<3 ; i++){
    let botoncitos = document.getElementsByClassName('botoncitos')[i];
    botoncitos.style.borderColor= textColor;
    botoncitos.style.color = textColor;
    };
    //Botones ver mas y parecidos
    let verMasSearches = document.getElementById('verMasSearches');
    let comenzarBtn = document.getElementById('comenzarBtn');
    let grabarBtn = document.getElementById('grabarBtn');
    let finalizarBtn = document.getElementById ('finalizarBtn');
    let subirGifBtn = document.getElementById('subirGifBtn');
    verMasSearches.setAttribute('class',claseBotones);
    comenzarBtn.setAttribute('class',claseBotones);
    grabarBtn.setAttribute('class',claseBotones);
    finalizarBtn.setAttribute('class',claseBotones);
    subirGifBtn.setAttribute('class',claseBotones);

})

