import * as THREE from 'three';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Police;
var Back2School;


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
   
    var planePolice = new THREE.PlaneGeometry(421/300, 630/300);
    var texturePolice = new THREE.TextureLoader().load('static/imgs/Impact3_page/Police.png');
    var materialPolice = new THREE.MeshBasicMaterial({ map: texturePolice , transparent:true});
    Police= new THREE.Mesh(planePolice, materialPolice);
    Police.position.set(-2,-1, 0);
    scene.add(Police); 

    var planeBack2School = new THREE.PlaneGeometry(273/300, 389/300);
    var textureBack2School = new THREE.TextureLoader().load('static/imgs/Impact3_page/Back2School.png');
    var materialBack2School = new THREE.MeshBasicMaterial({ map: textureBack2School , transparent:true});
    Back2School= new THREE.Mesh(planeBack2School, materialBack2School);
    Back2School.position.set(2,03, 0);
    scene.add(Back2School); 

   


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