var radius = 1350;
var azimuth = Math.PI / 2;
var pole = Math.PI / 4;

window.onload = function () {
  var canvas = document.getElementById('render-surface');
  canvas.width = screen.width * 47 / 48;
  canvas.style.width = "1880"; // set the display size.
  canvas.style.height = "720px"
  var gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('Using experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }
  if (!gl) {
    alert('Your browser doesn\'t support WEBGL');
  }

  var currentTexture = 3;
  var boxTexture = texture(gl, 'crate');
  var boxTexture2 = texture(gl, 'crate2');
  var rays = texture(gl, 'rays');
  var rainbowTexture = texture(gl, 'rainbow');
  var rainbowTexture2 = texture(gl, 'rainbow2');
  var metal = texture(gl, 'metal');
  var doga = texture(gl, 'doga');
  var simge = texture(gl, 'simge');
  var grass = texture(gl, 'grass');

  gl.bindTexture(gl.TEXTURE_2D, rays);
  gl.activeTexture(gl.TEXTURE0);

  document.getElementById('textureChangeButton').onclick = function () {
    currentTexture++;
    currentTexture %= 8;
  };

  document.onkeydown = function (event) {
    switch (event.keyCode) {
    case 38:
      //console.log('UP');
      event.preventDefault();
      radius -= 50;
      if (radius < 1000) {
        radius = 1000;
      }
      break;
    case 40:
      //console.log('DOWN');
      event.preventDefault();
      radius += 50;
      if (radius > 2950) {
        radius = 2950;
      }
      break;
    case 87:
      //console.log('W');
      pole += Math.PI / 18;
      if (pole > 2.8797932657906427) {
        pole = 2.8797932657906427;
      }
      break;
    case 65:
      //console.log('A');
      azimuth -= Math.PI / 18;
      if (azimuth <= 0) {
        azimuth = 9.43689570931383e-16;
      }
      break;
    case 83:
      //console.log('S');
      pole -= Math.PI / 18;
      if (pole < 0.26179938779914935) {
        pole = 0.26179938779914935;
      }
      break;
    case 68:
      //console.log('D');
      azimuth += Math.PI / 18;
      if (azimuth > Math.PI) {
        azimuth = Math.PI;
      }
      break;
    }
  };

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0.1, 0.4, 0.15, 1.0);

  var program = initShaders(gl, 'vertexShader', 'fragmentShader');
  gl.useProgram(program);

  var terrainProgram = initShaders(gl, 'terrain-vertexShader', 'terrain-fragmentShader');

  var viewMatrix;
  var projectionMatrix = perspective(radians(110), canvas.width / canvas.height, 1, 5000.0);

  var insect = new Insect(100, 50);
  insect.getThorax().scale = 2;
  insect.getThorax().setRotZ(270);

  var terrains = [];
  terrains.push(new Terrain(-1, -2));
  terrains.push(new Terrain(-1, -1));
  terrains.push(new Terrain(-1, 0));
  terrains.push(new Terrain(-1, 1));
  terrains.push(new Terrain(-1, 2));

  terrains.push(new Terrain(0, -2));
  terrains.push(new Terrain(0, -1));
  terrains.push(new Terrain(0, 0));
  terrains.push(new Terrain(0, 1));
  terrains.push(new Terrain(0, 2));

  terrains.push(new Terrain(1, -2));
  terrains.push(new Terrain(1, -1));
  terrains.push(new Terrain(1, 0));
  terrains.push(new Terrain(1, 1));
  terrains.push(new Terrain(1, 2));

  terrains.push(new Terrain(2, -2));
  terrains.push(new Terrain(2, -1));
  terrains.push(new Terrain(2, 0));
  terrains.push(new Terrain(2, 1));
  terrains.push(new Terrain(2, 2));

  assignListenersToSliders(insect);

  var sliders = [document.getElementById('translateThoraxXSlider'),
    document.getElementById('translateThoraxYSlider'),
    document.getElementById('translateThoraxZSlider'),
    document.getElementById('rotateThoraxXSlider'),
    document.getElementById('rotateThoraxYSlider'),
    document.getElementById('rotateThoraxZSlider'),
    document.getElementById('rotateHeadXSlider'),
    document.getElementById('rotateHeadZSlider'),
    document.getElementById('rotateAbdomenXSlider'),
    document.getElementById('rotateAbdomenZSlider'),
    document.getElementById('rotateHeadUpperLeg1XSlider'),
    document.getElementById('rotateHeadUpperLeg1YSlider'),
    document.getElementById('rotateHeadLowerLeg1YSlider'),
    document.getElementById('rotateThoraxUpperLeg1XSlider'),
    document.getElementById('rotateThoraxUpperLeg1YSlider'),
    document.getElementById('rotateThoraxLowerLeg1YSlider'),
    document.getElementById('rotateAbdomenUpperLeg1XSlider'),
    document.getElementById('rotateAbdomenUpperLeg1YSlider'),
    document.getElementById('rotateAbdomenLowerLeg1YSlider'),
    document.getElementById('rotateHeadUpperLeg2XSlider'),
    document.getElementById('rotateHeadUpperLeg2YSlider'),
    document.getElementById('rotateHeadLowerLeg2YSlider'),
    document.getElementById('rotateThoraxUpperLeg2XSlider'),
    document.getElementById('rotateThoraxUpperLeg2YSlider'),
    document.getElementById('rotateThoraxLowerLeg2YSlider'),
    document.getElementById('rotateAbdomenUpperLeg2XSlider'),
    document.getElementById('rotateAbdomenUpperLeg2YSlider'),
    document.getElementById('rotateAbdomenLowerLeg2YSlider')
  ];

  var animData = [];
  document.getElementById('saveStateButton').onclick = function () {
    var text = '';

    for (var i = 0; i < sliders.length; i++) {
      text += sliders[i].value + ' ';
    }
    animData.push(text);
  };

  document.getElementById('finishAnimButton').onclick = function () {
    var filename = document.getElementById('fileNameInput').value + '.txt';
    var text = '';
    for (var i = 0; i < animData.length - 1; i++) {
      text += animData[i] + '\r\n';
    }
    text += animData[animData.length - 1];
    animData = [];
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  document.getElementById('loadAnimButton').onchange = function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var lines = this.result.split(/[\r\n]+/g);
      var interpolationInterval = document.getElementById('interpolationInput').value;
      var playbackSpeed = document.getElementById('playbackInput').value;
      var interpolated = interpolate(lines, parseFloat(interpolationInterval));
      animate(insect, interpolated, 0, playbackSpeed);
    };
    reader.readAsText(file);
  };

  var render = function () {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    viewMatrix = createViewMatrix();
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
      break;
    case 7:
      gl.bindTexture(gl.TEXTURE_2D, simge);
      break;
    }
    gl.activeTexture(gl.TEXTURE0);
    insect.render(gl, program, viewMatrix, projectionMatrix);
    gl.bindTexture(gl.TEXTURE_2D, grass);
    gl.activeTexture(gl.TEXTURE0);
    for (let i = 0; i < terrains.length; i++) {
      terrains[i].render(gl, terrainProgram, viewMatrix, projectionMatrix);
    }
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

