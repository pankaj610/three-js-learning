import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import earthTexture from './assets/earth.jpg';
import jupiterTexture from './assets/jupiter.jpg';
import marsTexture from './assets/mars.jpg';
import mercuryTexture from './assets/mercury.jpg';
import neptuneTexture from './assets/neptune.jpg';
import plutoTexture from './assets/pluto.jpg';
import saturnRingTexture from './assets/saturn-ring.png';
import saturnTexture from './assets/saturn.jpg';
import starsTexture from './assets/stars.jpg';
import sunTexture from './assets/sun.jpg';
import uranusTexture from './assets/uranus.jpg';
import uranusRingTexture from './assets/uranus-ring.png';
import venusTexture from './assets/venus.jpg'; 

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);

orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);

scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    wireframe: false,
    map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(sun);



function createPlanet(size, texture, position, ring) {
    const planetGeo = new THREE.SphereGeometry(size, 30, 30);
    const planetMaterial = new THREE.MeshStandardMaterial({
        wireframe: false,
        map: textureLoader.load(texture),
    });
    const planet = new THREE.Mesh(planetGeo, planetMaterial);
    const planetObject = new THREE.Object3D();
    planetObject.add(planet);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            wireframe: false,
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
        planetObject.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(planetObject);
    planet.position.x = position;
    return {mesh: planet, obj: planetObject};
}
// Mercury
const mercury = createPlanet(3.2, mercuryTexture, 28);

// Venus
const venus = createPlanet(5.8, venusTexture, 44);

// Earth
const earth = createPlanet(6, 5, earthTexture, 65);

// Mars
const mars = createPlanet(4, marsTexture, 80);

// Jupiter
const jupiter = createPlanet(12, jupiterTexture, 104);

// Saturn
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});

// Uranus
const uranus = createPlanet(8, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});

// Neptune
const neptune = createPlanet(7, neptuneTexture, 200);

// Pluto
const pluto = createPlanet(2.8, plutoTexture, 300);


const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {
    sun.rotateY(0.004);
    
    // Self Rotation
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.004);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.034);
    uranus.mesh.rotateY(0.003);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);


    
    //Around sun rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01); 
    mars.obj.rotateY(0.008);  
    jupiter.obj.rotateY(0.002); 
    saturn.obj.rotateY(0.0009); 
    uranus.obj.rotateY(0.0004); 
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize',function(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

