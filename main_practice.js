import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import "./style.css";

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
renderer.setAnimationLoop(animate);

function animate() {
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