function createViewMatrix() {
  return lookAt(vec3(radius * Math.cos(azimuth) * Math.sin(pole) + 100, radius * Math.sin(azimuth) * Math.sin(pole), radius * Math.cos(pole) + 50), vec3(100, 0, 50), vec3(0, 0, -1));
}

function interpolate(lines, interval) {
  var interpolated = [];
  for (let i = 0; i < lines.length - 1; i++) {
    var interframe = [];
    var first = lines[i].split(' ').map(parseFloat);
    var second = lines[i + 1].split(' ').map(parseFloat);
    for (let j = 0; j < 1; j += interval) {
      for (let k = 0; k < first.length; k++) {
        interframe[k] = (second[k] * j + first[k] * (1 - j));
      }
      interpolated.push(interframe);
      interframe = [];
    }
  }
  return interpolated;
}

function animate(insect, lines, i, playbackSpeed) {
  frameValues = lines[i % lines.length];
  insect.getThorax().setTranslationX(frameValues[0] + 100);
  insect.getThorax().setTranslationY(frameValues[1]);
  insect.getThorax().setTranslationZ(frameValues[2] + 50);
  insect.getThorax().setRotX(frameValues[3]);
  insect.getThorax().setRotY(frameValues[4]);
  insect.getThorax().setRotZ(frameValues[5]);
  insect.getHead().setRotX(frameValues[6]);
  insect.getHead().setRotZ(frameValues[7]);
  insect.getAbdomen().setRotX(frameValues[8]);
  insect.getAbdomen().setRotZ(frameValues[9]);
  insect.getHeadUpperLeg1().setRotX(frameValues[10]);
  insect.getHeadUpperLeg1().setRotY(frameValues[11]);
  insect.getHeadLowerLeg1().setRotY(frameValues[12]);
  insect.getThoraxUpperLeg1().setRotX(frameValues[13]);
  insect.getThoraxUpperLeg1().setRotY(frameValues[14]);
  insect.getThoraxLowerLeg1().setRotY(frameValues[15]);
  insect.getAbdomenUpperLeg1().setRotX(frameValues[16]);
  insect.getAbdomenUpperLeg1().setRotY(frameValues[17]);
  insect.getAbdomenLowerLeg1().setRotY(frameValues[18]);
  insect.getHeadUpperLeg2().setRotX(frameValues[19]);
  insect.getHeadUpperLeg2().setRotY(frameValues[20]);
  insect.getHeadLowerLeg2().setRotY(frameValues[21]);
  insect.getThoraxUpperLeg2().setRotX(frameValues[22]);
  insect.getThoraxUpperLeg2().setRotY(frameValues[23]);
  insect.getThoraxLowerLeg2().setRotY(frameValues[24]);
  insect.getAbdomenUpperLeg2().setRotX(frameValues[25]);
  insect.getAbdomenUpperLeg2().setRotY(frameValues[26]);
  insect.getAbdomenLowerLeg2().setRotY(frameValues[27]);
  setTimeout(animate, playbackSpeed, insect, lines, i + 1, playbackSpeed);
}

