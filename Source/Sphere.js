var NUM_WIDTH_PTS = 64;
var NUM_HEIGHT_PTS = 64;

function Sphere(modifier) {
  let WIDTH_DIVISIONS = NUM_WIDTH_PTS - 1;
  let HEIGHT_DIVISIONS = NUM_HEIGHT_PTS - 1;

  let numberOfPositions = NUM_WIDTH_PTS * NUM_HEIGHT_PTS;

  let positions = new Float32Array(3 * numberOfPositions);
  let texCoords = new Float32Array(2 * numberOfPositions);
  let indices = new Uint16Array(6 * (WIDTH_DIVISIONS * HEIGHT_DIVISIONS));

  let positionsIndex = 0;
  let texCoordsIndex = 0;
  let indicesIndex = 0;
  let length;

  for (let j = 0; j < NUM_HEIGHT_PTS; ++j) {
    let inclination = Math.PI * (j / HEIGHT_DIVISIONS);
    for (let i = 0; i < NUM_WIDTH_PTS; ++i) {
      let azimuth = 2 * Math.PI * (i / WIDTH_DIVISIONS);
      positions[positionsIndex++] = Math.sin(inclination) * Math.cos(azimuth) * modifier;
      positions[positionsIndex++] = Math.cos(inclination);
      positions[positionsIndex++] = Math.sin(inclination) * Math.sin(azimuth) * modifier;
      texCoords[texCoordsIndex++] = i / WIDTH_DIVISIONS;
      texCoords[texCoordsIndex++] = j / HEIGHT_DIVISIONS;
    }
  }

  for (let j = 0; j < HEIGHT_DIVISIONS; ++j) {
    let index = j * NUM_WIDTH_PTS;
    for (let i = 0; i < WIDTH_DIVISIONS; ++i) {
      indices[indicesIndex++] = index + i;
      indices[indicesIndex++] = index + i + 1;
      indices[indicesIndex++] = index + i + NUM_WIDTH_PTS;
      indices[indicesIndex++] = index + i + NUM_WIDTH_PTS;
      indices[indicesIndex++] = index + i + 1;
      indices[indicesIndex++] = index + i + NUM_WIDTH_PTS + 1;
    }
  }

  return [positions, indices, texCoords, positions];
};