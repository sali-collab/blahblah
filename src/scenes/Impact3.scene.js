import * as THREE from 'three';

import Impact2Scene from './Impact2.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Police;
var Back2School;
var BackArrow;


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

  function goImpactBk() {
    var is = Impact2Scene(setScene);
    setScene(is);
  }

  function initObjects() {
   
    var planePolice = new THREE.PlaneGeometry(421/300, 630/300);
    var texturePolice = new THREE.TextureLoader().load('static/imgs/Impact3_page/Police.png');
    var materialPolice = new THREE.MeshBasicMaterial({ map: texturePolice , transparent:true});
    Police= new THREE.Mesh(planePolice, materialPolice);
    Police.position.set(-0.7,-1, 0);
    scene.add(Police); 

    var planeBack2School = new THREE.PlaneGeometry(273/300, 389/300);
    var textureBack2School = new THREE.TextureLoader().load('static/imgs/Impact3_page/Back2School.png');
    var materialBack2School = new THREE.MeshBasicMaterial({ map: textureBack2School , transparent:true});
    Back2School= new THREE.Mesh(planeBack2School, materialBack2School);
    Back2School.position.set(0.5,2, 0);
    scene.add(Back2School); 

    var planeBackArrow = new THREE.PlaneGeometry(178/300, 93/300);
    var textureBackArrow = new THREE.TextureLoader().load('static/imgs/Impact3_page/BackArrow.png');
    var materialBackArrow = new THREE.MeshBasicMaterial({ map: textureBackArrow , transparent:true});
    BackArrow= new THREE.Mesh(planeBackArrow, materialBackArrow);
    BackArrow.position.set(-1.4,0.8, 0);
  BackArrow.cursor = 'pointer';
  BackArrow.on('click', goImpactBk);
  BackArrow.on('touchstart', goImpactBk);
    scene.add(BackArrow); 


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