g_eye = new Vector3([0,0,3]);
g_at = new Vector3([0,0,0]);
g_up = new Vector3([0,1,0]);
class Camera {
    constructor() {
        this.fov = 45;
        this.eye = new Vector3([0, 2, 5]);
        this.at = new Vector3([0, 0, 0]);
        this.up = new Vector3([0, 1, 0]);
        // Add temporary storage for camera position
        this.tempEye = null;
        this.tempAt = null;
        this.lastRenderTime = 0;
        this.renderInterval = 1000 / 30; // 60 FPS
    }

    moveForward() {
        this.tempEye = new Vector3(g_eye.elements);
        this.tempAt = new Vector3(g_at.elements);
        
        let d = this.tempAt.sub(this.tempEye);
        let viewDir = new Vector3(d.elements); 
        d.normalize();
        
        let newEye = new Vector3([
            this.tempEye.elements[0] + d.elements[0] * 0.5,
            this.tempEye.elements[1] + d.elements[1] * 0.5,
            this.tempEye.elements[2] + d.elements[2] * 0.5
        ]);
        
        g_eye = newEye;
        g_at = new Vector3([
            newEye.elements[0] + viewDir.elements[0],
            newEye.elements[1] + viewDir.elements[1],
            newEye.elements[2] + viewDir.elements[2]
        ]);
        
        renderAllShapes();
    }

    moveBackward() {
        this.tempEye = new Vector3(g_eye.elements);
        this.tempAt = new Vector3(g_at.elements);
        
        let d = this.tempAt.sub(this.tempEye);
        let viewDir = new Vector3(d.elements); 
        d.normalize();
        
        let newEye = new Vector3([
            this.tempEye.elements[0] - d.elements[0] * 0.5,
            this.tempEye.elements[1],
            this.tempEye.elements[2] - d.elements[2] * 0.5
        ]);
        
        g_eye = newEye;
        g_at = new Vector3([
            newEye.elements[0] + viewDir.elements[0],
            newEye.elements[1] + viewDir.elements[1],
            newEye.elements[2] + viewDir.elements[2]
        ]);
        
        renderAllShapes();
    }

    moveLeft() {
        this.tempEye = new Vector3(g_eye.elements);
        this.tempAt = new Vector3(g_at.elements);
        
        let d = this.tempAt.sub(this.tempEye);
        let viewDir = new Vector3(d.elements);
        d.normalize();
        
        let right = Vector3.cross(d, g_up);
        right.normalize();
        
        let newEye = new Vector3([
            this.tempEye.elements[0] - right.elements[0] * 0.5,
            this.tempEye.elements[1],
            this.tempEye.elements[2] - right.elements[2] * 0.5
        ]);
        
        g_eye = newEye;
        g_at = new Vector3([
            newEye.elements[0] + viewDir.elements[0],
            newEye.elements[1] + viewDir.elements[1],
            newEye.elements[2] + viewDir.elements[2]
        ]);
        
        renderAllShapes();
    }

    moveRight() {
        this.tempEye = new Vector3(g_eye.elements);
        this.tempAt = new Vector3(g_at.elements);
        
        let d = this.tempAt.sub(this.tempEye);
        let viewDir = new Vector3(d.elements);
        d.normalize();
        
        let right = Vector3.cross(d, g_up);
        right.normalize();
        
        let newEye = new Vector3([
            this.tempEye.elements[0] + right.elements[0] * 0.5,
            this.tempEye.elements[1],
            this.tempEye.elements[2] + right.elements[2] * 0.5
        ]);
        
        g_eye = newEye;
        g_at = new Vector3([
            newEye.elements[0] + viewDir.elements[0],
            newEye.elements[1] + viewDir.elements[1],
            newEye.elements[2] + viewDir.elements[2]
        ]);
        
        renderAllShapes();
    }
    
    lookLeft() {
        let d = g_at;
        d = d.sub(g_eye);
        
        let angle = 0.5; 
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(angle * (180/Math.PI), g_up.elements[0], g_up.elements[1], g_up.elements[2]);
        
        let rotatedDir = rotationMatrix.multiplyVector3(d);
        
        g_at = new Vector3([
            g_eye.elements[0] + rotatedDir.elements[0],
            g_eye.elements[1] + rotatedDir.elements[1],
            g_eye.elements[2] + rotatedDir.elements[2]
        ]);
        
        renderAllShapes();
    }
    
