const TicketControl = require("./ticket-control");

const ticketControl = new TicketControl()


const socketController = (socket) => {
    
    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id );
    // });

    //cuando un cliente se conecta
    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('tickets-pendientes',ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente()
        callback(siguiente)
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)

    });

    socket.on('atender-ticket',({escritorio},callback) => {

        if(!escritorio){
            return callback({
                ok:false,
                msg : 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        //notificar cambio en los ultimos4
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)
        console.log(ticket)

        if(!ticket){
            callback({
                ok:false,
                msg: 'Ya no hay tickets pendiente'
            })
        }else{
            callback({
                ok:true,
                ticket
            })
        }

        //notificar los tickets pendientes
        socket.emit('tickets-pendientes',ticketControl.tickets.length)
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length)
    })

}



module.exports = {
    socketController
}

