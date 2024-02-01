const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')

const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')

const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')

const socket = io();


socket.on('estado-actual', (payload) => {
    // const [ticket1,ticket2,ticket3,ticket4] = payload;

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play()

    payload.forEach( (ticket,i) => {
        document.querySelector(`#lblTicket${i+1}`).innerText = 'Ticket ' + ticket.numero
        document.querySelector(`#lblEscritorio${i+1}`).innerText = ticket.escritorio
    });

   
});