    lookRight() {
    
        let d = g_at;
        d = d.sub(g_eye);
        
        let angle = -0.5; 
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(angle * (180/Math.PI), g_up.elements[0], g_up.elements[1], g_up.elements[2]);
        
        let rotatedDir = rotationMatrix.multiplyVector3(d);
        
        g_at = new Vector3([
            g_eye.elements[0] + rotatedDir.elements[0],
            g_eye.elements[1] + rotatedDir.elements[1],
            g_eye.elements[2] + rotatedDir.elements[2]
        ]);
        
        renderAllShapes();
    }
    
    moveUp() {
        let upVec = new Vector3([0, 1, 0]);
        upVec.normalize();
        
        upVec = new Vector3([
            upVec.elements[0] * 0.5,
            upVec.elements[1] * 0.5,
            upVec.elements[2] * 0.5
        ]);
        
        g_eye = g_eye.add(upVec);
        g_at = g_at.add(upVec);
        
        renderAllShapes();
    }
    moveDown() {
        let downVec = new Vector3([0, -1, 0]);
        downVec.normalize();
        
        downVec = new Vector3([
            downVec.elements[0] * 0.5,
            downVec.elements[1] * 0.5,
            downVec.elements[2] * 0.5
        ]);
        
        g_eye = g_eye.add(downVec);
        g_at = g_at.add(downVec);
        
        renderAllShapes();
    }

    moveDown() {
        let upVec = new Vector3([0, 1, 0]);
        upVec.normalize();
        
        upVec = new Vector3([
            upVec.elements[0] * 0.5,
            upVec.elements[1] * 0.5,
            upVec.elements[2] * 0.5
        ]);
        
        g_eye = g_eye.sub(upVec);
        g_at = g_at.sub(upVec);
        
        renderAllShapes();
    }

    mouseMoveHandler(deltaX, deltaY) {
        // Get current view direction
        let d = g_at;
        d = d.sub(g_eye);
        
        // Create rotation  matrices
        let angleX = -deltaX * 0.005; 
        let angleY = -deltaY * 0.005; 
        
        let rotationMatrixX = new Matrix4();
        rotationMatrixX.setRotate(angleX * (180/Math.PI), g_up.elements[0], g_up.elements[1], g_up.elements[2]);
        
        let right = Vector3.cross(d, g_up);
        right.normalize();
        
        let rotationMatrixY = new Matrix4();
        rotationMatrixY.setRotate(angleY * (180/Math.PI), right.elements[0], right.elements[1], right.elements[2]);
        
        let rotatedDir = rotationMatrixX.multiplyVector3(d);
        rotatedDir = rotationMatrixY.multiplyVector3(rotatedDir);
        
        g_at = new Vector3([
            g_eye.elements[0] + rotatedDir.elements[0],
            g_eye.elements[1] + rotatedDir.elements[1],
            g_eye.elements[2] + rotatedDir.elements[2]
        ]);
        
        renderAllShapes();
    }

    lookDown() {
        let d = g_at;
        d = d.sub(g_eye);
        
        let right = Vector3.cross(d, g_up);
        right.normalize();
        
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(2, right.elements[0], right.elements[1], right.elements[2]);
        
        let rotatedDir = rotationMatrix.multiplyVector3(d);
        
        g_at = new Vector3([
            g_eye.elements[0] + rotatedDir.elements[0],
            g_eye.elements[1] + rotatedDir.elements[1],
            g_eye.elements[2] + rotatedDir.elements[2]
        ]);
        
        renderAllShapes();
    }

    lookUp() {
        let d = g_at;
        d = d.sub(g_eye);
        
        let right = Vector3.cross(d, g_up);
        right.normalize();
        
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(-2, right.elements[0], right.elements[1], right.elements[2]);
        
        let rotatedDir = rotationMatrix.multiplyVector3(d);
        
        g_at = new Vector3([
            g_eye.elements[0] + rotatedDir.elements[0],
            g_eye.elements[1] + rotatedDir.elements[1],
            g_eye.elements[2] + rotatedDir.elements[2]
        ]);
        
        renderAllShapes();
    }
    

}
function addMouseControls() {
    window.addEventListener("keydown", (event) => {
        switch(event.key.toLowerCase()) {
            case 'w':
                g_camera.moveForward();
                break;
            case 's':
                g_camera.moveBackward();
                break;
            case 'a':
                g_camera.moveLeft();
                break;
            case 'd':
                g_camera.moveRight();
                break;
            case 'q':
                g_camera.mouseMoveHandler(-5, 0); 
                break;
            case 'e':
                g_camera.mouseMoveHandler(5, 0);  
                break;
            case 'z':
                g_camera.lookDown();    
                break;
            case 'c':
                g_camera.lookUp();      
                break;
            case ' ':  // or whatever key you want to use
                g_camera.moveUp();
                break;
            case 'shift':
                g_camera.moveDown();
                break;
        }
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isDragging) {
            let deltaX = event.clientX - previousMouseX;
            let deltaY = event.clientY - previousMouseY;
            
            // Only process movement if there's significant change
            if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
                g_camera.mouseMoveHandler(deltaX, deltaY);
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        }
    });

    canvas.addEventListener("mousedown", (event) => {
        isDragging = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    });

    canvas.addEventListener("mouseup", () => isDragging = false);
    window.addEventListener("mouseup", () => isDragging = false);
}
  
