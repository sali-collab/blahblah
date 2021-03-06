import * as THREE from 'three';
import Impact2Scene from './Impact2.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var ScholarSupport;
var BackArrow;



function ScholarImpactScene(setScene,color) {
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

  function goBackImpact() {
    var bi = Impact2Scene(setScene);
    setScene(bi);
  }

  function initObjects() {
   
    var planeScholarSupport = new THREE.PlaneGeometry(391/120, 227/120);
    var textureScholarSupport= new THREE.TextureLoader().load('static/imgs/ScholarImpact_page/ScholarSupport.png');
    var materialScholarSupport  = new THREE.MeshBasicMaterial({ map: textureScholarSupport  , transparent:true});
    ScholarSupport= new THREE.Mesh(planeScholarSupport, materialScholarSupport );
    ScholarSupport.position.set(0,0,0);- 
    scene.add(ScholarSupport);

    var planeBackArrow = new THREE.PlaneGeometry(178 / 300, 93 / 300);
    var textureBackArrow  = new THREE.TextureLoader().load('static/imgs/FoodImpact_page/BackArrow.png');
    var materialBackArrow   = new THREE.MeshBasicMaterial({ map: textureBackArrow, transparent:true});
    BackArrow = new THREE.Mesh(planeBackArrow, materialBackArrow);
    BackArrow.position.set(-1.3,2.5,0.01);
    scene.add(BackArrow);
    BackArrow.cursor = 'pointer';
    BackArrow.on('click', () => goBackImpact());
    BackArrow.on('touchstart', ()=>goBackImpact());
 

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
export default ScholarImpactScene;