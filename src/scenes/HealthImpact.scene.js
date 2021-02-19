import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var HealthSupport;



function HealthImpactScene(setScene,color) {
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
   
    var planeHealthSupport = new THREE.PlaneGeometry(321/100, 179/100);
    var textureHealthSupport = new THREE.TextureLoader().load('static/imgs/HealthImpact_scene/HealthSupport.png');
    var materialHealthSupport  = new THREE.MeshBasicMaterial({ map: textureHealthSupport  , transparent:true});
    HealthSupport= new THREE.Mesh(planeHealthSupport, materialHealthSupport );
    HealthSupport.position.set(0,0,0);-
    scene.add(HealthSupport);
 

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
export default HealthImpactScene;