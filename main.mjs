import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 10);
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff, 1));

// ССЫЛКА НА GLB ИЗ DROPBOX
const modelUrl = 'https://www.dropbox.com/scl/fi/nie11zrq2bq72t99bvn96/Relative_orientation.glb?rlkey=sz02i2807sfb0bzg6lzt9juo9&raw=1';

const loader = new GLTFLoader();
loader.load(modelUrl, gltf => {
  const model = gltf.scene;
  scene.add(model);

  const partNames = ['L_1','L_2','L_3','L_4','L_5','R_1','R_2','R_3','R_4','R_5'];
  partNames.forEach(name => {
    const el = document.getElementById(name);
    el.addEventListener('change', () => {
      const obj = model.getObjectByName(name);
      if (obj) obj.visible = el.checked;
    });
  });
}, undefined, error => {
  console.error('Ошибка загрузки модели:', error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
