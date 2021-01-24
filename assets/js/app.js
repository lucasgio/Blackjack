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

const miApp = (()=>{

    'use strict'

        /* 
    Referencia del HTML
    */
    const btnPedir = document.querySelector('#btnGiveMeCart'),
          btnNewJuego = document.querySelector('#btnNewGame'),
          btnStop = document.querySelector('#btnStop'),
          firstsmall = document.querySelector('.ptsplayer'),
          secondsmall = document.querySelector('.ptspc'),
          cartaplayerHtml = document.querySelector('#deckjugador'),
          cartapcHtml = document.querySelector('#deckpc'),
          btnLimpiarDeck = document.querySelector('#btnLimpiarDeck');
    /* 
     Funcion para cambiar propiedades de los botones (false) 
    */

    
    
    const propbotones = ( state = 1)=>{
        if( state === 1 ){
            btnPedir.disabled = true;
            btnStop.disabled = true; 
             
        }else{
            btnPedir.disabled = false;
            btnStop.disabled = false;     
        }
     }
     propbotones();

    /* 
    Global variable
    */
    let tipos = ['C', 'D', 'H', 'S'];
    const cartasespeciales = ['A', 'Q', 'J', 'K'];
    let deck = [];
    let puntosJugadores = [];
    let puntospc;

      

    const iniciarDeck = ( numJugadores = 2) => {
        barajearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

    //  Funcion que crea deck con las cartas barajeadas
    const barajearDeck = () => {
        // Creamos el primer deck con las cartas de numeros
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        // Creamos el segundo deck con las cartas de letras
        for (let esp of cartasespeciales) {
            for (let tipo of tipos) {
                deck.push(esp + tipo);
            }
        }
        
        return  deck = _.shuffle(deck);
    }
    

    //  Funcion para pedir carta
    const pedircarta = () => {
        if (deck.length === 0) {
            throw " No hay carta en el deck";
        }
        return deck.pop();
    };



    //  Funcion para ver el valor de la carta pedida
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1); 
        return  (isNaN(valor))?
                (valor === 'A')? 11 : 10
            :    valor * 1;    
    };


    //  Turno de PC
    const turnoPC = ( puntosminimos ) => {
        do {
            const tomarcarta = pedircarta();
            puntospc = acumularPuntos(tomarcarta,puntosJugadores.length - 1);
            secondsmall.innerHTML = puntospc;
            const newcard = document.createElement('img');
            newcard.classList.add('cartas');
            newcard.src = `./assets/img/cartas/${ tomarcarta }.png`;
            cartapcHtml.append(newcard); 
            saberGanador();
        } while ( puntospc <= 21 && puntospc <= puntosminimos );
         
    }


    const acumularPuntos = (tomarcarta,turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(tomarcarta);
        console.log(puntosJugadores[0],puntosJugadores[1]);
        return puntosJugadores[turno];
    }



    const saberGanador  = () => {
        setTimeout( ()=> {
            if ( puntospc === puntosJugadores[0]  ) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: ' Hay un empate, suerte para la proxima ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }else if( puntospc > 21 && puntosJugadores[0] < 21 && puntosJugadores[0] < puntospc || puntosJugadores[0] === 21){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: ' Felicitaciones has ganado, tu puntuacion fue mejor ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }else if( puntospc < 21 && puntosJugadores[0] > 21){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: ' Ha ganado la casa, lo siento ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }else if( (puntospc === 21 || puntospc > puntosJugadores[0] || puntosJugadores[0] > 21)){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: ' Ha ganado la casa, lo siento ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }else if(puntosJugadores[0] > puntospc && puntosJugadores[0] <= 21  ){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: ' Felicitaciones has ganado, tu puntuacion fue mejor ',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            btnNewJuego.disabled = true;  
        },2000)
    }



    // Eventos
    btnPedir.addEventListener('click', () => { 
        const tomarcarta = pedircarta(),
              puntosJugadores = acumularPuntos(tomarcarta,0);
        firstsmall.innerHTML = puntosJugadores;
        //  insertamos la carta en el html
        const newcard = document.createElement('img');
        newcard.classList.add('cartas');
        newcard.src = `./assets/img/cartas/${ tomarcarta }.png`;
        cartaplayerHtml.append(newcard);
        saberMayor21();
    });

    btnLimpiarDeck.addEventListener('click',() => {
        window.location.reload();
    });

    const saberMayor21 = () => {
        if ( puntosJugadores > 21) {
            propbotones();
            turnoPC( puntosJugadores );
        }else if( puntosJugadores === 21){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Has sacado 21,turno de la casa !!!',
                showConfirmButton: false,
                timer: 3000
            })
            turnoPC( puntosJugadores );  
        }
    };

    btnNewJuego.addEventListener('click', () => {
        
        propbotones(0)
        iniciarDeck();
    }); 


    btnStop.addEventListener('click',() => { 
        propbotones();
        turnoPC(puntosJugadores[0]);
    });
    

    return {
        iniciajuego : iniciarDeck
    };

})();
