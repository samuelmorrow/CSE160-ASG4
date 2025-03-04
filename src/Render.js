

  
  function renderScene() {
     
    var startTime = performance.now();
  
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    var floor = new Cube();
    floor.color = [0.89,0.769,0.443,1.0];
    if (g_normalOn) {
      floor.textureNum = 3;
    } else {
    floor.textureNum = 1;
    }
    floor.matrix = new Matrix4();
    floor.matrix.translate(-5, -0.75, -5);
    floor.matrix.scale(10, 0, 10);
    floor.normalMatrix.setInverseOf(floor.matrix).transpose();

    var sky = new Cube();
    sky.matrix = new Matrix4();
    sky.color = [0.89,0.769,0.443,1.0];
    if (g_normalOn) {
    sky.textureNum = 3;
    } else {
      sky.textureNum = 1;   
    }
    sky.matrix.translate(5, 5, 5);
    sky.matrix.scale(-10, -10, -10);
    // sky.normalMatrix.setInverseOf(sky.matrix).transpose();

    var cube = new Cube();
    cube.color = [0.89,0.769,0.443,1.0];
    if (g_normalOn) {
      cube.textureNum = 3;
    } else {
      cube.textureNum = 2;
    }
    
    cube.matrix = new Matrix4();
    cube.matrix.translate(-2, -0.75, -1);
    cube.matrix.scale(1, 1, 1);


    floor.renderfaster();
    sky.renderfaster();
    cube.renderfaster();
    cube.normalMatrix.setInverseOf(cube.matrix).transpose();
    

    var sphere = new Sphere();
    sphere.color = [0.89,0.769,0.443,1.0];
    if (g_normalOn) {
      sphere.textureNum = 3;
    } else {
    sphere.textureNum = 2;
    }
    sphere.matrix = new Matrix4();
    sphere.matrix.translate(1, 0.25, -0.5);
    sphere.matrix.scale(.5, .5, .5);
    sphere.render();
    
    


    gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
    gl.uniform3f(u_cameraPos, g_eye.elements[0], g_eye.elements[1], g_eye.elements[2]);
    gl.uniform1i(u_lightOn, g_lightOn);

    gl.uniform1i(u_spotLightOn, g_spotLightOn);
    gl.uniform3f(u_spotLightPos, g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
    gl.uniform3f(u_spotLightDir, g_spotLightDir[0], g_spotLightDir[1], g_spotLightDir[2]);
    gl.uniform1f(u_spotLightCutoff, g_spotLightCutoff);
    gl.uniform1f(u_spotLightExponent, g_spotLightExponent);

    gl.uniform3f(u_lightColor, g_lightColor[0], g_lightColor[1], g_lightColor[2]);
    //COLOR 

    var light = new Cube();
    light.color = [2.0, 2.0, 0.0, 1.0];
    //light.matrix = new Matrix4();
    light.textureNum = -2;
    light.matrix.translate(g_lightPos[0], g_lightPos[1], g_lightPos[2]);
    light.matrix.scale(-0.1, -0.1, -0.1);
    light.matrix.translate(-0.5, -5, -0.5);
    light.renderfaster();


    //ANIMAL

    var head = new Cube();
    if (g_normalOn) {
      head.textureNum = 3;
    } else {
      head.textureNum = -2;
    }
  head.color = [0.6,0.451,0.055,1.0];
  head.matrix.translate(0, .4, -0.0001, 1);
  head.matrix.rotate(0,1,0,0);
  var head_matrix = new Matrix4(head.matrix);
  head.matrix.scale(0.3, .15, 0.3);
  head.matrix.translate(0,0,0,0);
  head.normalMatrix.setInverseOf(head.matrix).transpose();

  head.renderfaster();

  var tongue = new Cube()
  if (g_normalOn) {
    tongue.textureNum = 3;
  } else {
    tongue.textureNum = -2; 
  }
  tongue.color = [1.0,0.0,0.0,1.0];
  tongue.matrix = head_matrix;
  tongue.matrix.translate(0.1, 0, .25, 1);
  tongue.matrix.rotate(45,1,0,0);

  tongue.matrix.scale(0.1, .05, 0.2);
  tongue.normalMatrix.setInverseOf(tongue.matrix).transpose();

  tongue.renderfaster();

  //neck
  neck = new Cube();
  if (g_normalOn) {
    neck.textureNum = 3;
  } else {
    neck.textureNum = -2;
  }
  neck.color = [0.941,0.831,0.545,1.0];
  neck.matrix.translate(.08, 0, 0, 1);
  neck.matrix.rotate(0,1,0,0);
  neck.matrix.scale(0.15, .5, 0.2);
  neck.normalMatrix.setInverseOf(neck.matrix).transpose();

  neck.renderfaster();

  //body
  body = new Cube();
  if (g_normalOn) {
    body.textureNum = 3;
  } else {
    body.textureNum = -2;
  }
  body.color = [0.89,0.769,0.443,1.0]; 
  body.matrix.translate(0, -.3, -.7, 1);
  body.matrix.rotate(0,1,0,0);
  body.matrix.scale(0.3, .3, .85);
  body.normalMatrix.setInverseOf(body.matrix).transpose();

  body.renderfaster();


 // Front right leg (upper)
  front_right_thigh = new Cube();
  if (g_normalOn) {
    front_right_thigh.textureNum = 3;
  } else {
    front_right_thigh.textureNum = -2;
  }
  front_right_thigh.color = [0.678, 0.58, 0.31, 1.0];
  front_right_thigh.matrix.translate(0.2, -0.225, 0.1);
  front_right_thigh.matrix.rotate(150, 1, 0, 0); 
  var front_right_leg_matrix = new Matrix4(front_right_thigh.matrix);
  front_right_thigh.matrix.scale(0.1, 0.3, 0.1);
  front_right_thigh.matrix.translate(0.1, 0, -0.0001);
  front_right_thigh.normalMatrix.setInverseOf(front_right_thigh.matrix).transpose();

  front_right_thigh.renderfaster();

  // Front right leg (lower/knee)
  front_right_calf = new Cube();
  if (g_normalOn) {
    front_right_calf.textureNum = 3;
  } else {
    front_right_calf.textureNum = -2;
  }
  front_right_calf.color = [0.678, 0.58, 0.31, 1.0];
  front_right_calf.matrix = front_right_leg_matrix;
  front_right_calf.matrix.translate(0, .3, 0.07);
  front_right_calf.matrix.rotate(50, 1, 0, 0);
  front_right_calf.matrix.scale(0.1, 0.3, 0.1); 
  front_right_calf.matrix.translate(0, -0.25, .2); 
  front_right_calf.normalMatrix.setInverseOf(front_right_calf.matrix).transpose();

  front_right_calf.renderfaster();

  // Front left leg (upper)
  front_left_thigh = new Cube();
  if (g_normalOn) {
    front_left_thigh.textureNum = 3;
  } else {
    front_left_thigh.textureNum = -2;
  }
  front_left_thigh.color = [0.678, 0.58, 0.31, 1.0];
  front_left_thigh.matrix.translate(0, -0.225, 0.1);
  front_left_thigh.matrix.rotate(150, 1, 0, 0);
  var front_left_leg_matrix = new Matrix4(front_left_thigh.matrix);
  front_left_thigh.matrix.scale(0.1, 0.3, 0.1);
  front_right_thigh.matrix.translate(0.1, 0, -0.0001);
  front_left_thigh.normalMatrix.setInverseOf(front_left_thigh.matrix).transpose();

  front_left_thigh.renderfaster();

  // Front left leg (lower/knee)
  front_left_calf = new Cube();
  if (g_normalOn) {
    front_left_calf.textureNum = 3;
  } else {
    front_left_calf.textureNum = -2;
  }
  front_left_calf.color = [0.678, 0.58, 0.31, 1.0];
  front_left_calf.matrix = front_left_leg_matrix;
  front_left_calf.matrix.translate(0, 0.3, 0.07);
  front_left_calf.matrix.rotate(50, 1, 0, 0);
  front_left_calf.matrix.scale(0.1, 0.3, 0.1);
  front_left_calf.matrix.translate(0, -0.25, .2);
  front_left_calf.normalMatrix.setInverseOf(front_left_calf.matrix).transpose();

  front_left_calf.renderfaster();

  // Back right leg (upper)
  back_right_thigh = new Cube();
  if (g_normalOn) {
    back_right_thigh.textureNum = 3;
  } else {
    back_right_thigh.textureNum = -2;
  }
  back_right_thigh.color = [0.678, 0.58, 0.31, 1.0];
  back_right_thigh.matrix.translate(.2, -0.225, -.6);
  back_right_thigh.matrix.rotate(150, 1, 0, 0); 
  var back_right_leg_matrix = new Matrix4(back_right_thigh.matrix);
  back_right_thigh.matrix.scale(0.1, 0.3, 0.1);
  back_right_thigh.matrix.translate(0.1, 0, -0.0001);
  back_right_thigh.normalMatrix.setInverseOf(back_right_thigh.matrix).transpose();

  back_right_thigh.renderfaster();

  // Back right leg (lower/knee)
  back_right_calf = new Cube();
  if (g_normalOn) {
    back_right_calf.textureNum = 3;
  } else {
    back_right_calf.textureNum = -2;
  }
  back_right_calf.color = [0.678, 0.58, 0.31, 1.0];
  back_right_calf.matrix = back_right_leg_matrix;
  back_right_calf.matrix.translate(0, .3, 0.07);
  back_right_calf.matrix.rotate(50, 1, 0, 0);
  back_right_calf.matrix.scale(0.1, 0.3, 0.1);
  back_right_calf.matrix.translate(0, -0.25, 0.2);
  back_right_calf.normalMatrix.setInverseOf(back_right_calf.matrix).transpose();

  back_right_calf.renderfaster();

  // Back left leg (upper)
  back_left_thigh = new Cube();
  if (g_normalOn) {
    back_left_thigh.textureNum = 3;
  } else {
    back_left_thigh.textureNum = -2;
  }
  back_left_thigh.color = [0.678, 0.58, 0.31, 1.0];
  back_left_thigh.matrix.translate(0, -0.225, -0.6);
  back_left_thigh.matrix.rotate(150, 1, 0, 0);
  var back_left_leg_matrix = new Matrix4(back_left_thigh.matrix);
  back_left_thigh.matrix.scale(0.1, 0.3, 0.1);
  back_left_thigh.matrix.translate(0.1, 0, -0.0001);
  back_left_thigh.normalMatrix.setInverseOf(back_left_thigh.matrix).transpose();

  back_left_thigh.renderfaster();

  // Back left leg (lower/knee)
  back_left_calf = new Cube();
  if (g_normalOn) {
    back_left_calf.textureNum = 3;
  } else {
    back_left_calf.textureNum = -2;
  }
  back_left_calf.color = [0.678, 0.58, 0.31, 1.0];
  back_left_calf.matrix = back_left_leg_matrix;
  back_left_calf.matrix.translate(0, 0.3, 0.07);
  back_left_calf.matrix.rotate(50, 1, 0, 0);
  back_left_calf.matrix.scale(0.1, 0.3, 0.1);
  back_left_calf.matrix.translate(0, -0.25, .2);
  back_left_calf.normalMatrix.setInverseOf(back_left_calf.matrix).transpose();

  back_left_calf.renderfaster();


  // gl.uniform3fv(u_spotLightDir, [0.0, 0.0, 0.0]);
    var duration = performance.now() - startTime;
    sendTextToHTML("numdot: " + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");
    
  }
  
  
  

  
  function renderAllShapes() {
    let viewMatrix = new Matrix4();
    viewMatrix.setLookAt(g_eye.elements[0], g_eye.elements[1], g_eye.elements[2],
                        g_at.elements[0], g_at.elements[1], g_at.elements[2], 
                        g_up.elements[0], g_up.elements[1], g_up.elements[2]);

    let projectionMatrix = new Matrix4();
    projectionMatrix.setPerspective(45, canvas.width/canvas.height, 0.1, 100);


    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix.elements); 

    var globalRotMat = new Matrix4();  // Remove any global rotation
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    renderScene();
  }

  
  
  
 