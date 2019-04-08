var boxVertices = [
  // Top
  -1.0, 1.0, -1.0,
  -1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, -1.0,
  // Left
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  // Right
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  // Front
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0,
  -1.0, 1.0, 1.0,
  // Back
  1.0, 1.0, -1.0,
  1.0, -1.0, -1.0,
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  // Bottom
  -1.0, -1.0, -1.0,
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
];

var boxTexCoords = [
  0, 0,
  0, 1,
  1, 1,
  1, 0,
  0, 0,
  1, 0,
  1, 1,
  0, 1,
  1, 1,
  0, 1,
  0, 0,
  1, 0,
  1, 1,
  1, 0,
  0, 0,
  0, 1,
  0, 0,
  0, 1,
  1, 1,
  1, 0,
  1, 1,
  1, 0,
  0, 0,
  0, 1,
];

var boxIndices = [
  // Top
  0, 1, 2,
  0, 2, 3,
  // Left
  5, 4, 6,
  6, 4, 7,
  // Right
  8, 9, 10,
  8, 10, 11,
  // Front
  13, 12, 14,
  15, 14, 12,
  // Back
  16, 17, 18,
  16, 18, 19,
  // Bottom
  21, 20, 22,
  22, 20, 23
];

var boxNormals = [
  // Top face
  0, 1.0, 0,
  0, 1.0, 0,
  0, 1.0, 0,
  0, 1.0, 0,
  // Left face
  -1.0, 0, 0,
  -1.0, 0, 0,
  -1.0, 0, 0,
  -1.0, 0, 0,
  // Right face
  1.0, 0, 0,
  1.0, 0, 0,
  1.0, 0, 0,
  1.0, 0, 0,
  // Front face
  0, 0, 1.0,
  0, 0, 1.0,
  0, 0, 1.0,
  0, 0, 1.0,
  // Back face
  0, 0, -1.0,
  0, 0, -1.0,
  0, 0, -1.0,
  0, 0, -1.0,
  // Bottom face
  0, -1.0, 0,
  0, -1.0, 0,
  0, -1.0, 0,
  0, -1.0, 0,
];

function Cube(modifierX, modifierY, modifierZ) {
  let returnArr = [boxVertices, boxIndices, boxTexCoords, boxNormals];
  if (modifierX != 1 || modifierY != 1 || modifierZ != 1) {
    let distortedArray = boxVertices.slice();
    for (var i = 0; i < distortedArray.length / 3; i++) {
      distortedArray[i * 3] *= modifierX;
      distortedArray[i * 3 + 1] *= modifierY;
      distortedArray[i * 3 + 2] *= modifierZ;
    }
    returnArr[0] = distortedArray;
  }
  return returnArr;
};