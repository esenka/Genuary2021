//////////////////////////////////////////////////////////////////////////////////////
// Audio reactive code that associate audio frequency intensity from microphone with 
// size of circles and lines. The circles and lines takes the color from the art image 
// in the background. Many thanks to Elios Ramos for the original idea and the inspiration.
// Licensed under Creative Commons 0 Universal 1.0


var img;

var mic, fft;

var circles = [];

var lines = [];

var freq = 1024;

////////////////
// preload image
////////////////


function preload()
{
    img = loadImage('archi2.jpg');
}


/////////////////
// setup function
/////////////////

var clusters;

function setup()
{
	
   createCanvas(img.width,img.height);

   angleMode(RADIANS);

   ellipseMode(CENTER);

   for(var i=0;i < freq;i++)
   {
      circles.push(new Circle());
      lines.push(new Line());
   }

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT(0.5,freq);
   fft.setInput(mic);
}


////////////////
// circle class
////////////////


function Circle()
{
    this.x = random()*width;
    this.y = random()*height;
    this.diameter = 15;
    this.color = img.get(this.x,this.y);
    this.speed = 0;
	  this.move = function() 
		{
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
		}
		this.display = function()
    {
			fill(this.color);
    	strokeWeight(1);
			ellipse(this.x,this.y,this.diameter,this.diameter);
    };
}

/////////////
// line class
/////////////


function Line()
{
    this.x = random()*width;
    this.y = random()*height;
    this.length= 25;
    this.angle = 0.0;
    this.color = img.get(this.x,this.y);
    this.display = function()
    {
        stroke(this.color);
        strokeWeight(0.5);
        push();
        translate(this.x,this.y);
        rotate(this.angle);
				line(this.x,this.y,this.x + this.length,this.y + this.length);
        pop();
    };
}


////////////////
// draw function
////////////////

var spectrum;

var energy;

function draw() {
	
   spectrum = fft.analyze();
	
   for(var i=0; i < freq;i++)
   {
      var myDiam   = map(spectrum[i],0,255,0,20);
      var myColor  = map(spectrum[i],0,255,0.0,10);
      var myLength = map(spectrum[i],0,255,0,500);
      var myAngle  = map(spectrum[i],0,255,0.0,2*PI);
      var myStep   = map(spectrum[i],0,255,-5,5);
      var mySpeed  = map(spectrum[i],0,255,0,20);
		  circles[i].speed = floor(mySpeed);
		  circles[i].diameter = floor(myDiam);
      lines[i].length = myLength;
      lines[i].angle  = myAngle;
	  	circles[i].display();
		  circles[i].move();
      lines[i].display();
   }

}