function hsvToRgb(h, s, v) {
    let c = v * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = v - c;
    let r, g, b;
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    return [r + m, g + m, b + m];
  }
  
  function addActionsForHtmlUI() {
      document.getElementById('normalOn').onclick = function() {g_normalOn = true; renderAllShapes();}
      document.getElementById('normalOff').onclick = function() {g_normalOn = false; renderAllShapes();}
      document.getElementById('animateOn').onclick = function() {g_animate = true;}
      document.getElementById('animateOff').onclick = function() {g_animate = false;}
      document.getElementById('lightOn').onclick = function() {g_lightOn = true;}
      document.getElementById('lightOff').onclick = function() {g_lightOn = false;}
      document.getElementById('spotlightOn').onclick = function() {g_spotLightOn = true;}
      document.getElementById('spotlightOff').onclick = function() {g_spotLightOn = false;}
      document.getElementById('lightSlideX').addEventListener('mousemove', function(ev) { if (ev.buttons==1) { g_lightPos[0] = ev.target.value/100; renderAllShapes();} } );
      document.getElementById('lightSlideY').addEventListener('mousemove', function(ev) { if (ev.buttons==1) { g_lightPos[1] = ev.target.value/100; renderAllShapes();} } );
      document.getElementById('lightSlideZ').addEventListener('mousemove', function(ev) { if (ev.buttons==1) { g_lightPos[2] = ev.target.value/100; renderAllShapes();} } );
      document.getElementById('lightColorHue').addEventListener('mousemove', function (ev) {
        if (ev.buttons == 1) {
          let hue = parseFloat(this.value);
          let rgb;
          if (hue === 0) {
            // When hue is 0, set to white.
            g_lightColor = [1.0, 1.0, 1.0];
            rgb = [255, 255, 255];
          } else {
            g_lightColor = hsvToRgb(hue, 1, 1);
            // Convert each channel from [0,1] to [0,255]
            rgb = g_lightColor.map(c => Math.floor(c * 255));
          }
          // Update the preview box background color
        }
      });

      document.getElementById('spotSlideX').addEventListener('mousemove', function (ev) {
        if (ev.buttons == 1) { g_spotLightPos[0] = this.value / 100; g_spotLightDir[0] = this.value / 10000; }
      });
      document.getElementById('spotSlideY').addEventListener('mousemove', function (ev) {
        if (ev.buttons == 1) { g_spotLightPos[1] = this.value / 100; }
      });
      document.getElementById('spotSlideZ').addEventListener('mousemove', function (ev) {
        if (ev.buttons == 1) { g_spotLightPos[2] = this.value / 100; g_spotLightDir[2] = this.value / 10000; }
      });

      
    // document.getElementById('GFRT').addEventListener('mousemove', function() { g_front_right_thigh_angle = this.value; renderAllShapes();} );
    // document.getElementById('GFRC').addEventListener('mousemove', function() { g_front_right_calf_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GFLT').addEventListener('mousemove', function() { g_front_left_thigh_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GFLC').addEventListener('mousemove', function() { g_front_left_calf_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GBRT').addEventListener('mousemove', function() { g_back_right_thigh_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GBRC').addEventListener('mousemove', function() { g_back_right_calf_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GBLT').addEventListener('mousemove', function() { g_back_left_thigh_angle = this.value; renderAllShapes(); } );
    // document.getElementById('GBLC').addEventListener('mousemove', function() { g_back_left_calf_angle = this.value; renderAllShapes(); } );
  
  
    //document.getElementById('angleSlider').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes(); } );
    
  }