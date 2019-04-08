window.onload = function () {
  var canvas = document.getElementById('render-surface');
  var gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Using experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }
  if (!gl) {
    alert('Your browser doesn\'t support WEBGL');
  }

  var currentTexture = 2;
  var boxTexture = texture(gl, 'crate');
  var boxTexture2 = texture(gl, 'crate2');
  var rays = texture(gl, 'rays');
  var rainbowTexture = texture(gl, 'rainbow');
  var rainbowTexture2 = texture(gl, 'rainbow2');
  var metal = texture(gl, 'metal');
  var doga = texture(gl, 'doga');

  gl.bindTexture(gl.TEXTURE_2D, boxTexture2);
  gl.activeTexture(gl.TEXTURE0);

  document.getElementById('textureChangeButton').onclick = function () {
    gl.bindTexture(gl.TEXTURE_2D, null);
    switch (currentTexture) {
    case 0:
      gl.bindTexture(gl.TEXTURE_2D, boxTexture);
      break;
    case 1:
      gl.bindTexture(gl.TEXTURE_2D, boxTexture2);
      break;
    case 2:
      gl.bindTexture(gl.TEXTURE_2D, rays);
      break;
    case 3:
      gl.bindTexture(gl.TEXTURE_2D, rainbowTexture);
      break;
    case 4:
      gl.bindTexture(gl.TEXTURE_2D, rainbowTexture2);
      break;
    case 5:
      gl.bindTexture(gl.TEXTURE_2D, doga);
      break;
    case 6:
      gl.bindTexture(gl.TEXTURE_2D, metal);
      currentTexture = -1;
      break;
    }
    currentTexture++;
    gl.activeTexture(gl.TEXTURE0);
  };

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0.8, 0.8, 0.8, 1.0);

  var program = initShaders(gl, 'vertexShader', 'fragmentShader');
  gl.useProgram(program);

  var viewMatrix = lookAt(vec3(0, 0, 200), vec3(0, 0, -1), vec3(0, 1, 0));
  var projectionMatrix = perspective(radians(110), canvas.width / canvas.height, 0.1, 1000.0);

  var insect = new Insect();

  insect.rotateThorax(vec3(60, 0, 270));

  assignListenersToSliders(insect);

  var render = function () {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    insect.render(gl, program, viewMatrix, projectionMatrix);
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

function texture(gl, name) {
  var ext = gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
  if (!ext) {
    ext = gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  }

  if (!ext) {
    alert('Anisopropic filtering not supported by your browser');
  }

  var t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 8);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById(name)
  );
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return t;
}

function assignListenersToSliders(insect) {
  document.getElementById("translateThoraxXSlider").oninput = function () {
    insect.getThorax().setTranslationX(event.srcElement.value);
  }
  document.getElementById("translateThoraxYSlider").oninput = function () {
    insect.getThorax().setTranslationY(event.srcElement.value);
  }
  document.getElementById("translateThoraxZSlider").oninput = function () {
    insect.getThorax().setTranslationZ(event.srcElement.value);
  }
  document.getElementById("rotateThoraxXSlider").oninput = function () {
    insect.getThorax().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateThoraxYSlider").oninput = function () {
    insect.getThorax().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateThoraxZSlider").oninput = function () {
    insect.getThorax().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateHeadXSlider").oninput = function () {
    insect.getHead().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateHeadYSlider").oninput = function () {
    insect.getHead().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateHeadZSlider").oninput = function () {
    insect.getHead().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenXSlider").oninput = function () {
    insect.getAbdomen().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenYSlider").oninput = function () {
    insect.getAbdomen().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenZSlider").oninput = function () {
    insect.getAbdomen().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg1XSlider").oninput = function () {
    insect.getHeadUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg1YSlider").oninput = function () {
    insect.getHeadUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg1ZSlider").oninput = function () {
    insect.getHeadUpperLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg1XSlider").oninput = function () {
    insect.getHeadLowerLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg1YSlider").oninput = function () {
    insect.getHeadLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg1ZSlider").oninput = function () {
    insect.getHeadLowerLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg1XSlider").oninput = function () {
    insect.getThoraxUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg1YSlider").oninput = function () {
    insect.getThoraxUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg1ZSlider").oninput = function () {
    insect.getThoraxUpperLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg1XSlider").oninput = function () {
    insect.getThoraxLowerLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg1YSlider").oninput = function () {
    insect.getThoraxLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg1ZSlider").oninput = function () {
    insect.getThoraxLowerLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg1XSlider").oninput = function () {
    insect.getAbdomenUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg1YSlider").oninput = function () {
    insect.getAbdomenUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg1ZSlider").oninput = function () {
    insect.getAbdomenUpperLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg1XSlider").oninput = function () {
    insect.getAbdomenLowerLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg1YSlider").oninput = function () {
    insect.getAbdomenLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg1ZSlider").oninput = function () {
    insect.getAbdomenLowerLeg1().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg2XSlider").oninput = function () {
    insect.getHeadUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg2YSlider").oninput = function () {
    insect.getHeadUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateHeadUpperLeg2ZSlider").oninput = function () {
    insect.getHeadUpperLeg2().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg2XSlider").oninput = function () {
    insect.getHeadLowerLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg2YSlider").oninput = function () {
    insect.getHeadLowerLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateHeadLowerLeg2ZSlider").oninput = function () {
    insect.getHeadLowerLeg2().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg2XSlider").oninput = function () {
    insect.getThoraxUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg2YSlider").oninput = function () {
    insect.getThoraxUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateThoraxUpperLeg2ZSlider").oninput = function () {
    insect.getThoraxUpperLeg2().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg2XSlider").oninput = function () {
    insect.getThoraxLowerLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg2YSlider").oninput = function () {
    insect.getThoraxLowerLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateThoraxLowerLeg2ZSlider").oninput = function () {
    insect.getThoraxLowerLeg2().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg2XSlider").oninput = function () {
    insect.getAbdomenUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg2YSlider").oninput = function () {
    insect.getAbdomenUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenUpperLeg2ZSlider").oninput = function () {
    insect.getAbdomenUpperLeg2().setRotZ(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg2XSlider").oninput = function () {
    insect.getAbdomenLowerLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg2YSlider").oninput = function () {
    insect.getAbdomenLowerLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById("rotateAbdomenLowerLeg2ZSlider").oninput = function () {
    insect.getAbdomenLowerLeg2().setRotZ(event.srcElement.value);
  }
}