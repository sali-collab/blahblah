import * as THREE from 'three';
import { editData } from "../Data";

import Registration3Scene from "./registration3.scene";

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var Colour;
var avatar;
var PinkChip;
var GreenChip;
var RedChip;



function Registration2Scene(setScene) {
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

  function setColor(col) {
    editData("color", col);
    const ns = new Registration3Scene(setScene);
    setScene(ns);
  }

  function initObjects() {

    var planeColour = new THREE.PlaneGeometry(237 / 350, 71 / 350);
    var textureColour = new THREE.TextureLoader().load('static/imgs/registration2_page/Colour.png');
    var materialColour = new THREE.MeshBasicMaterial({ map: textureColour, transparent: true });
    Colour = new THREE.Mesh(planeColour, materialColour);
    Colour.position.set(0, -2, 0);
    scene.add(Colour);

    var planeavatar = new THREE.PlaneGeometry(1717 / 1300, 1747 / 1300);
    var textureavatar = new THREE.TextureLoader().load('static/imgs/registration_page/avatar.png');
    var materialavatar = new THREE.MeshBasicMaterial({ map: textureavatar, transparent: true });
    avatar = new THREE.Mesh(planeavatar, materialavatar);
    avatar.position.set(0, 0.2, 0);
    scene.add(avatar);

    var planeGreenChip = new THREE.PlaneGeometry(127 / 250, 120 / 250);
    var textureGreenChip = new THREE.TextureLoader().load('static/imgs/registration2_page/GreenChip.png');
    var materialGreenChip = new THREE.MeshBasicMaterial({ map: textureGreenChip, transparent: true });
    GreenChip = new THREE.Mesh(planeGreenChip, materialGreenChip);
    GreenChip.position.set(-0.7, -2.6, 0.01);
    GreenChip.pointer = "pointer"
    GreenChip.on("click", () => setColor("GREEN"));
    GreenChip.on("touchstart", () => setColor("GREEN"));
    scene.add(GreenChip);

    var planePinkChip = new THREE.PlaneGeometry(127 / 250, 120 / 250);
    var texturePinkChip = new THREE.TextureLoader().load('static/imgs/registration2_page/PinkChip.png');
    var materialPinkChip = new THREE.MeshBasicMaterial({ map: texturePinkChip, transparent: true });
    PinkChip = new THREE.Mesh(planePinkChip, materialPinkChip);
    PinkChip.position.set(0, -2.6, 0.01);
    PinkChip.pointer = "pointer";
    PinkChip.on("click", () => setColor("PINK"));
    PinkChip.on("touchstart", () => setColor("PINK"));
    scene.add(PinkChip);

    var planeRedChip = new THREE.PlaneGeometry(127 / 250, 120 / 250);
    var textureRedChip = new THREE.TextureLoader().load('static/imgs/registration2_page/RedChip.png');
    var materialRedChip = new THREE.MeshBasicMaterial({ map: textureRedChip, transparent: true });
    RedChip = new THREE.Mesh(planeRedChip, materialRedChip);
    RedChip.position.set(0.7, -2.6, 0.01);
    RedChip.pointer = "pointer";
    RedChip.on("click", () => setColor("RED"));
    RedChip.on("touchstart", () => setColor("RED"));
    scene.add(RedChip);
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
export default Registration2Scene;
