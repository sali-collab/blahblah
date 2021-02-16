import * as THREE from 'three';
import Impact3Scene from './Impact3.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var FrontArrow;
var Insurance;
var Scholar;
var SkillsTraining;


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

  function goImpact() {
    var is = Impact3Scene(setScene);
    setScene(is);
  }

  function initObjects() {
   
  

    var planeInsurance = new THREE.PlaneGeometry(320/300, 349/300);
    var textureInsurance = new THREE.TextureLoader().load('static/imgs/Impact2_page/Insurance.png');
    var materialInsurance = new THREE.MeshBasicMaterial({ map: textureInsurance , transparent:true});
    Insurance = new THREE.Mesh(planeInsurance, materialInsurance);
    Insurance.position.set(0,2, 0);
    scene.add(Insurance); 

    var planeSkillsTraining = new THREE.PlaneGeometry(327/400, 570/400);
    var textureSkillsTraining = new THREE.TextureLoader().load('static/imgs/Impact2_page/SkillsTraining.png');
    var materialSkillsTraining = new THREE.MeshBasicMaterial({ map: textureSkillsTraining , transparent:true});
    SkillsTraining = new THREE.Mesh(planeSkillsTraining, materialSkillsTraining);
    SkillsTraining.position.set(1,-2, 0);
    scene.add(SkillsTraining); 

    var planeScholar = new THREE.PlaneGeometry(499/300, 603/300);
    var textureScholar = new THREE.TextureLoader().load('static/imgs/Impact2_page/Scholar.png');
    var materialScholar = new THREE.MeshBasicMaterial({ map: textureScholar , transparent:true});
    Scholar = new THREE.Mesh(planeScholar, materialScholar);
    Scholar.position.set(-1,-0.1, 0);
    scene.add(Scholar); 
   
    var planeFrontArrow = new THREE.PlaneGeometry(178/300, 93/300);
    var textureFrontArrow  = new THREE.TextureLoader().load('static/imgs/Impact2_page/FrontArrow.png');
    var materialFrontArrow  = new THREE.MeshBasicMaterial({ map: textureFrontArrow , transparent:true});
    FrontArrow  = new THREE.Mesh(planeFrontArrow , materialFrontArrow);
    FrontArrow.position.set(1.5,1,0);
    scene.add(FrontArrow); 
    FrontArrow.cursor = 'pointer';
    FrontArrow.on('click', goImpact);
    FrontArrow.on('touchstart', goImpact);

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