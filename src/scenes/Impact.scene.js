import * as THREE from 'three';
import Impact2Scene from './Impact2.scene';
import voteScene from './vote.scene';
import FoodImpactScene from './FoodImpact.scene';
import HealthImpactScene from './HealthImpact.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var FoodBank;
var FreeHealth;
var Investment;
var Text;
var FrontArrow;
var BackArrow;


function ImpactScene(setScene, color) {
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
    var is = Impact2Scene(setScene);
    setScene(is);
  }

  function goImpactBk() {
    var is = voteScene(setScene);
    setScene(is);
  }

  function goImpactFood() {
    var fi = FoodImpactScene(setScene);
    setScene(fi);
  }

  function goHealthInfo() {
    var hi = HealthImpactScene(setScene);
    setScene(hi);
  }
  function initObjects() {

    var planeText = new THREE.PlaneGeometry(816 / 350, 290 / 350);
    var textureText = new THREE.TextureLoader().load('static/imgs/Impact_page/Text.png');
    var materialText = new THREE.MeshBasicMaterial({ map: textureText, transparent: true });
    Text = new THREE.Mesh(planeText, materialText);
    Text.position.set(-0.5, -0.3, 0.1);
    scene.add(Text);

    var planeInvestment = new THREE.PlaneGeometry(588 / 250, 403 / 250);
    var textureInvestment = new THREE.TextureLoader().load('static/imgs/Impact_page/Investment.png');
    var materialInvestment = new THREE.MeshBasicMaterial({ map: textureInvestment, transparent: true });
    Investment = new THREE.Mesh(planeInvestment, materialInvestment);
    Investment.position.set(0, -2, 0.1);
    scene.add(Investment);



    var planeFreeHealth = new THREE.PlaneGeometry(413 / 300, 375 / 300);
    var textureFreeHealth = new THREE.TextureLoader().load('static/imgs/Impact_page/FreeHealth.png');
    var materialFreeHealth = new THREE.MeshBasicMaterial({ map: textureFreeHealth, transparent: true });
    FreeHealth = new THREE.Mesh(planeFreeHealth, materialFreeHealth);
    FreeHealth.position.set(-0.8, 1.5, 0.1);
    scene.add(FreeHealth);
    FreeHealth.cursor = 'pointer';
    FreeHealth.on('click', () => goHealthInfo());
    FreeHealth.on('touchstart', () => goHealthInfo());

    var planeFrontArrow = new THREE.PlaneGeometry(178 / 300, 93 / 300);
    var textureFrontArrow = new THREE.TextureLoader().load('static/imgs/Impact_page/FrontArrow.png');
    var materialFrontArrow = new THREE.MeshBasicMaterial({ map: textureFrontArrow, transparent: true });
    FrontArrow = new THREE.Mesh(planeFrontArrow, materialFrontArrow);
    FrontArrow.position.set(1.3, -1, 0.1);
    scene.add(FrontArrow);
    FrontArrow.cursor = 'pointer';
    FrontArrow.on('click', () => goImpact());
    FrontArrow.on('touchstart', () => goImpact());

    var planeBackArrow = new THREE.PlaneGeometry(178 / 300, 93 / 300);
    var textureBackArrow = new THREE.TextureLoader().load('static/imgs/Impact_page/BackArrow.png');
    var materialBackArrow = new THREE.MeshBasicMaterial({ map: textureBackArrow, transparent: true });
    BackArrow = new THREE.Mesh(planeBackArrow, materialBackArrow);
    BackArrow.position.set(-1.5, 2.5, 0.1);
    scene.add(BackArrow);
    BackArrow.cursor = 'pointer';
    BackArrow.on('click', () => goImpactBk());
    BackArrow.on('touchstart', () => goImpactBk());

    var planeFoodBank = new THREE.PlaneGeometry(224 / 250, 273 / 250);
    var textureFoodBank = new THREE.TextureLoader().load('static/imgs/Impact_page/FoodBank.png');
    var materialFoodBank = new THREE.MeshBasicMaterial({ map: textureFoodBank, transparent: true });
    FoodBank = new THREE.Mesh(planeFoodBank, materialFoodBank);
    FoodBank.position.set(1.1, 2.0, 0.1);
    scene.add(FoodBank);
   FoodBank.cursor = 'pointer';
  FoodBank.on('click', () => goImpactFood());
   FoodBank.on('touchstart', ()=>goImpactFood());

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