import * as THREE from 'three';

import Registration2Scene from "./registration2.scene";

import { editData } from "../Data";

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Someinfo;
var avatar;
var From;
var Guanacaste;
var SanJose;
var Cartago;
var Limon;
var Puntarenas;
var Alajuela;
var Heredia;
var Other;


function RegistrationScene(setScene) {
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
    var spotLight = new THREE.SpotLight();
    scene.add(spotLight);
    spotLight.position.set(10, 10, 10);
  }

  function setFrom(province){
    editData("from",province);
    var ns = new Registration2Scene(setScene);
    setScene(ns);
  }

  function initObjects() {
    var planeSomeinfo = new THREE.PlaneGeometry(2964 / 1150, 634 / 1150);
    var textureSomeinfo = new THREE.TextureLoader().load('static/imgs/registration_page/Someinfo.png');
    var materialSomeinfo = new THREE.MeshBasicMaterial({ map: textureSomeinfo , transparent:true});
    Someinfo = new THREE.Mesh(planeSomeinfo, materialSomeinfo);
    Someinfo.position.set(0, 2.3, 0);
    scene.add(Someinfo);

    var planeavatar = new THREE.PlaneGeometry(1717 / 1300, 1747 / 1300);
    var textureavatar = new THREE.TextureLoader().load('static/imgs/registration_page/avatar.png');
    var materialavatar = new THREE.MeshBasicMaterial({ map: textureavatar , transparent:true});
    avatar = new THREE.Mesh(planeavatar, materialavatar);
    avatar.position.set(0, 0.2, 0);
    scene.add(avatar);

    var planeFrom = new THREE.PlaneGeometry(327 / 300, 70 / 300);
    var textureFrom = new THREE.TextureLoader().load('static/imgs/registration_page/From.png');
    var materialFrom = new THREE.MeshBasicMaterial({ map: textureFrom , transparent:true});
    From = new THREE.Mesh(planeFrom, materialFrom);
    From.position.set(0, -1.65, 0);
    scene.add(From);
    
    var planeSanJose = new THREE.PlaneGeometry(763/800, 263/800);
    var textureSanJose = new THREE.TextureLoader().load('static/imgs/registration_page/SanJose.png');
    var materialSanJose = new THREE.MeshBasicMaterial({ map: textureSanJose , transparent:true});
    SanJose = new THREE.Mesh(planeSanJose, materialSanJose);
    SanJose.position.set(-1.,-2, 0.01);
    SanJose.pointer = 'pointer';
    SanJose.on('click',()=>setFrom("SAN JOSE"));
    SanJose.on('touchstart',()=>setFrom("SAN JOSE"));
    scene.add(SanJose);

    var planeLimon = new THREE.PlaneGeometry(763/800, 263/800);
    var textureLimon = new THREE.TextureLoader().load('static/imgs/registration_page/Limon.png');
    var materialLimon = new THREE.MeshBasicMaterial({ map: textureLimon , transparent:true});
    Limon = new THREE.Mesh(planeLimon, materialLimon);
    Limon.position.set(0,-2, 0.01);
    Limon.pointer = 'pointer';
    Limon.on('click',()=>setFrom("LIMON"));
    Limon.on('touchstart',()=>setFrom("LIMON"));
    scene.add(Limon);

    var planeCartago = new THREE.PlaneGeometry(763/800, 263/800);
    var textureCartago = new THREE.TextureLoader().load('static/imgs/registration_page/Cartago.png');
    var materialCartago = new THREE.MeshBasicMaterial({ map: textureCartago , transparent:true});
    Cartago = new THREE.Mesh(planeCartago, materialCartago);
    Cartago.position.set(1, -2, 0.01);
    Cartago.pointer = 'pointer';
    Cartago.on('click',()=>setFrom("CARTAGO"));
    Cartago.on('touchstart',()=>setFrom("CARTAGO"));
    scene.add(Cartago);

    var planeAlajuela = new THREE.PlaneGeometry(763/800, 263/800);
    var textureAlajuela = new THREE.TextureLoader().load('static/imgs/registration_page/Alajuela.png');
    var materialAlajuela = new THREE.MeshBasicMaterial({ map: textureAlajuela , transparent:true});
    Alajuela = new THREE.Mesh(planeAlajuela, materialAlajuela);
    Alajuela.position.set(1,-2.4, 0.01);
    Alajuela.pointer = 'pointer';
    Alajuela.on('click',()=>setFrom("ALAJUELA"));
    Alajuela.on('touchstart',()=>setFrom("ALAJUELA"));
    scene.add(Alajuela);

    var planeHeredia = new THREE.PlaneGeometry(763/800, 263/800);
    var textureHeredia = new THREE.TextureLoader().load('static/imgs/registration_page/Heredia.png');
    var materialHeredia = new THREE.MeshBasicMaterial({ map: textureHeredia , transparent:true});
    Heredia = new THREE.Mesh(planeHeredia, materialHeredia);
    Heredia.position.set(0,-2.4, 0.01);
    Heredia.pointer = 'pointer';
    Heredia.on('click',()=>setFrom("HEREDIA"));
    Heredia.on('touchstart',()=>setFrom("HEREDIA"));
    scene.add(Heredia);

    var planePuntarenas = new THREE.PlaneGeometry(763/800, 263/800);
    var texturePuntarenas = new THREE.TextureLoader().load('static/imgs/registration_page/Puntarenas.png');
    var materialPuntarenas = new THREE.MeshBasicMaterial({ map: texturePuntarenas , transparent:true});
    Puntarenas = new THREE.Mesh(planePuntarenas, materialPuntarenas);
    Puntarenas.position.set(-1,-2.4, 0.01);
    Puntarenas.pointer = 'pointer';
    Puntarenas.on('click',()=>setFrom("PUNTARENAS"));
    Puntarenas.on('touchstart',()=>setFrom("PUNTARENAS"));
    scene.add(Puntarenas);

    var planeGuanacaste = new THREE.PlaneGeometry(763/800, 264/800);
    var textureGuanacaste = new THREE.TextureLoader().load('static/imgs/registration_page/Guanacaste.png');
    var materialGuanacaste = new THREE.MeshBasicMaterial({ map: textureGuanacaste , transparent:true});
    Guanacaste = new THREE.Mesh(planeGuanacaste, materialGuanacaste);
    Guanacaste.position.set(-0.52 ,-2.8, 0.01);
    Guanacaste.pointer = 'pointer';
    Guanacaste.on('click',()=>setFrom("GUANACASTE"));
    Guanacaste.on('touchstart',()=>setFrom("GUANACASTE"));
    scene.add(Guanacaste); 

    var planeOther = new THREE.PlaneGeometry(208/250, 81/250);
    var textureOther = new THREE.TextureLoader().load('static/imgs/registration_page/Other.png');
    var materialOther = new THREE.MeshBasicMaterial({ map: textureOther , transparent:true});
    Other = new THREE.Mesh(planeOther, materialOther);
    Other.position.set(0.45,-2.8, 0.01);
    Other.pointer = 'pointer';
    Other.on('click',()=>setFrom("OTHER"));
    Other.on('touchstart',()=>setFrom("OTHER"));
    scene.add(Other); 


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
export default RegistrationScene;
