import {setupSockets} from "./sockets.js";

let canvasp = document.getElementById("pang");
let contextp = canvasp.getContext("2d");
let canvasm = document.getElementById("minicuadro");
let contextm = canvasm.getContext("2d");
let pang = new Image();
pang.src = "./img/spritesheet.png";
pang.onload = function (){
    contextp.drawImage(pang,0,0);
    contextp.strokeStyle = "#FF0000";
    contextp.font = "bold 10px sans-serif";
    contextp.fillStyle = "red";
    contextp.textBaseline = "top";
    contextp.fillText("("+x+","+y+")",420,3);
    contextp.strokeRect(x,y,28,36);
    contextm.drawImage(pang,0,0,28,36,0,0,28*2,36*2);

};

let x = 0;
let y = 0;
document.addEventListener('keydown', function(e){
    switch (e.keyCode) {
        case 37:
            contextp.drawImage(pang,0,0);
            x=x-1;
            contextp.strokeRect(x,y,28,36);
            contextp.fillText("("+x+","+y+")",420,3);
            contextm.drawImage(pang,x,y,28,36,0,0,28*2,36*2);
            e.preventDefault();
            break;
        case 38:
            contextp.drawImage(pang,0,0);
            y=y-1;
            contextp.fillText("("+x+","+y+")",420,3);
            contextp.strokeRect(x,y,28,36);
            contextm.drawImage(pang,x,y,28,36,0,0,28*2,36*2);
            e.preventDefault();
            break;
        case 39:
            contextp.drawImage(pang,0,0);
            x=x+1;
            contextp.fillText("("+x+","+y+")",420,3);
            contextp.strokeRect(x,y,28,36);
            contextm.drawImage(pang,x,y,28,36,0,0,28*2,36*2);
            e.preventDefault();
            break;
        case 40:
            contextp.drawImage(pang,0,0);
            y=y+1;
            contextp.fillText("("+x+","+y+")",420,3);
            contextp.strokeRect(x,y,28,36);
            contextm.drawImage(pang,x,y,28,36,0,0,28*2,36*2);
            e.preventDefault();
            break;
    }});
document.onload = setupSockets();