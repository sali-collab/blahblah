import * as THREE from 'three';
import Impact3Scene from './Impact3.scene';


// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var SchoolSupport;
var BackArrow;



function ImpactSchoolScene(setScene,color) {
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
    var bi = Impact3Scene(setScene);
    setScene(bi);
  }

  function initObjects() {
   
    var planeSchoolSupport = new THREE.PlaneGeometry(273/100, 80/100);
    var textureSchoolSupport = new THREE.TextureLoader().load('static/imgs/SchoolImpact_page/SchoolSupport.png');
    var materialSchoolSupport = new THREE.MeshBasicMaterial({ map: textureSchoolSupport  , transparent:true});
    SchoolSupport = new THREE.Mesh(planeSchoolSupport, materialSchoolSupport);
    SchoolSupport.position.set(0,0,0);
    scene.add(SchoolSupport);
 
    var planeBackArrow = new THREE.PlaneGeometry(178 / 300, 93 / 300);
    var textureBackArrow  = new THREE.TextureLoader().load('static/imgs/SchoolImpact_page/BackArrow.png');
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
export default ImpactSchoolScene;