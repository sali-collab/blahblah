import * as THREE from 'three';

import {editData} from "../Data";

import NameScene from "./Name.scene";

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Age;
var avatar;
var Age18_25;
var Age25_35;
var Age35_45;
var Age45_55;
var Age55_65;
var Age65Plus;





function Registration3Scene(setScene) {
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
  
  function setAge(age) {
    editData("age", age);
    const ns = new NameScene(setScene);
    setScene(ns);
  }

  function initObjects() {
   
    var planeAge = new THREE.PlaneGeometry(562 / 300, 68 / 300);
    var textureAge = new THREE.TextureLoader().load('static/imgs/registration3_page/Age.png');
    var materialAge = new THREE.MeshBasicMaterial({ map: textureAge , transparent:true});
    Age = new THREE.Mesh(planeAge, materialAge);
    Age.position.set(0, -1.65, 0);
    scene.add(Age);

    var planeavatar = new THREE.PlaneGeometry(1717 / 1300, 1747 / 1300);
    var textureavatar = new THREE.TextureLoader().load('static/imgs/registration3_page/avatar.png');
    var materialavatar = new THREE.MeshBasicMaterial({ map: textureavatar , transparent:true});
    avatar = new THREE.Mesh(planeavatar, materialavatar);
    avatar.position.set(0, 0.2, 0);
    scene.add(avatar);

    
    var planeAge18_25 = new THREE.PlaneGeometry(155/255, 91/255);
    var textureAge18_25 = new THREE.TextureLoader().load('static/imgs/registration3_page/Age18_25.png');
    var materialAge18_25 = new THREE.MeshBasicMaterial({ map: textureAge18_25 , transparent:true});
    Age18_25 = new THREE.Mesh(planeAge18_25, materialAge18_25);
    Age18_25.position.set(-0.75,-2, 0);
    Age18_25.pointer = "pointer"
    Age18_25.on("click", () => setAge("18"));
    Age18_25.on("touchstart", () => setAge("18"));
    scene.add(Age18_25);

     
    var planeAge25_35 = new THREE.PlaneGeometry(155/260, 91/260);
    var textureAge25_35 = new THREE.TextureLoader().load('static/imgs/registration3_page/Age25_35.png');
    var materialAge25_35 = new THREE.MeshBasicMaterial({ map: textureAge25_35 , transparent:true});
    Age25_35 = new THREE.Mesh(planeAge25_35, materialAge25_35);
    Age25_35.position.set(-0.05,-2, 0);
    Age25_35.pointer = "pointer"
    Age25_35.on("click", () => setAge("25"));
    Age25_35.on("touchstart", () => setAge("25"));
    scene.add(Age25_35);

    var planeAge35_45 = new THREE.PlaneGeometry(155/255, 91/255);
    var textureAge35_45 = new THREE.TextureLoader().load('static/imgs/registration3_page/Age35_45.png');
    var materialAge35_45 = new THREE.MeshBasicMaterial({ map: textureAge35_45 , transparent:true});
    Age35_45 = new THREE.Mesh(planeAge35_45, materialAge35_45);
    Age35_45.position.set(0.7,-2, 0);
    Age35_45.pointer = "pointer"
    Age35_45.on("click", () => setAge("35"));
    Age35_45.on("touchstart", () => setAge("35"));
    scene.add(Age35_45);

    var planeAge45_55 = new THREE.PlaneGeometry(155/255, 91/255);
    var textureAge45_55 = new THREE.TextureLoader().load('static/imgs/registration3_page/Age45_55.png');
    var materialAge45_55 = new THREE.MeshBasicMaterial({ map: textureAge45_55 , transparent:true});
    Age45_55 = new THREE.Mesh(planeAge45_55, materialAge45_55);
    Age45_55.position.set(-0.75, -2.4, 0);
    Age45_55.pointer = "pointer"
    Age45_55.on("click", () => setAge("45"));
    Age45_55.on("touchstart", () => setAge("45"));
    scene.add(Age45_55);

    var planeAge55_65 = new THREE.PlaneGeometry(155/255, 91/255);
    var textureAge55_65 = new THREE.TextureLoader().load('static/imgs/registration3_page/Age55_65.png');
    var materialAge55_65 = new THREE.MeshBasicMaterial({ map: textureAge55_65 , transparent:true});
    Age55_65 = new THREE.Mesh(planeAge55_65, materialAge55_65);
    Age55_65.position.set(-0.05,-2.4,0);
    Age55_65.pointer = "pointer"
    Age55_65.on("click", () => setAge("55"));
    Age55_65.on("touchstart", () => setAge("55"));
    scene.add(Age55_65);

    var planeAge65Plus = new THREE.PlaneGeometry(155/255, 91/255);
    var textureAge65Plus = new THREE.TextureLoader().load('static/imgs/registration3_page/Age65Plus.png');
    var materialAge65Plus = new THREE.MeshBasicMaterial({ map: textureAge65Plus , transparent:true});
    Age65Plus = new THREE.Mesh(planeAge65Plus, materialAge65Plus);
    Age65Plus.position.set(0.7,-2.4, 0);
    Age65Plus.pointer = "pointer"
    Age65Plus.on("click", () => setAge("65"));
    Age65Plus.on("touchstart", () => setAge("65"));
    scene.add(Age65Plus);

 



    /*var planeAvatar = new THREE.PlaneGeometry(1, 1, 1);
    var textureAvatar = new THREE.TextureLoader().load('static/imgs/registration_page/avatar.png');
    var materialAvatar = new THREE.MeshBasicMaterial({ map: textureAvatar });
    avatar = new THREE.Mesh(planeAvatar, materialAvatar);
    avatar.position.set(-3, 1, 0);
    scene.add(avatar); */
  
   

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
export default Registration3Scene;
