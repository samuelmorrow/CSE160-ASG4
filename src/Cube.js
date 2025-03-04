class Cube{
    constructor() {
        this.type='cube';
        //this.position=[0.0,0.0,0.0];
        this.color=[1.0,1.0,1.0,1.0];
        //this.size=5.0;
        //this.segments=3;
        this.matrix = new Matrix4();
        this.normalMatrix = new Matrix4();
        this.textureNum=-2;
        this.vertices = new Float32Array([
            0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0, 
            0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0,
        ]);
        this.verts = [
            // Front face
            0, 0, 0, 1, 1, 0, 1, 0, 0,
            0, 0, 0, 0, 1, 0, 1, 1, 0,

            // Top face
            0, 1, 0, 0, 1, 1, 1, 1, 1,
            0, 1, 0, 1, 1, 1, 1, 1, 0,

            // Right face
            1, 0, 0, 1, 1, 1, 1, 1, 0,
            1, 0, 0, 1, 1, 1, 1, 0, 1,

            // Left face
            0, 0, 0, 0, 1, 1, 0, 1, 0,
            0, 0, 0, 0, 1, 1, 0, 0, 1,

            // Bottom face
            0, 0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 1, 0, 1, 1, 0, 0,

            // Back face
            0, 0, 1, 1, 1, 1, 1, 0, 1,
            0, 0, 1, 0, 1, 1, 1, 1, 1
        ];

        this.uvs = [
            // Front face
            0, 0, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1,

            // Top face
            0, 0, 0, 1, 1, 1,
            0, 0, 1, 1, 1, 0,

            // Right face
            0, 0, 1, 1, 0, 1,
            0, 0, 1, 0, 1, 1,

            // Left face
            1, 0, 0, 1, 1, 1,
            1, 0, 0, 0, 0, 1,

            // Bottom face
            0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 1, 1,

            // Back face
            1, 0, 0, 1, 0, 0,
            1, 0, 1, 1, 0, 1
        ];
        this.normals = [
            // Front face
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            // Top face
            0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0, 0, 1, 0,
            // Right face
            1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0,
            // Left face
            -1, 0, 0, -1, 0, 0, -1, 0, 0,
            -1, 0, 0, -1, 0, 0, -1, 0, 0,
            // Bottom face
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            // Back face
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1, 0, 0, 1
        ];
    }
    initBuffer() {
        if (this.buffer === null) {
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        }
    }
    render() {
        //var xy = this.position;
        
        this.initBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        //var size = this.size;
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        // Front face
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0],
            [0.0, 0.0,  1.0, 1.0,  1.0, 0.0],
            [0,0,-1, 0,0,-1, 0,0,-1]
        );
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0],
            [0.0, 0.0,  0.0, 1.0,  1.0, 1.0],
            [0,0,-1, 0,0,-1, 0,0,-1]
        );

        // Top face
        drawTriangle3DUVNormal(
            [0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0],
            [0.0, 0.0,  1.0, 0.0,  1.0, 1.0],
            [0,1,0, 0,1,0, 0,1,0]
        );
        drawTriangle3DUVNormal(
            [0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0],
            [0.0, 0.0,  0.0, 1.0,  1.0, 0.0],
            [0,1,0, 0,1,0, 0,1,0]
        );

        // Right face
        drawTriangle3DUVNormal(
            [1.0, 0.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0],
            [0.0, 0.0,  1.0, 1.0,  0.0, 1.0],
            [1,0,0, 1,0,0, 1,0,0]
        );
        drawTriangle3DUVNormal(
            [1.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 1.0, 1.0],
            [0.0, 0.0,  1.0, 0.0,  1.0, 1.0],
            [1,0,0, 1,0,0, 1,0,0]
        );

        // Left face
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0],
            [1.0, 0.0,  0.0, 1.0,  1.0, 1.0],
            [-1,0,0, -1,0,0, -1,0,0]
        );
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  0.0, 1.0, 1.0],
            [1.0, 0.0,  0.0, 0.0,  0.0, 1.0],
            [-1,0,0, -1,0,0, -1,0,0]
        );

        // Bottom face
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 0.0, 0.0],
            [0.0, 1.0,  1.0, 1.0,  1.0, 0.0],
            [0,-1,0, 0,-1,0, 0,-1,0]
        );
        drawTriangle3DUVNormal(
            [0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 1.0],
            [0.0, 1.0,  0.0, 0.0,  1.0, 1.0],
            [0,-1,0, 0,-1,0, 0,-1,0]
        );

        // Back face
        drawTriangle3DUVNormal(
            [0.0, 0.0, 1.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0],
            [1.0, 0.0,  0.0, 1.0,  0.0, 0.0],
            [0,0,1, 0,0,1, 0,0,1]
        );
        drawTriangle3DUVNormal(
            [0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0],
            [1.0, 0.0,  1.0, 1.0,  0.0, 1.0],
            [0,0,1, 0,0,1, 0,0,1]
        );

        

        

        

        
    }
        renderfast() {
            var rgba = this.color;
    
            gl.uniform1i(u_whichTexture, this.textureNum);
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
            gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
            var allverts = [];
            var allUVs = [];  // Add UV array
    
            // Front face
            allverts = allverts.concat([0, 0, 0, 1, 1, 0, 1, 0, 0]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
            allverts = allverts.concat([0, 0, 0, 0, 1, 0, 1, 1, 0]);
            allUVs = allUVs.concat([0, 0, 0, 1, 1, 1]);
    
            // Top face
            allverts = allverts.concat([0, 1, 0, 0, 1, 1, 1, 1, 1]);
            allUVs = allUVs.concat([0, 0, 0, 1, 1, 1]);
            allverts = allverts.concat([0, 1, 0, 1, 1, 1, 1, 1, 0]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
    
            // Right face
            allverts = allverts.concat([1, 0, 0, 1, 1, 1, 1, 1, 0]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
            allverts = allverts.concat([1, 0, 0, 1, 1, 1, 1, 0, 1]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
    
            // Left face
            allverts = allverts.concat([0, 0, 0, 0, 1, 1, 0, 1, 0]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
            allverts = allverts.concat([0, 0, 0, 0, 1, 1, 0, 0, 1]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
    
            // Bottom face
            allverts = allverts.concat([0, 0, 0, 0, 0, 1, 1, 0, 1]);
            allUVs = allUVs.concat([0, 0, 0, 1, 1, 1]);
            allverts = allverts.concat([0, 0, 0, 1, 0, 1, 1, 0, 0]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
    
            // Back face
            allverts = allverts.concat([0, 0, 1, 1, 1, 1, 1, 0, 1]);
            allUVs = allUVs.concat([0, 0, 1, 1, 1, 0]);
            allverts = allverts.concat([0, 0, 1, 0, 1, 1, 1, 1, 1]);
            allUVs = allUVs.concat([0, 0, 0, 1, 1, 1]);
    
            drawTriangle3DUVNormal(allverts, allUVs);
        }
    renderfaster() {
        this.initBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        //var size = this.size;
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);
        drawTriangle3DUVNormal(this.verts, this.uvs, this.normals);

    }
        
    
}
function drawCube(M,color) {
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements); 
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

    gl.uniform1i(u_whichTexture, this.textureNum);
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0],
        [0.0, 0.0,  1.0, 1.0,  1.0, 0.0]
    );
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0],
        [0.0, 0.0,  0.0, 1.0,  1.0, 1.0]
    );

    // Back face
    drawTriangle3DUV(
        [0.0, 0.0, 1.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0],
        [1.0, 0.0,  0.0, 1.0,  0.0, 0.0]
    );
    drawTriangle3DUV(
        [0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0],
        [1.0, 0.0,  1.0, 1.0,  0.0, 1.0]
    );

    // Top face
    drawTriangle3DUV(
        [0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0],
        [0.0, 0.0,  1.0, 0.0,  1.0, 1.0]
    );
    drawTriangle3DUV(
        [0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0],
        [0.0, 0.0,  0.0, 1.0,  1.0, 0.0]
    );

    // Bottom face
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 0.0, 0.0],
        [0.0, 0.0,  1.0, 0.0,  1.0, 1.0]
    );
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 1.0],
        [0.0, 0.0,  0.0, 1.0,  1.0, 0.0]
    );

    // Right face
    drawTriangle3DUV(
        [1.0, 0.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0],
        [0.0, 0.0,  1.0, 1.0,  0.0, 1.0]
    );
    drawTriangle3DUV(
        [1.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 1.0, 1.0],
        [0.0, 0.0,  1.0, 0.0,  1.0, 1.0]
    );

    // Left face
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0],
        [1.0, 0.0,  0.0, 1.0,  1.0, 1.0]
    );
    drawTriangle3DUV(
        [0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  0.0, 1.0, 1.0],
        [1.0, 0.0,  0.0, 0.0,  0.0, 1.0]
    );
};
