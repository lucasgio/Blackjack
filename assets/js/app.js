/* 
Transiciones de las cartas
Estan seteadas con un intervalo en un loop infinito secuencial
*/

setInterval(function(){
    $('.cards-left').toggleClass('magictime vanishOut');
}, 5000 );

setInterval(function(){
    $('.cards-king').toggleClass('magictime bombLeftOut');
}, 6000 ); 

setInterval(function(){
    $('.cards-king-heart').toggleClass('magictime bombRightOut');
}, 7000 );

setInterval(function(){
    $('.cards-right').toggleClass('magictime vanishIn');
}, 8000 );

setInterval(function(){
    $('.cards-10-dot').toggleClass('magictime spaceOutLeft');
}, 3000 );

setInterval(function(){
    $('.cards-10-heart').toggleClass('magictime spaceOutRight');
}, 3000 );


/* 
Referencia del HTML
*/
const btnPedir = document.querySelector('#btnGiveMeCart');
const btnNewJuego = document.querySelector('#btnNewGame');
const btnStop = document.querySelector('#btnStop');
const firstsmall = document.querySelector('.ptsplayer');
const secondsmall = document.querySelector('.ptspc');
const cartaplayerHtml = document.querySelector('#deckjugador');
const cartapcHtml = document.querySelector('#deckpc');
/* 
Deck Funcionabilidad
*/

let tipos = ['C', 'D', 'H', 'S'];
const cartasespeciales = ['A', 'Q', 'J', 'K'];
let deck = [];
let puntosjugador = 0,
    puntospc = 0;
let balckjack = 0;


//  Funcion que crea deck con las cartas barajeadas
const barajearDeck = () => {

    // Creamos el primer deck con las cartas de numeros
    for (let i = 2; i <= 10; i++) {
        for (tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    // Creamos el segundo deck con las cartas de letras
    for (esp of cartasespeciales) {
        for (tipo of tipos) {
            deck.push(esp + tipo);
        }
    }
    // Barajeamos el array de las cartas
    deck = _.shuffle(deck);
    return deck;
}
barajearDeck();

//  Funcion para pedir carta
const pedircarta = () => {
    if (deck.length === 0) {
        throw " No hay carta en el deck";
    }
    const carta = deck.pop();
    // console.log({ carta });
    return carta;
};



//  Funcion para ver el valor de la carta pedida
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1); 
    return  (isNaN(valor))?
            (valor === 'A')? 11 : 10
        :    valor * 1;    
};

valorCarta(pedircarta());

//  Turno de PC
const turnoPC = ( puntosminimos ) => {

    do {
        const tomarcarta = pedircarta();
        puntospc = puntospc + valorCarta(tomarcarta);
        // console.log(puntospc);
        secondsmall.innerHTML = puntospc;
        //  insertamos la carta en el html
        const newcard = document.createElement('img');
        newcard.classList.add('cartas');
        newcard.src = `./assets/img/cartas/${ tomarcarta }.png`;
        cartapcHtml.append(newcard); 

        setTimeout( () => {

            if( puntospc === 21 && puntospc > puntosminimos || puntosminimos > 21 ){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Has perdido ,la casa ha mejorado tu puntuacion',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Has ganado ,la casa no pudo mejorar tu puntuacion ',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }


        },2000)


    } while ( (puntospc < puntosminimos) && (puntosminimos <= 21));
}









// Eventos

btnPedir.addEventListener('click', () => { 
    const tomarcarta = pedircarta();
    puntosjugador = puntosjugador + valorCarta(tomarcarta);
    firstsmall.innerHTML = puntosjugador;
    //  insertamos la carta en el html
    const newcard = document.createElement('img');
    newcard.classList.add('cartas');
    newcard.src = `./assets/img/cartas/${ tomarcarta }.png`;
    cartaplayerHtml.append(newcard);
    if ( puntosjugador > 21) {
        btnPedir.disabled = true;
        btnStop.disabled = true;
        turnoPC( puntosjugador );
    }else if( puntosjugador === 21){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Has sacado 21,turno de la casa !!!',
            showConfirmButton: false,
            timer: 3000
          })
          turnoPC( puntosjugador );  
    }
 });


btnNewJuego.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro de iniciar nuevo juego?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,quiero iniciar nuevo juego!',
        showClass: {
            popup: 'animate__animated animate__fadeInRightBig'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
      }).then((result) => {
        window.location.reload();
      })
}); 


btnStop.addEventListener('click',() => { 

    btnPedir.disabled = true;
    btnStop.disabled = true;
    turnoPC(puntosjugador);

 });


