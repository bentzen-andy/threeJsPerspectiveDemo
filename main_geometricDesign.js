import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import "./style.css";

console.log(OrbitControls);
/* ------------------------------------------------
 * dat.gui - CAD helper module
 * ------------------------------------------------ */
const gui = new dat.GUI();
const world = {
  plane: { width: 5, height: 5, numWidthSegments: 8, numHeightSegments: 8 },
};

gui.add(world.plane, "width", 1, 32).onChange(generatePlane);
gui.add(world.plane, "height", 1, 32).onChange(generatePlane);
gui.add(world.plane, "numWidthSegments").onChange(generatePlane);
gui.add(world.plane, "numHeightSegments").onChange(generatePlane);

/* ------------------------------------------------
 * Basic setup - Scene, Camera, Renderer
 * ------------------------------------------------ */
const scene = new THREE.Scene();
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
const planeGeometry = new THREE.PlaneGeometry(5, 5, 8, 8);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x6666dd,
  side: THREE.DoubleSide,
  flatShading: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
wrinklePlane(planeMesh);
scene.add(planeMesh);

/* ------------------------------------------------
 * Camera
 * ------------------------------------------------ */
// new OrbitControls(camera, renderer.domElement);
new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

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
 * Animation
 * ------------------------------------------------ */
animate();

function animate() {
  // boxMesh.rotation.x += 0.001;
  // boxMesh.rotation.y += 0.002;
  // boxMesh.rotation.z += 0.003;

  // planeMesh.rotation.x += 0.01;

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

/* ------------------------------------------------
 * Debugging
 * ------------------------------------------------ */
