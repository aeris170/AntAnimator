class BodyPart {
  constructor(position, rotation, scale, vertices, indices, texCoords, normals, parent, normalizingTransformation) {
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.vertices = vertices;
    this.texCoords = texCoords;
    this.indices = indices;
    this.normals = normals;
    this.parent = parent;
    this.normalizingTransformation = normalizingTransformation;
  }

  prepareModel(gl, program, viewMatrix, projectionMatrix) {

    gl.useProgram(program);

    let positionAttribLocation = gl.getAttribLocation(program, 'vPosition');
    let texCoordAttribLocation = gl.getAttribLocation(program, 'vTexCoord');
    let normalAttribLocation = gl.getAttribLocation(program, 'vNormal');

    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    this.tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);

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
  }

  createTranformationMatrix() {
    let matrix;
    if (this.parent) {
      matrix = this.parent.createTranformationMatrix();
    } else {
      matrix = mat4();
    }
    matrix = mult(matrix, translate(this.position[0], this.position[1], this.position[2]));
    matrix = mult(matrix, rotate(this.rotation[0], vec3(1, 0, 0)));
    matrix = mult(matrix, rotate(this.rotation[1], vec3(0, 1, 0)));
    matrix = mult(matrix, rotate(this.rotation[2], vec3(0, 0, 1)));
    matrix = mult(matrix, scale(this.scale, this.scale, this.scale));
    matrix = mult(matrix, translate(this.normalizingTransformation[0], this.normalizingTransformation[1], this.normalizingTransformation[2]));
    return matrix;
  }

  getParent() {
    return this.parent;
  }

  deleteBuffers(gl) {
    //gl.deleteBuffer(this.vBuffer);
    //gl.deleteBuffer(this.iBuffer);
  }

  getIndexCount() {
    return this.indices.length;
  }

  setTranslationX(newX) {
    this.position[0] = newX;
  }

  setTranslationY(newy) {
    this.position[1] = newy;
  }

  setTranslationZ(newZ) {
    this.position[2] = newZ;
  }

  setRotX(angle) {
    this.rotation[0] = angle;
  }

  setRotY(angle) {
    this.rotation[1] = angle;
  }

  setRotZ(angle) {
    this.rotation[2] = angle;
  }
}