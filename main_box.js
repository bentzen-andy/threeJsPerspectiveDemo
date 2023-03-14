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

console.log(scene);
console.log(camera);
console.log(renderer);

document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x22dd22 });
const mesh = new THREE.Mesh(boxGeometry, material);

scene.add(mesh);
camera.position.z = 5;

console.log(boxGeometry);
console.log(material);
console.log(mesh);

function animate() {
  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.002;
  mesh.rotation.z += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
