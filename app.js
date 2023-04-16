import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Variables for Setup

let container;
let camera;
let renderer;
let scene;
let girl;

function init() {
    container = document.querySelector('.scene');

    // Create Scene
    scene = new THREE.Scene();

    const fov = 50;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 700;

    // Camera setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0, 10, 30);

    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x76b5c5,5);
    light.position.set(-20,50,550);
    scene.add(light);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        girl = gltf.scene.children[0];
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    // girl.rotation.x += 0.005;
    // girl.rotation.y += 0.005;
    girl.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init()

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight
    // camera.updateProjectMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize)