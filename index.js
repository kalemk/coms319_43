const fragData = {};
const fireworkData = {};
let activeFrags = [];
let trails = [];
let canvas, ctx;
let gravity = 0.05;
let flashLevel = 0;

window.addEventListener('load', function() {
    tryLoadData();
    canvas = document.getElementById("unused-canvas");
    ctx = canvas.getContext("2d");
    mainLoop();
});

function tryLoadData() {
    fetch('./data.json').then(res => res.json()).then(data => 
    {
        console.log("loaded data");
        initData(data);
    }).catch(err => 
    {
        console.log("error loading data");
        console.log(err);
    });
}

function initData(jsondata) {
    var data = jsondata.fireworkData;
    console.log(data);

    for(let i in data) {        
        if(data[i].type == "frag") {
            // check for duplicate ids
            if(fragData[data[i].id]) {
                throw new Error("duplicate frag id: " + data[i].id);
            }
            fragData[data[i].id] = data[i];
        }else if(data[i].type == "firework") {
            // check for duplicate names
            if(fireworkData[data[i].name]) {
                throw new Error("duplicate firework name: " + data[i].name);
            }
            fireworkData[data[i].name] = data[i];

                // select the hidden element

                // for every item in the json, copy the hidden element
                // and add it to the page. unhide it.

                // give it the proper title, price, rating, etc.

                let templateElement = document.getElementById("shop-element-template");

                let clone = templateElement.cloneNode(true);
                clone.id = "shop-element-clone";
                clone.querySelector(".dimImage").src = jsondata.images[data[i].image_type][0];
                clone.querySelector(".brightImage").src = jsondata.images[data[i].image_type][1];
                clone.hidden = false;


                //let can = clone.querySelector(".canvas");
                //can.id = "canvas-clone";

                let container = document.getElementsByClassName('row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3')[0];
                container.appendChild(clone);

        }else {
            throw new Error("unknown type: " + data[i].type);
        }
    }
}

// Firework class
function Firework(data) {
    this.name = data.name;
    this.price = data.price;
    this.rating = data.rating;
    this.image_type = data.image_type;
    this.init_frag = data.init_frag;
}

Firework.prototype.launch = function() {
    let frag = new Frag(fragData[this.init_frag], 0.5+(Math.random()*2-1)*0.035);
    frag.x = 0;
    frag.y = 1;
    activeFrags.push(frag);
}

// Frag class
function Frag(data, angle) {
    this.id = data.id;
    this.lifetime = data.lifetime + data.lifetime*data.lifetime_jitter*(Math.random()*2-1);
    this.speed = data.speed + data.speed*data.speed_jitter*(Math.random()*2-1);
    this.speed_decay = data.speed_decay;
    this.frag_color = data.frag_color;
    this.frag_flash = data.frag_flash;
    this.frag_size = data.frag_size + data.frag_size*data.frag_size_jitter*(Math.random()*2-1);
    this.trail_color = data.trail_color;
    this.trail_size = data.trail_size;
    this.trail_size_jitter = data.trail_size_jitter;
    this.trail_spacing = data.trail_spacing;
    this.trail_spacing_jitter = data.trail_spacing_jitter;
    this.trail_lifetime = data.trail_lifetime;
    this.trail_lifetime_jitter = data.trail_lifetime_jitter;

    const num_frag_types = data.frag_count.length;
    if(data.frag_count_jitter.length != num_frag_types) {
        console.log(data);
        console.log(data.frag_count_jitter, num_frag_types);
        throw new Error("frag_count_jitter is not the right length");
    }
    if(data.frag_types.length != num_frag_types) {
        console.log(data);
        throw new Error("frag_types is not the right length");
    }
    if(data.frag_arcs.length != num_frag_types) {
        console.log(data);
        throw new Error("frag_arcs is not the right length");
    }

    this.frag_count = data.frag_count.map((n,i) => n + n*data.frag_count_jitter[i]*(Math.random()*2-1));
    this.frag_types = data.frag_types;
    this.frag_arcs = data.frag_arcs;

    this.x = 0;
    this.y = 1;
    this.vx = this.speed*Math.cos(angle*2*Math.PI-Math.PI/2);
    this.vy = -this.speed*Math.sin(angle*2*Math.PI-Math.PI/2);
}

Frag.prototype.update = function() {
    if(this.lifetime < 0) return;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.speed_decay;
    this.vy *= this.speed_decay;
    this.vy += gravity;
    this.lifetime--;

    if(this.lifetime < 0) {
        flashLevel = this.frag_flash;
        for(let i = 0; i<this.frag_count.length; i++) {
            const frag_count = this.frag_count[i];
            const frag_type = this.frag_types[i];
            const frag_arc = this.frag_arcs[i];
            for(let j = 0; j<frag_count; j++) {
                const angle = frag_arc[0] + (frag_arc[1]-frag_arc[0])*Math.random();
                let frag = new Frag(fragData[frag_type], angle);
                frag.x = this.x;
                frag.y = this.y;
                frag.vx = this.vx*0.5 + frag.speed*Math.cos(angle*2*Math.PI-Math.PI/2);
                frag.vy = this.vy*0.5 - frag.speed*Math.sin(angle*2*Math.PI-Math.PI/2);
                activeFrags.push(frag);
            }
        }
        return;
    }

    // TODO add trail spacing
    if(Math.random() < 0.75){
        let t = new Trail(this);
        trails.push(t);
    }
}

Frag.prototype.draw = function(ctx) {
    if(this.lifetime < 0) return;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();
    ctx.arc(this.x+width/2, this.y+height, this.frag_size, 0, 2*Math.PI);
    ctx.fillStyle = this.frag_color;
    ctx.fill();

    // check out of bounds
    if(this.x < -width || this.x > width || this.y > height*0.5 || this.y < -height*1.5) {
        this.lifetime = -1;
    }
}


function Trail(frag) {
    this.color = frag.trail_color;
    this.x = frag.x;
    this.y = frag.y;
    this.maxLife = frag.trail_lifetime + frag.trail_lifetime*frag.trail_lifetime_jitter*(Math.random()*2-1);
    this.lifetime = this.maxLife;
    this.size = frag.trail_size + frag.trail_size*frag.trail_size_jitter*(Math.random()*2-1);
}

Trail.prototype.update = function() {
    this.lifetime--;
}

Trail.prototype.draw = function(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();
    ctx.arc(this.x+width/2, this.y+height, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.globalAlpha = Math.max(this.lifetime/this.maxLife, 0);
    ctx.fill();
    ctx.restore();
}

function drawFlash() {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    let flashValue = Math.floor(Math.max(flashLevel,0)*255);
    ctx.fillStyle = `rgb(${flashValue}, ${flashValue}, ${flashValue})`;
    ctx.fillRect(0, 0, width, height);

    if(flashLevel > 0) {
        flashLevel -= 0.05;
    }
}

function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFlash();

    for(let i = trails.length-1; i>=0; i--) {
        if(trails[i].lifetime >= 0){
            trails[i].update();
            trails[i].draw(ctx);
        }else{
            trails.splice(i, 1);
        }
    }
    for(let i = activeFrags.length-1; i>=0; i--) {
        if(activeFrags[i].lifetime >= 0){
            activeFrags[i].update();
            activeFrags[i].draw(ctx);
        }else{
            activeFrags.splice(i, 1);
        }
    }

    requestAnimationFrame(mainLoop);
}

