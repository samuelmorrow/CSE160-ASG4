function initTextures() {
    var sky = new Image();
    var grass = new Image();
    var brick = new Image();
    sky.onload = function() { 
        loadTexture(sky, 0); 
        renderAllShapes();
    };
    
    grass.onload = function() { 
        loadTexture(grass, 1); 
        renderAllShapes();
    };

    brick.onload = function() {
        loadTexture(brick, 2);
        renderAllShapes();
    };
    
    sky.src = 'sky.jpg';
    grass.src = 'grass.jpg';
    brick.src = 'brick.jpg';

    return true;
}

function loadTexture(image, textureNum) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return;
    }

    // Activate the proper texture unit
    gl.activeTexture(gl.TEXTURE0 + textureNum);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Remove the flip
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    
    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    // Load the image data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    
    // Set the texture unit
    if (textureNum === 0) {
        gl.uniform1i(u_Sampler0, 0);
    } else if (textureNum === 1) {
        gl.uniform1i(u_Sampler1, 1);
    } else if (textureNum === 2) {
        gl.uniform1i(u_Sampler2, 2);
    } else if (textureNum === 3) {
        gl.uniform1i(u_Normal, 3);
    }
}

  
  