function texture(gl, name) {
  var ext = gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
  if (!ext) {
    ext = gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  }

  if (!ext) {
    alert('Anisopropic filtering not supported by your browser');
  }

  var image = document.getElementById(name);
  var t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  if (ext) {
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 8);
  }
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE,
    image
  );
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Yes, it's a power of 2. Generate mips.
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // No, it's not a power of 2. Turn of mips and set
    // wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);

  return t;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function assignListenersToSliders(insect) {
  document.getElementById('translateThoraxXSlider').oninput = function () {
    insect.getThorax().setTranslationX(parseInt(event.srcElement.value) + 100);
  }
  document.getElementById('translateThoraxYSlider').oninput = function () {
    insect.getThorax().setTranslationY(parseInt(event.srcElement.value) * 2);
  }
  document.getElementById('translateThoraxZSlider').oninput = function () {
    insect.getThorax().setTranslationZ(parseInt(event.srcElement.value) + 50);
  }
  document.getElementById('rotateThoraxXSlider').oninput = function () {
    insect.getThorax().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateThoraxYSlider').oninput = function () {
    insect.getThorax().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateThoraxZSlider').oninput = function () {
    insect.getThorax().setRotZ(event.srcElement.value);
  }
  document.getElementById('rotateHeadXSlider').oninput = function () {
    insect.getHead().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateHeadZSlider').oninput = function () {
    insect.getHead().setRotZ(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenXSlider').oninput = function () {
    insect.getAbdomen().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenZSlider').oninput = function () {
    insect.getAbdomen().setRotZ(event.srcElement.value);
  }
  document.getElementById('rotateHeadUpperLeg1XSlider').oninput = function () {
    insect.getHeadUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateHeadUpperLeg1YSlider').oninput = function () {
    insect.getHeadUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateHeadLowerLeg1YSlider').oninput = function () {
    insect.getHeadLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateThoraxUpperLeg1XSlider').oninput = function () {
    insect.getThoraxUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateThoraxUpperLeg1YSlider').oninput = function () {
    insect.getThoraxUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateThoraxLowerLeg1YSlider').oninput = function () {
    insect.getThoraxLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenUpperLeg1XSlider').oninput = function () {
    insect.getAbdomenUpperLeg1().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenUpperLeg1YSlider').oninput = function () {
    insect.getAbdomenUpperLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenLowerLeg1YSlider').oninput = function () {
    insect.getAbdomenLowerLeg1().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateHeadUpperLeg2XSlider').oninput = function () {
    insect.getHeadUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateHeadUpperLeg2YSlider').oninput = function () {
    insect.getHeadUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateHeadLowerLeg2YSlider').oninput = function () {
    insect.getHeadLowerLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateThoraxUpperLeg2XSlider').oninput = function () {
    insect.getThoraxUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateThoraxUpperLeg2YSlider').oninput = function () {
    insect.getThoraxUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateThoraxLowerLeg2YSlider').oninput = function () {
    insect.getThoraxLowerLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenUpperLeg2XSlider').oninput = function () {
    insect.getAbdomenUpperLeg2().setRotX(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenUpperLeg2YSlider').oninput = function () {
    insect.getAbdomenUpperLeg2().setRotY(event.srcElement.value);
  }
  document.getElementById('rotateAbdomenLowerLeg2YSlider').oninput = function () {
    insect.getAbdomenLowerLeg2().setRotY(event.srcElement.value);
  }
}