import * as THREE from 'three';

import WelcomeScene from './Welcome.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets

var Arrow;
var TitleText;


function titleScene(setScene, color) {
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

  function goWelcome() {
    var ws = WelcomeScene(setScene);
    setScene(ws);
  }

  function initObjects() {
    var planeTitleText = new THREE.PlaneGeometry(555 / 300, 158 / 300);
    var textureTitleText = new THREE.TextureLoader().load('static/imgs/title_page/TitleText.png');
    var materialTitleText = new THREE.MeshBasicMaterial({map: textureTitleText,transparent: true});
    TitleText = new THREE.Mesh(planeTitleText, materialTitleText);
    TitleText.position.set(0, 1, 0);
    scene.add(TitleText);

    var planeArrow = new THREE.PlaneGeometry(203 / 300, 139 / 300);
    var textureArrow = new THREE.TextureLoader().load('static/imgs/title_page/Arrow.png');
    var materialArrow = new THREE.MeshBasicMaterial({map: textureArrow,transparent: true});
    Arrow= new THREE.Mesh(planeArrow, materialArrow);
    Arrow.position.set(1, -1, 0);
    scene.add(Arrow);

    Arrow.cursor = 'pointer';
    Arrow.on('click', goWelcome);
    Arrow.on('touchstart', goWelcome);
  
  }   

  function update() {}

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default titleScene;
