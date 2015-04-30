
var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null,
MAX_FRAME_SKIP = 10;

var vertexPositionAttribute = null,
trianglesVerticeBuffer = null,
vertexColorAttribute = null,
trianglesColorBuffer = null;
var angle = 0.0;

//primary game object.  will controll gamestate and rendering
var game = new Object();
game.running = false;
game.gameStarted = false;
game.game = null;
game.framesPerSecond = 60;
game.run = run;
game.init = InitWebGL;


//Game Selection
//load game specific content
$.getScript("solitaire/solitaire.js", function(){

	game.game = solGame;
	game.running = true;
}

//Initialize OpenGL
function init(){
	InitWebGL();
}

//begins running the game
function run(){
	game.running = true;
	var gameTickNext = (new Date).getTime(),
	tickInterval = 10000 / game.framesPerSecond;

	while(game.running && (new Date).getTime() > gameTickNext ){
		SetupWebGL();
		game.game.update();
		game.game.draw
		gameTickNext += tickInterval;

	}


		



function InitWebGL()
{

	var canvas = document.getElementById("gameCanvas");

	try
	{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	}
	catch(ex)
	{
			alert("This Browser doesn't support webGL.  Please update or change your browser.");
			return;
	}

	if(gl)
	{
		//begin draw process
		InitShaders();
		SetupBuffers();

	}
	else
	{
		alert("Error: Your browser doesn't support webGL");
	}
}

function SetupWebGL()
{
	var canvas = document.getElementById("gameCanvas");
	//set the clear color to a shade of green
	gl.clearColor(0.1, 0.5, 0.1, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	//render point of origin
	gl.viewport(canvas.width / 2.0, canvas.height / 2.0, canvas.width / 2.0, canvas.height / 2.0);

}

function InitShaders()
{
	//get shader source

	var fs_source = document.getElementById('shader-fs').innerHTML,
	vs_source = document.getElementById('shader-vs').innerHTML;

	//compile shaders

	vertexShader = MakeShader(vs_source, gl.VERTEX_SHADER);
	fragmentShader = MakeShader(fs_source, gl.FRAGMENT_SHADER);

	//create programs
	glProgram = gl.createProgram();

	//attach and link shaders to the program
	gl.attachShader(glProgram, vertexShader);
	gl.attachShader(glProgram, fragmentShader);
	gl.linkProgram(glProgram);

	if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS))
		{
			alert("Unable to initialize shader program.");
		}

	//use program
	gl.useProgram(glProgram);

}

function MakeShader(src, type)
{
	//compile vertex shader
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
		}
	return shader;
}




function cleanupGame()
{
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);
	gl.deleteProgram(glProgram);
}
