import * as THREE from "three";
import "./style.css";

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

const planeGeometry = new THREE.PlaneGeometry(5, 5, 32, 32);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x6666dd,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial = new THREE.MeshBasicMaterial({
//   color: 0xdddd66,
// });
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add( boxMesh);

camera.position.z = 5;
// camera.rotateX(5);
// camera.rotateY(5);
// camera.translateX(-5);
// camera.translateY(5);
// camera.position.y = 5;

animate();

function animate() {
  // boxMesh.rotation.x += 0.001;
  // boxMesh.rotation.y += 0.002;
  // boxMesh.rotation.z += 0.003;

  // planeMesh.rotation.x += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
