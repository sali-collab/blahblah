import * as THREE from 'three';
import { Color } from 'three';
import { editData, getData } from '../Data';

import glimpsesScene from "./glimpses.scene";

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets 

var background;

var firstLetter = true;
var text = "";
var textMesh;
var font;
var Submit;



function NameScene(setScene) {
  document.getElementById('inputText').click();
  const color = getData("color");
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
  document.addEventListener('keypress', onDocumentKeyPress);
  document.addEventListener('keydown', onDocumentKeyDown);


  function destroy() {
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('keypress', onDocumentKeyPress);
    document.removeEventListener('keydown', onDocumentKeyDown);
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

  function setName(name) {
    editData("name", name);
    var ns = glimpsesScene(setScene);
    setScene(ns);
  }

  function initObjects() {
    var planeRedChoice = new THREE.PlaneGeometry(1080 / 300, 1920 / 300);
    var imgUrl = 'static/imgs/name_page/RedChoice.png';
    if (color == "PINK") {
      imgUrl = 'static/imgs/name_page/PinkChoice.png';
    }
    if (color == "GREEN") {
      imgUrl = 'static/imgs/name_page/GreenChoice.png';
    }
    var textureRedChoice = new THREE.TextureLoader().load(imgUrl);
    var materialRedChoice = new THREE.MeshBasicMaterial({ map: textureRedChoice, transparent: true });
    background = new THREE.Mesh(planeRedChoice, materialRedChoice);
    background.position.set(0, 0, 0);

    background.on("click",()=>{
      document.getElementById('inputText').focus();
    });

    scene.add(background);
    fontLoader.load('static/fonts/helvetiker_regular.typeface.json', (resource) => {
      font = resource;
      createText();
    });

    var planeSubmit = new THREE.PlaneGeometry(202/250, 100/250);
    var textureSubmit = new THREE.TextureLoader().load('static/imgs/name_page/Submit.png');
    var materialSubmit = new THREE.MeshBasicMaterial({ map: textureSubmit , transparent:true});
    Submit = new THREE.Mesh(planeSubmit, materialSubmit);
    Submit.position.set(0, -2.75, 0.01);
    Submit.cursor = "pointer";
    Submit.on('click', () => setName(text));
    Submit.on('touchstart', () => setName(text));
    scene.add(Submit);

 

  
    
  }

  function onDocumentKeyDown(event) {

    if (firstLetter) {
      firstLetter = false;
      text = "";
    }
    const keyCode = event.keyCode;
    // backspace
    if (keyCode == 8) {
      event.preventDefault();
      text = text.substring(0, text.length - 1);// remove the last character from the string
      refreshText();
      return false;
    }

  }

  function onDocumentKeyPress(event) {
    const keyCode = event.which;
    if (keyCode == 8) {// if backspace do nothing
      event.preventDefault();
    } else {
      const ch = String.fromCharCode(keyCode);
      text += ch;
      refreshText();
    }
  }

  function createText() {
    const matLite = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const shapes = font.generateShapes(text, 1);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    textMesh = new THREE.Mesh(geometry, matLite);
    textMesh.position.set(-3, -7, -20);
    scene.add(textMesh);
  }

  function refreshText() {
    if (textMesh) scene.remove(textMesh);
    if (text) createText();
  }

  function update() { }

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default NameScene;
