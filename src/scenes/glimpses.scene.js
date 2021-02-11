import * as THREE from 'three';
import EducationScene from "./Education.scene";
import HealthcareScene from "./Healthcare.scene";
import SafetyScene from "./Safety.scene";


// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Background;
var Baby;
var Bird;
var Shoe;
var Text;
var Line;


function glimpsesScene(setScene,color) {
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

  function goEducation() {
    var es = EducationScene(setScene);
    setScene(es);
}

function goHealth() {
  var hs = HealthScene(setScene);
  setScene(hs);
}

function goSafety() {
  var ss = SafetyScene(setScene);
  setScene(ss);
}

  function initObjects() {
   

    var planeBackground = new THREE.PlaneGeometry(1080/400, 1920/400);
    var textureBackground = new THREE.TextureLoader().load('static/imgs/glimpses_page/Background.png');
    var materialBackground = new THREE.MeshBasicMaterial({ map: textureBackground , transparent:true});
    Background = new THREE.Mesh(planeBackground, materialBackground);
    Background.position.set(0,0, 0);
    scene.add(Background); 



   var planeText = new THREE.PlaneGeometry(581/300, 169/300);
   var textureText = new THREE.TextureLoader().load('static/imgs/glimpses_page/Text.png');
   var materialText  = new THREE.MeshBasicMaterial({ map: textureText  , transparent:true});
   Text  = new THREE.Mesh(planeText , materialText );
   Text .position.set(0,-2, 0);
   scene.add(Text); 

  var planeLine = new THREE.PlaneGeometry(612/300, 53/300);
  var textureLine= new THREE.TextureLoader().load('static/imgs/glimpses_page/Line.png');
  var materialLine = new THREE.MeshBasicMaterial({ map: textureLine , transparent:true});
  Line= new THREE.Mesh(planeLine, materialLine);
  Line.position.set(-0.91,0.1, 0);
  scene.add(Line); 

  var planeShoe = new THREE.PlaneGeometry(488/300, 329/300);
  var textureShoe= new THREE.TextureLoader().load('static/imgs/glimpses_page/Shoe.png');
  var materialShoe = new THREE.MeshBasicMaterial({ map: textureShoe , transparent:true});
  Shoe = new THREE.Mesh(planeShoe, materialShoe);
  Shoe.position.set(-0.9,2.7, 0.01);
  scene.add(Shoe); 

  Shoe.cursor = 'pointer';
  Shoe.on('click', goSafety);
  Shoe.on('touchstart', goSafety);

  var planeBird = new THREE.PlaneGeometry(101/400, 97/400);
  var textureBird = new THREE.TextureLoader().load('static/imgs/glimpses_page/Bird.png');
  var materialBird = new THREE.MeshBasicMaterial({ map: textureBird , transparent:true});
  Bird = new THREE.Mesh(planeBird, materialBird);
  Bird.position.set(0,-1, 0.01);
  scene.add(Bird); 

  Bird.cursor = 'pointer';
  Bird.on('click', goHealth);
  Bird.on('touchstart', goHealth);

  var planeBaby = new THREE.PlaneGeometry(146/400, 193/400);
  var textureBaby = new THREE.TextureLoader().load('static/imgs/glimpses_page/Baby.png');
  var materialBaby = new THREE.MeshBasicMaterial({ map: textureBaby , transparent:true});
  Baby = new THREE.Mesh(planeBaby, materialBaby);
  Baby.position.set(-1.5,-1.5, 0.01);
  scene.add(Baby); 

  Baby.cursor = 'pointer';
  Baby.on('click', goEducation);
  Baby.on('touchstart', goEducation);

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
export default glimpsesScene;
