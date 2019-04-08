class Terrain {
  constructor(gridX, gridZ) {
    this.SIZE = 100;
    this.VERTEX_COUNT = 16;
    this.x = gridX * this.SIZE;
    this.z = gridZ * this.SIZE;
    var rawModel = this.generateTerrain(gridX, gridZ);
    this.vertices = rawModel[0];
    this.indices = rawModel[1];
    this.textureCoords = rawModel[2];
    this.normals = rawModel[3];
  }

  generateTerrain(gridX, gridZ) {

    var vertices = [];
    var normals = [];
    var textureCoords = [];
    var indices = [];
    var vertexPointer = 0;
    for (let i = 0; i < this.VERTEX_COUNT; i++) {
      for (let j = 0; j < this.VERTEX_COUNT; j++) {
        vertices[vertexPointer * 3] = j / (this.VERTEX_COUNT - 1) * this.SIZE;
        vertices[vertexPointer * 3 + 1] = 0;
        vertices[vertexPointer * 3 + 2] = i / (this.VERTEX_COUNT - 1) * this.SIZE;
        normals[vertexPointer * 3] = 0;
        normals[vertexPointer * 3 + 1] = 1;
        normals[vertexPointer * 3 + 2] = 0;
        textureCoords[vertexPointer * 2] = j / (this.VERTEX_COUNT - 1);
        textureCoords[vertexPointer * 2 + 1] = i / (this.VERTEX_COUNT - 1);
        vertexPointer++;
      }
    }
    for (let gz = 0; gz < this.VERTEX_COUNT - 1; gz++) {
      for (let gx = 0; gx < this.VERTEX_COUNT - 1; gx++) {
        let topLeft = (gz * this.VERTEX_COUNT) + gx;
        let topRight = topLeft + 1;
        let bottomLeft = ((gz + 1) * this.VERTEX_COUNT) + gx;
        let bottomRight = bottomLeft + 1;
        indices.push(topLeft);
        indices.push(bottomLeft);
        indices.push(topRight);
        indices.push(topRight);
        indices.push(bottomLeft);
        indices.push(bottomRight);
      }
    }
    return [vertices, indices, textureCoords, normals];
  }

  render(gl, program, viewMatrix, projectionMatrix) {

    gl.useProgram(program);

    let positionAttribLocation = gl.getAttribLocation(program, 'vPosition');
    let texCoordAttribLocation = gl.getAttribLocation(program, 'vTexCoord');
    let normalAttribLocation = gl.getAttribLocation(program, 'vNormal');

    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    this.tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);

    this.iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

    this.nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
    gl.vertexAttribPointer(
      texCoordAttribLocation, // Attribute location
      2, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(texCoordAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    gl.vertexAttribPointer(
      normalAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.TRUE, // Normalized
      3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(normalAttribLocation);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelMatrix'), gl.FALSE, flatten(this.createTranformationMatrix()));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'viewMatrix'), gl.FALSE, flatten(viewMatrix));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), gl.FALSE, flatten(projectionMatrix));

    gl.uniform3f(gl.getUniformLocation(program, 'ambientColor'), 0.3, 0.3, 0.3);
    gl.uniform3f(gl.getUniformLocation(program, 'sun.color'), 1.0, 1.0, 1.0);
    gl.uniform3f(gl.getUniformLocation(program, 'sun.direction'), 1.0, 1.0, 1.0);

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  createTranformationMatrix() {
    let matrix = mat4();
    matrix = mult(matrix, translate(this.x, -2, this.z));
    return matrix;
  }
}