import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FilmPass } from'three/examples/jsm/postprocessing/FilmPass.js'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  32,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("Graphic").appendChild(renderer.domElement);

const AmbientLight = new THREE.AmbientLight("#bbd1fa", .1);
scene.add(AmbientLight);

const Directional = new THREE.DirectionalLight(0xffffff, 10);

Directional.position.set(2.8, 3, -100);

scene.add(Directional);

const moonColorTexture = new THREE.TextureLoader().load('assets/3D models/lroc_color_poles_4k.jpg')
const moonDisplacementTexture = new THREE.TextureLoader().load('assets/3D models/ldem_16_uint.JPG')

const moonRes=11
const moon = new THREE.Mesh(
  
  new THREE.SphereGeometry(4,2**moonRes,2**moonRes),
  // new THREE.BoxGeometry(1.4,1.4,1.4),
  new THREE.MeshPhysicalMaterial({
    map:moonColorTexture,

    displacementMap:moonDisplacementTexture,
    displacementScale:.05,

  })
)
moon.position.set(3.2, -3.6, -3);
// moon.scale.set(3.6, 3.6, 3.6);
scene.add(moon)



window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
})


const composer = new EffectComposer( renderer )
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );





// const Bloom =new UnrealBloomPass(new THREE.Vector2(0,0),.6,1, 0)
// composer.addPass(Bloom)

// const filmPass =new FilmPass(10,.2, 1000,false)
// composer.addPass( filmPass );


const outputPass = new OutputPass();
composer.addPass( outputPass );

renderer.toneMapping=THREE.CineonToneMapping;
renderer.toneMappingExposure=1


let Ambient = new THREE.AmbientLight('#111',.1)

scene.add(Ambient)

let i=0
let Colors=["#3120F3","#F32020","#000000"]
document.body.onclick=()=>{
    i++
    Ambient.color.set(Colors[i%3])
    document.body.style.backgroundColor=Colors[i%3]
}


function animate() {

  moon.rotateOnAxis(new THREE.Vector3(.5,-1,0),0.004)
  requestAnimationFrame(animate);
  composer.render();
}

function render() {
    renderer.render(scene, camera)
}
animate();

