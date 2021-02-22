import * as THREE from 'three';
import Impact3Scene from './Impact3.scene';
import ImpactScene from './Impact.scene';
import PayImpactScene from './PayImpact.scene';
import ScholarImpactScene from './ScholarImpact.scene';
import SkillsImpactScene from './SkillsImpact.scene';

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
var BackArrow;
var SkillsImpact;


function Impact2Scene(setScene,color) {
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

  function goImpact1() {
    var iss = ImpactScene(setScene);
    setScene(iss);
  }

  function goPayImpact() {
    var pi = PayImpactScene(setScene);
    setScene(pi);
  }


  function goScholarImpact() {
    var si = ScholarImpactScene(setScene);
    setScene(si);
  }

  function goSkillsImpact() {
    var sis = SkillsImpactScene(setScene);
    setScene(sis);
  }

  function initObjects() {
   

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
    Scholar.cursor = 'pointer';
    Scholar.on('click', goScholarImpact);
    Scholar.on('touchstart', goScholarImpact);
   


    var planeInsurance = new THREE.PlaneGeometry(320/300, 349/300);
    var textureInsurance = new THREE.TextureLoader().load('static/imgs/Impact2_page/Insurance.png');
    var materialInsurance = new THREE.MeshBasicMaterial({ map: textureInsurance , transparent:true});
    Insurance = new THREE.Mesh(planeInsurance, materialInsurance);
    Insurance.position.set(0,2, 0);
    scene.add(Insurance); 
    Insurance.cursor = 'pointer';
    Insurance.on('click', goPayImpact);
    Insurance.on('touchstart', goPayImpact);



    var planeFrontArrow = new THREE.PlaneGeometry(178/300, 93/300);
    var textureFrontArrow  = new THREE.TextureLoader().load('static/imgs/Impact2_page/FrontArrow.png');
    var materialFrontArrow  = new THREE.MeshBasicMaterial({ map: textureFrontArrow , transparent:true});
    FrontArrow  = new THREE.Mesh(planeFrontArrow , materialFrontArrow);
    FrontArrow.position.set(1.5,1,0);
    scene.add(FrontArrow); 
    FrontArrow.cursor = 'pointer';
    FrontArrow.on('click', goImpact);
    FrontArrow.on('touchstart', goImpact);

    var planeBackArrow = new THREE.PlaneGeometry(178/300, 93/300);
    var textureBackArrow   = new THREE.TextureLoader().load('static/imgs/Impact2_page/BackArrow.png');
    var materialBackArrow  = new THREE.MeshBasicMaterial({ map: textureBackArrow , transparent:true});
    BackArrow  = new THREE.Mesh(planeBackArrow , materialBackArrow);
    BackArrow.position.set(-1.4,-2,0);
    scene.add(BackArrow); 
    BackArrow.cursor = 'pointer';
    BackArrow.on('click', goImpact1);
    BackArrow.on('touchstart', goImpact1);

    /*var planeSkillsImpact = new THREE.PlaneGeometry(178/300, 93/300);
    var textureSkillsImpact    = new THREE.TextureLoader().load('static/imgs/Impact2_page/SkillsTraining.png');
    var materialSkillsImpact  = new THREE.MeshBasicMaterial({ map: textureBackArrow , transparent:true});
    SkillsImpact  = new THREE.Mesh(planeBackArrow , materialBackArrow);
    SkillsImpact .position.set(-1.4,-2,0);
    scene.add(SkillsImpact); */


    var planeSkillsTraining = new THREE.PlaneGeometry(327/400, 570/400);
    var textureSkillsTraining = new THREE.TextureLoader().load('static/imgs/Impact2_page/SkillsTraining.png');
    var materialSkillsTraining = new THREE.MeshBasicMaterial({ map: textureSkillsTraining , transparent:true});
    SkillsTraining = new THREE.Mesh(planeSkillsTraining, materialSkillsTraining);
    SkillsTraining.position.set(1,-2, 0.01);
    scene.add(SkillsTraining); 
    SkillsTraining.cursor = 'pointer';
    SkillsTraining.on('click', goSkillsImpact);
    SkillsTraining.on('touchstart', goSkillsImpact);

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
export default Impact2Scene;