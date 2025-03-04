function setupWebGL(){
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
  
    // Get the rendering context for WebGL
    //gl = getWebGLContext(canvas);
  
    gl = canvas.getContext("webgl",  { preserveDrawingBuffer: true });
  
    if (!gl) {
      alert("WebGL not supported or initialization failed.");
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
    //console.log("gl init success");
    gl.enable(gl.DEPTH_TEST);
  } 
  
  function connectVariablesToGLSL(){
  
      // Initialize shaders
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');      
        return;
    
      }
    
      // Get the storage location of a_Position
      a_Position = gl.getAttribLocation(gl.program, 'a_Position');
      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
      }
  
      
      a_UV = gl.getAttribLocation(gl.program, 'a_UV');
      if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
      }
    
      u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
      if (!u_cameraPos) {
        console.log('Failed to get the storage location of u_cameraPos');
        return;
      }

      a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
      if (a_Normal < 0) {
        console.log('Failed to get the storage location of a_Normal');
        return;
      }
      // // Get the storage location of u_FragColor
      u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
      if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
      }
  
      u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
      if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
      }
  
      u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
      if (!u_NormalMatrix) {
        console.log('Failed to get the storage location of u_NormalMatrix');
        return;
      }

      u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
      if (!u_lightOn) {
        console.log('Failed to get the storage location of u_lightOn');
        return;
      }
      u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
      if (!u_GlobalRotateMatrix) {
        console.log('Failed to get the storage location of u_GlobalRotateMatrix');
        return;
      }
  
      u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
      if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
      }
      
      u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
      if (!u_ProjectionMatrix) {
        console.log('Failed to get the storage location of u_ProjectionMatrix');
        return;
      }
      u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
      u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
      u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');

      if (!u_Sampler0 || !u_Sampler1 || !u_Sampler2) {
          console.log('Failed to get the storage location of u_Sampler0 or u_Sampler1 or u_Sampler2');
          return false;
      }
  
      u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
      if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_whichTexture');
        return;
      }
      u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
      if (!u_lightPos) {
        console.log('Failed to get the storage location of u_lightPos');
        return;
      }
      
      u_spotLightDir = gl.getUniformLocation(gl.program, 'u_spotLightDir');
      if (!u_spotLightDir) {
        console.log('Failed to get the storage location of u_spotLightDir');
        return;
      }

      u_spotLightPos = gl.getUniformLocation(gl.program, 'u_spotLightPos');
      if (!u_spotLightPos) {
        console.log('Failed to get the storage location of u_spotlightPos');
        return;
      }

      u_spotLightCutoff = gl.getUniformLocation(gl.program, 'u_spotLightCutoff');
      if (!u_spotLightCutoff) {
        console.log('Failed to get the storage location of u_spotlightCutoff');
        return;
      }
      u_spotLightExponent = gl.getUniformLocation(gl.program, 'u_spotLightExponent');
      if (!u_spotLightExponent) {
        console.log('Failed to get the storage location of u_spotlightExponent');
        return;
      }

      u_spotLightOn = gl.getUniformLocation(gl.program, 'u_spotLightOn');
      if (!u_spotLightOn) {
        console.log('Failed to get the storage location of u_spotlightOn');
        return;
      }
      u_lightColor = gl.getUniformLocation(gl.program, 'u_lightColor');
      if (!u_lightColor) {
        console.log('Failed to get the storage location of u_lightColor');
        return;
      }
      
      

      var identityM = new Matrix4();
      gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
   

      // var sampler0 = new Matrix4();
      // gl.uniformMatrix4fv(u_Sampler0, false, sampler0.elements);
  
      
  }