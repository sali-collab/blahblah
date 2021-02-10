import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Background;


function ImpactScene(setScene,color) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 8);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);
  initLights();
  initObjects();


  function destroy() {
    window.document.removeEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  function initLights() {
    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight();
    scene.add(spotLight);
    spotLight.position.set(10, 10, 10);
  }

  function initObjects() {
   
    var planeBackground = new THREE.PlaneGeometry(1080/300, 1920/300);
    var textureBackground = new THREE.TextureLoader().load('static/imgs/Impact_page/Background.png');
    var materialBackground = new THREE.MeshBasicMaterial({ map: textureBackground , transparent:true});
    Background = new THREE.Mesh(planeBackground, materialBackground);
    Background.position.set(0,0, 0);
    scene.add(Background); 

   


  }

  function update() {
  

  }

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default ImpactScene;