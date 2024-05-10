export var setupSockets = function (){
    const serverURL = window.location.hostname + ":" +  window.location.port;
    // const serverURL = "https://localhost:3030";
    const socket = io.connect(serverURL, {secure: true});
    // register desktop connection
    socket.emit('desktop-connect');

    socket.onopen = function(){
        console.log("Socket conectado!");
    }

    socket.on('phone-move', function (data){
        console.log('movimiento');
        var beta = data;

        if (beta > 0.0){ //Mover derecha
            // moverDerecha();
            console.log("derecha");
            document.dispatchEvent(new KeyboardEvent("keydown", {keyCode: 39}));
        }else if (beta < 0.0){ //Mover izquierda
            // moverIzquierda();
            console.log("izquierda");
            document.dispatchEvent(new KeyboardEvent("keydown", {keyCode: 37}));
        }

    });
}