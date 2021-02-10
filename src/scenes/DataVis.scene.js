import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Background;
var Impact;

function DataVisScene(setScene,color) {
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
    var textureBackground = new THREE.TextureLoader().load('static/imgs/DataVis_page/Background.png');
    var materialBackground = new THREE.MeshBasicMaterial({ map: textureBackground , transparent:true});
    Background = new THREE.Mesh(planeBackground, materialBackground);
    Background.position.set(0,0, 0);
    scene.add(Background); 

    var planeImpact = new THREE.PlaneGeometry(75/300, 268/300);
    var textureImpact  = new THREE.TextureLoader().load('static/imgs/DataVis_page/Impact.png');
    var materialImpact  = new THREE.MeshBasicMaterial({ map: textureImpact  , transparent:true});
    Impact  = new THREE.Mesh(planeImpact , materialImpact );
    Impact .position.set(1.6,0, 0);
    scene.add(Impact ); 


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
export default DataVisScene;