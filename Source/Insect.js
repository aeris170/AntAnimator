class Insect {
  constructor(x, z) {
    let sphereData = Sphere(1);
    let ellipsoidDataForThorax = Sphere(0.6);
    let ellipsoidDataForHeadAndAbdomen = Sphere(0.8);
    let shortRectangularPrismData = Cube(0.5, 0.1, 0.1);
    let longRectangularPrismData = Cube(0.85, 0.1, 0.1);

    this.bodyParts = [];
    //THORAX 0
    this.bodyParts.push(new BodyPart(vec3(x, 0, z), vec3(0, 0, 0), 0.7, ellipsoidDataForThorax[0], ellipsoidDataForThorax[1], ellipsoidDataForThorax[2], ellipsoidDataForThorax[3], null, vec3(0, 0, 0)));
    //HEAD 1
    this.bodyParts.push(new BodyPart(vec3(-0.25, 0.7, 0), vec3(0, 0, 0), 0.6, ellipsoidDataForHeadAndAbdomen[0], ellipsoidDataForHeadAndAbdomen[1], ellipsoidDataForHeadAndAbdomen[2], ellipsoidDataForHeadAndAbdomen[3], this.bodyParts[0], vec3(0, 1, 0)));
    //ABDOMEN 2
    this.bodyParts.push(new BodyPart(vec3(-0.2, -0.7, 0), vec3(0, 0, 0), 0.75, ellipsoidDataForHeadAndAbdomen[0], ellipsoidDataForHeadAndAbdomen[1], ellipsoidDataForHeadAndAbdomen[2], ellipsoidDataForHeadAndAbdomen[3], this.bodyParts[0], vec3(0, -1, 0)));
    //UPPER HEAD LEGS 3 4
    this.bodyParts.push(new BodyPart(vec3(0, 0.35, 0.6), vec3(-30, 60, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(-0.5, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0, 0.35, -0.6), vec3(30, 120, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(0.5, 0, 0)));
    //UPPER MIDDLE LEGS 5 6
    this.bodyParts.push(new BodyPart(vec3(0, 0, 0.6), vec3(0, 60, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(-0.5, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0, 0, -0.6), vec3(0, 120, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(0.5, 0, 0)));
    //UPPER ABDOMEN LEGS 7 8
    this.bodyParts.push(new BodyPart(vec3(0, -0.35, 0.6), vec3(30, 60, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(-0.5, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0, -0.35, -0.6), vec3(-30, 120, 0), 1, shortRectangularPrismData[0], shortRectangularPrismData[1], shortRectangularPrismData[2], shortRectangularPrismData[3], this.bodyParts[0], vec3(0.5, 0, 0)));
    //LOWER HEAD LEGS 9 10
    this.bodyParts.push(new BodyPart(vec3(-0.5, 0, 0), vec3(0, 75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[3], vec3(-0.85, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0.5, 0, 0), vec3(0, -75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[4], vec3(0.85, 0, 0)));
    //LOWER MIDDLE LEGS 11 12
    this.bodyParts.push(new BodyPart(vec3(-0.5, 0, 0), vec3(0, 75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[5], vec3(-0.85, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0.5, 0, 0), vec3(0, -75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[6], vec3(0.85, 0, 0)));
    //LOWER ABDOMEN LEGS 13 14
    this.bodyParts.push(new BodyPart(vec3(-0.5, 0, 0), vec3(0, 75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[7], vec3(-0.85, 0, 0)));
    this.bodyParts.push(new BodyPart(vec3(0.5, 0, 0), vec3(0, -75, 0), 1, longRectangularPrismData[0], longRectangularPrismData[1], longRectangularPrismData[2], longRectangularPrismData[3], this.bodyParts[8], vec3(0.85, 0, 0)));
    //EYES
    //this.bodyParts.push(new BodyPart(vec3(5, 0, 0), vec3(0, 0, 0), 0.2, sphereData[0], sphereData[1], sphereData[2], sphereData[3], this.bodyParts[1], vec3(0, 0, 0)));
    //this.bodyParts.push(new BodyPart(vec3(5, 0, 0), vec3(0, 0, 0), 0.2, sphereData[0], sphereData[1], sphereData[2], sphereData[3], this.bodyParts[1], vec3(0, 0, 0)));
  }

  translateThorax(translation) {
    let position = this.bodyParts[0].position;
    this.bodyParts[0].position = vec3(position[0] + translation[0], position[1] + translation[1], position[2] + translation[2]);
  }

  rotateThorax(rotation) {
    let rot = this.bodyParts[0].rotation;
    this.bodyParts[0].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateHead(rotation) {
    let rot = this.bodyParts[1].rotation;
    this.bodyParts[1].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateAbdomen(rotation) {
    let rot = this.bodyParts[2].rotation;
    this.bodyParts[2].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateHeadUpperLeg1(rotation) {
    let rot = this.bodyParts[3].rotation;
    this.bodyParts[3].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateHeadUpperLeg2(rotation) {
    let rot = this.bodyParts[4].rotation;
    this.bodyParts[4].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateThoraxUpperLeg1(rotation) {
    let rot = this.bodyParts[5].rotation;
    this.bodyParts[5].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateThoraxUpperLeg2(rotation) {
    let rot = this.bodyParts[6].rotation;
    this.bodyParts[6].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateAbdomenUpperLeg1(rotation) {
    let rot = this.bodyParts[7].rotation;
    this.bodyParts[7].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateAbdomenUpperLeg2(rotation) {
    let rot = this.bodyParts[8].rotation;
    this.bodyParts[8].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateHeadLowerLeg1(rotation) {
    let rot = this.bodyParts[9].rotation;
    this.bodyParts[9].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateHeadLowerLeg2(rotation) {
    let rot = this.bodyParts[10].rotation;
    this.bodyParts[10].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateThoraxLowerLeg1(rotation) {
    let rot = this.bodyParts[11].rotation;
    this.bodyParts[11].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateThoraxLowerLeg2(rotation) {
    let rot = this.bodyParts[12].rotation;
    this.bodyParts[12].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateAbdomenLowerLeg1(rotation) {
    let rot = this.bodyParts[13].rotation;
    this.bodyParts[13].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  rotateAbdomenLowerLeg2(rotation) {
    let rot = this.bodyParts[14].rotation;
    this.bodyParts[14].rotation = vec3(rot[0] + rotation[0], rot[1] + rotation[1], rot[2] + rotation[2]);
  }

  getThorax() {
    return this.bodyParts[0];
  }

  getHead() {
    return this.bodyParts[1];
  }

  getAbdomen() {
    return this.bodyParts[2];
  }

  getHeadUpperLeg1() {
    return this.bodyParts[3];
  }

  getHeadUpperLeg2() {
    return this.bodyParts[4];
  }

  getThoraxUpperLeg1() {
    return this.bodyParts[5];
  }

  getThoraxUpperLeg2() {
    return this.bodyParts[6];
  }

  getAbdomenUpperLeg1() {
    return this.bodyParts[7];
  }

  getAbdomenUpperLeg2() {
    return this.bodyParts[8];
  }

  getHeadLowerLeg1() {
    return this.bodyParts[9];
  }

  getHeadLowerLeg2() {
    return this.bodyParts[10];
  }

  getThoraxLowerLeg1() {
    return this.bodyParts[11];
  }

  getThoraxLowerLeg2() {
    return this.bodyParts[12];
  }

  getAbdomenLowerLeg1() {
    return this.bodyParts[13];
  }

  getAbdomenLowerLeg2() {
    return this.bodyParts[14];
  }

  getBodyParts() {
    return this.bodyParts;
  }

  render(gl, program, viewMatrix, projectionMatrix) {
    for (let i = 0; i < this.bodyParts.length; i++) {
      this.bodyParts[i].prepareModel(gl, program, viewMatrix, projectionMatrix);
      gl.drawElements(gl.TRIANGLES, this.bodyParts[i].getIndexCount(), gl.UNSIGNED_SHORT, 0);
      this.bodyParts[i].deleteBuffers(gl);
    }
  }
}