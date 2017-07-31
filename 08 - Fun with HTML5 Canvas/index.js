//things that will be used throughout the code
const html = document.querySelector("html").style;
const cpt = window.getComputedStyle(document.querySelector("html"));

//Carlos, The Mexican Pirate Ball location and color
function relocate() {
    //x axis movement - 776 = canvas - carlos
    var x = Math.floor(Math.random() * 776);
    //y axis movement - 523 = canvas - carlos
    var y = Math.floor(Math.random() * 523);
    //generating a random hex color
    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //setting movement
    html.setProperty("--x", x + "px");
    html.setProperty("--y", y + "px");
    //setting color
    html.setProperty("--color", color);
    //"calling back" the color var to change it on the canvas' pencil
    var strole_color = cpt.getPropertyValue("--color");
    ctx.strokeStyle = strole_color;
}

//set it up
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
ctx.lineCap = "round";
//define color for first use
ctx.strokeStyle = cpt.getPropertyValue("--color");

var tool = new tool_pencil();
//fuck, I'm tired of commenting - this is pretty obvious
canvas.addEventListener('mousedown', mov_canvas);
canvas.addEventListener('mousemove', mov_canvas);
canvas.addEventListener('mouseup', mov_canvas);
//ok, this is pretty trciky - but I've managed to do it thanks do an Opera dev tutorial (yay)
function tool_pencil() {
    var tool = this;
    this.started = false;
    this.mousedown = function(mov) {
        //begin path when mousedown, tracks movement
        ctx.beginPath();
        ctx.moveTo(mov._x, mov._y);
        tool.started = true;
    };
    this.mousemove = function(mov) {
        if (tool.started) {
            //tracks movement (continuous)
            ctx.lineTo(mov._x, mov._y);
            ctx.stroke();
        }
    };
    this.mouseup = function(mov) {
        if (tool.started) {
            //stop movement when mouseup
            tool.mousemove(mov);
            tool.started = false;
        }
    };
}
//set movements for movement end (if this is clear enough)
function mov_canvas(mov) {
    if (mov.layerX || mov.layerX == 0) {
        mov._x = mov.layerX;
        mov._y = mov.layerY;
    }
    var func = tool[mov.type];
    if (func) {
        func(mov);
    }
}