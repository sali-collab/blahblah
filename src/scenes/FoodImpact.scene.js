import * as THREE from 'three';


// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var FoodSupport;



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
   
    var planeFoodSupport = new THREE.PlaneGeometry(321/100, 179/100);
    var textureFoodSupport = new THREE.TextureLoader().load('static/imgs/FoodImpact_page/FoodSupport.png');
    var materialFoodSupport  = new THREE.MeshBasicMaterial({ map: textureFoodSupport  , transparent:true});
    FoodSupport= new THREE.Mesh(planeFoodSupport, materialFoodSupport );
    FoodSupport.position.set(0,0,0);
    scene.add(FoodSupport);
 

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