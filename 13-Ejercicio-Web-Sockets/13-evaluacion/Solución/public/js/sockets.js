// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

const serverURL = window.location.hostname + ":" +  window.location.port;

export function setupSockets(){

    const socket = io.connect(serverURL, {secure: true});
    // register phone connection
    socket.emit('desktop-connect');

    socket.on('phone-move', function(data) {
        if (data<0){ //Si es <0, desplazo a la izquierda
            console.log("Simulo flecha izquierda");
            window.dispatchEvent(

                new KeyboardEvent('keydown',
                    {key: 'ArrowLeft'
                    })
            );
            window.dispatchEvent(

                new KeyboardEvent('keyup',
                    {key: 'ArrowLeft'
                    })
            );
        }
        if (data>0){ //Si es >0, desplazo a la derecha
            console.log("Simulo flecha derecha");
            window.dispatchEvent(

                new KeyboardEvent('keydown',
                    {key: 'ArrowRight'
                    })
            );
            window.dispatchEvent(

                new KeyboardEvent('keyup',
                    {key: 'ArrowRight'
                    })
            );
        }
    });
};

export function crashSocket(){

    const socket = io.connect(serverURL, {secure: true});
    // register phone connection
    socket.emit('crash');
};

