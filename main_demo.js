import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as dat from "dat.gui";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import "./style.css";

/* ------------------------------------------------
 * dat.gui - CAD helper module
 * ------------------------------------------------ */
// const gui = new dat.GUI();
// const world = {
//   plane: { width: 5, height: 5, numWidthSegments: 8, numHeightSegments: 8 },
// };

// gui.add(world.plane, "width", 1, 32).onChange(generatePlane);
// gui.add(world.plane, "height", 1, 32).onChange(generatePlane);
// gui.add(world.plane, "numWidthSegments").onChange(generatePlane);
// gui.add(world.plane, "numHeightSegments").onChange(generatePlane);

/* ------------------------------------------------
 * Basic setup - Scene, Camera, Renderer
 * ------------------------------------------------ */
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* ------------------------------------------------
 * 3D geometry
 * ------------------------------------------------ */
const planeGeometry = new THREE.PlaneGeometry(10, 10, 8, 8);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x6666dd,
  side: THREE.DoubleSide,
  flatShading: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.translateZ(-0.5);
// wrinklePlane(planeMesh);
scene.add(planeMesh);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x22dd22 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(boxMesh);

const wallMeshRight = buildWallMesh();
const wallMeshLeft = buildWallMesh();
const wallMeshUpper = buildWallMesh();
const wallMeshLower = buildWallMesh();

wallMeshRight.translateX(-5);
wallMeshLeft.translateX(5);
wallMeshUpper.translateY(5);
wallMeshLower.translateY(-5);

wallMeshUpper.rotateZ(d2r(90));
wallMeshLower.rotateZ(d2r(90));

scene.add(wallMeshRight, wallMeshLeft, wallMeshUpper, wallMeshLower);

/* ------------------------------------------------
 * Camera
 * ------------------------------------------------ */
// new OrbitControls(camera, renderer.domElement);
new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

/* ------------------------------------------------
 * Light
 * ------------------------------------------------ */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 5, 10);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-5, 5, -10);
scene.add(light2);

/* ------------------------------------------------
 * Physics
 * ------------------------------------------------ */

/* ------------------------------------------------
 * Animation
 * ------------------------------------------------ */
let step = 0;
let speed = 0.00001;
renderer.setAnimationLoop(animate);
// animate();

function animate(time) {
  step += speed;
  boxMesh.position.x = 3 * Math.abs(Math.sin(step));

  // boxMesh.rotation.x += 0.001;
  // boxMesh.rotation.y += 0.002;
  // boxMesh.rotation.z += 0.003;

  // planeMesh.rotation.x += 0.01;
  boxMesh.translateX(0.0001);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

/* ------------------------------------------------
 * Helper Functions
 * ------------------------------------------------ */
function wrinklePlane(planeMesh) {
  // console.log(planeMesh.geometry.attributes.position.array);
  let pts = planeMesh.geometry.attributes.position.array;
  for (let i = 0; i < pts.length; i += 3) {
    const x = pts[i];
    const y = pts[i + 1];
    const z = pts[i + 2];

    // if ((i + 2) % 4 === 0)
    let rand = Math.random() - 0.5;
    rand = rand * 0.25;
    pts[i + 2] = z + rand;
  }
}

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.numWidthSegments,
    world.plane.numHeightSegments
  );
  wrinklePlane(planeMesh);
}

function buildWallMesh() {
  const wallGeometry = new THREE.BoxGeometry(1, 11, 1);
  const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x22dd22 });
  const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
  return wallMesh;
}

function r2d(radians) {
  return radians * (180 / Math.PI);
}
function d2r(degrees) {
  return degrees * (Math.PI / 180);
}
/* ------------------------------------------------
 * Debugging
 * ------------------------------------------------ */
console.log(boxMesh);
