
var gl = null,
canvas = null,
glProgram = null,
fragmentShader = null,
vertexShader = null;

var vertexPositionAttribute = null,
trianglesVerticeBuffer = null,
vertexColorAttribute = null,
trianglesColorBuffer = null;
var angle = 0.0;


function InitWebGL()
{

	var canvas = document.getElementById("gameCanvas");

	try
	{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	}
	catch(ex)
	{

	}

	if(gl)
	{
		//begin draw process
		InitShaders();
		SetupBuffers();

		//primary game loop
		(function AnimLoop(){
			SetupWebGL();
			SetupDynamicBuffers();
			DrawScene();
			//Load required files
			$.getScript("rAF.js", function(){
				requestAnimationFrame(AnimLoop, canvas);
			});
		})();



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


function SetupBuffers()
{

	var triangleVerticeColors = [
	                             //red left triangle
	                             1.0, 0.0, 0.0,
	                             1.0, 1.0, 1.0,
	                             1.0, 0.0, 0.0,

	                             //blue right trianngle
	                             0.0, 0.0, 1.0,
	                             1.0, 1.0, 1.0,
	                             0.0, 0.0, 1.0
	                             ];



	trianglesColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticeColors),gl.STATIC_DRAW);
}


function SetupDynamicBuffers()
{
	//Limit x translation amount to -0.5 to 0.5

	var x_translation = Math.sin(angle)/2.0;
	var triangleVertices = [
	                        //left triangle
	                        -0.5 + x_translation, 0.5, 0.0,
	                        0.0 + x_translation, 0.0, 0.0,
	                        -0.5 + x_translation, -0.5, 0.0,
	                        //right triangle
	                        0.5 + x_translation, 0.5, 0.0,
	                        0.0 + x_translation, 0.0, -0.5,
	                        0.5 + x_translation, -0.5, 0.0
	                        ];

	angle += 0.01;


	trianglesVerticeBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.DYNAMIC_DRAW);
}

function DrawScene()
{
	vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

	vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
	gl.enableVertexAttribArray(vertexColorAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffer);
	gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function cleanupGame()
{
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);
	gl.deleteProgram(glProgram);
}
