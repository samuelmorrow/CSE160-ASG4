// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;

  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;


  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;
  
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal, 1)));
    v_VertPos = u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;

  uniform int u_whichTexture;
  uniform sampler2D u_Sampler0, u_Sampler1, u_Sampler2;
  uniform vec4 u_FragColor;
  uniform vec3 u_lightPos;
  uniform vec3 u_cameraPos;
  uniform vec3 u_spotLightDir;
  uniform bool u_lightOn;
  uniform bool u_spotLightOn;
  uniform float u_spotLightCutoff;
  uniform float u_spotLightExponent;
  uniform vec3 u_spotLightPos;
  uniform vec3 u_lightColor;

  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;

  //Phong Lighting 


  void main() {
      if (u_whichTexture == -2) {
        gl_FragColor = u_FragColor;
      } else if (u_whichTexture == -1) {
        gl_FragColor = vec4(v_UV, 1.0, 1.0);
      } else if (u_whichTexture == 0) {
        gl_FragColor = texture2D(u_Sampler0, v_UV);
      } else if (u_whichTexture == 1) {
        gl_FragColor = texture2D(u_Sampler1, v_UV);
      } else if (u_whichTexture == 2) {
        gl_FragColor = texture2D(u_Sampler2, v_UV);
      } else if (u_whichTexture == 3) {
        gl_FragColor = vec4((v_Normal + 1.0) / 2.0, 1.0);
      } else {
        gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0);
      }
      
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      float r = length(lightVector);
      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      float nDotL = max(dot(N, L), 0.0);

      // Reflection
      vec3 R = reflect(-L, N);

      // Eye vector
      vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

      // Specular component
      vec3 specular = vec3(pow(max(dot(E, R), 0.0), 20.0)) * u_lightColor;

      vec3 diffuse = vec3(gl_FragColor) * nDotL * u_lightColor;
      vec3 ambient = vec3(gl_FragColor) * 0.3;

      // Spotlight calculations
      vec3 L_spot = normalize(u_spotLightPos - vec3(v_VertPos));
      float nDotL_spot = max(dot(N, L_spot), 0.0);
      vec3 R_spot = reflect(-L_spot, N);
      vec3 specular_spot = vec3(pow(max(dot(E, R_spot), 0.0), 10.0));

      vec3 spotDir = normalize(u_spotLightDir);
      float spotFactor = dot(-L_spot, spotDir);
      float spotIntensity = 0.0;
      
      if (spotFactor > u_spotLightCutoff) {
        spotIntensity = pow(spotFactor, u_spotLightExponent);
      }

      vec3 diffuse_spot = vec3(gl_FragColor) * nDotL_spot * spotIntensity * u_lightColor;
      specular_spot = specular_spot * spotIntensity * u_lightColor;

      // Disable specular for textures
      if (u_whichTexture == 0 || u_whichTexture == 1) {
        specular = vec3(0.0);
      }

      // Light control
      if (u_lightOn) {
        if (u_spotLightOn) {
              diffuse += diffuse_spot;
              specular += specular_spot;
        }
        gl_FragColor = vec4(specular + ambient + diffuse, 1.0);
      } else {
        if (u_spotLightOn) {
            gl_FragColor = vec4(specular_spot + ambient + diffuse_spot, 1.0);
        }
      }


    }`



  
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_NormalMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_whichTexture;
let a_Normal;
let u_lightPos;
let u_cameraPos;
let u_lightOn;
let g_normalOn = false;
let g_animate = false;
let g_lightOn = true;

let u_spotLightDir;
let u_spotLightCutoff;
let u_spotLightExponent;
let u_spotLightPos;

let g_spotLightOn = true;
let u_spotLightOn;
let g_spotLightPos = [0, 6, 0];
let g_spotLightDir = [0, -.5, 0];  // pointing straight down
let g_spotLightCutoff = 0.7;      // dot angle threshold (cosine of cutoff angle)
let g_spotLightExponent = 120.0;
let g_lightColor = [1.0, 1.0, 1.0];
let u_lightColor;
//Global UI Elements

let g_globalAngle=0;
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_lightPos = [0, 1, -2];

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

let g_camera;

function main() {

  setupWebGL();

  connectVariablesToGLSL();

  // Initialize camera before using it
  g_camera = new Camera();
  
  addActionsForHtmlUI();
  addMouseControls();
  
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) } };
  

  initTextures();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  requestAnimationFrame(tick);
  }

var g_startTime = performance.now()/10000.0;
var g_seconds = performance.now()/10000.0 - g_startTime;

var g_lastTick = performance.now();
var g_timeStep = 1000/60; // Target 60 FPS

function tick() {
    var currentTime = performance.now();
    var deltaTime = currentTime - g_lastTick;
    
    if (deltaTime > g_timeStep) {
        g_seconds = currentTime/500.0 - g_startTime;
        updateAnimationAngles();
        renderAllShapes();
        g_lastTick = currentTime;
    }
    
    requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  // if (g_animate) {
  //   g_lightPos[0] = Math.cos(g_seconds);
  // }
  if (g_animate) {
    let radius = 1.5; // Adjust as needed
    g_lightPos[0] = radius * Math.cos(g_seconds); // X position
    g_lightPos[2] = radius * Math.sin(g_seconds);
  }
  
}

function click(ev) {
  
  [x,y] = convertCoordinateEventToGL(ev);

  
  renderAllShapes();
}

function convertCoordinateEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}





function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}