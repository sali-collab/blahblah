import * as THREE from 'three';

import TestScene from './Test.scene';

import RegistrationScene from './registration.scene';

// Loaders
const audioLoader = new THREE.AudioLoader();
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
var listener = new THREE.AudioListener();
//Scene objs
var background;
var windowOfHouse;
var DareToEnter;

var binTextures;
var bin;
var actualBinTexture = 1;
var flyAudio;

function WelcomeScene(setScene) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 7);
  camera.add(listener);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);
  initLights();
  loadBinTextures();
  initObjects();

  var added = false; // objects not added before the mouse
  function overTheWindow(envet) {
    // hover
    if (!added) {
      added = true;
      setTimeout(() => {
        scene.add(DareToEnter);
      }, 1000);
    }
  }

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

  function go() {
    var ns = RegistrationScene(setScene);
    setScene(ns);
    flyAudio.stop();
  }

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  function loadBinTextures() {
    binTextures = [];
    for (var index = 1; index <= 9; ++index) {
      const filename = 'fly' + pad(index, 2) + '.png';
      binTextures[index] = textureLoader.load(
        '/static/imgs/welcome_page/flyAnima/' + filename
      );
    }
  }

  function createBin() {
    if (bin) scene.remove(bin);
    var planeBin = new THREE.PlaneGeometry(300 / 300, 300 / 300);
    var materialBin = new THREE.MeshBasicMaterial({
      map: binTextures[actualBinTexture],
      transparent: true,
    });
    bin = new THREE.Mesh(planeBin, materialBin);
    bin.position.set(0.8, -0.5, 0);
    scene.add(bin);
  }

  function initObjects() {
    flyAudio = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/flySound.mp3', function (buffer) {
      flyAudio.setBuffer(buffer);
      flyAudio.setRefDistance(1);
      flyAudio.setLoop(true);
      background.add(flyAudio);
    });
    var plane = new THREE.PlaneGeometry(1080 / 400, 1920 / 400);
    var texture = new THREE.TextureLoader().load(
      'static/imgs/welcome_page/background.png'
    );
    var materialBackground = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    background = new THREE.Mesh(plane, materialBackground);
    background.position.set(0, 0, 0);
    scene.add(background);

    var planeWindow = new THREE.PlaneGeometry(229 / 1250, 431 / 1250);
    var textureWindow = new THREE.TextureLoader().load(
      'static/imgs/welcome_page/Window.png'
    );
    var materialwindowOfHouse = new THREE.MeshBasicMaterial({
      map: textureWindow,
      transparent: true,
    });
    windowOfHouse = new THREE.Mesh(planeWindow, materialwindowOfHouse);
    windowOfHouse.position.set(0.1, 0.48, 0.01);
    scene.add(windowOfHouse);
    windowOfHouse.on('mouseover', overTheWindow);
    windowOfHouse.on('touchstart', overTheWindow);

    var planeWindow = new THREE.PlaneGeometry(229 / 1250, 431 / 1250);
    var textureWindow = new THREE.TextureLoader().load(
      'static/imgs/welcome_page/window.png'
    );
    var materialwindowOfHouse = new THREE.MeshBasicMaterial({
      map: textureWindow,
      transparent: true,
    });
    windowOfHouse = new THREE.Mesh(planeWindow, materialwindowOfHouse);
    windowOfHouse.position.set(0.1, 0.48, 0.1);
    scene.add(windowOfHouse);
    windowOfHouse.on('mouseover', overTheWindow);
    windowOfHouse.on('touchstart', overTheWindow);

    var planeDareToEnter = new THREE.PlaneGeometry(2163 / 1200, 1459 / 1200);
    var textureDareToEnter = new THREE.TextureLoader().load(
      'static/imgs/welcome_page/DareToEnter.png'
    );
    var materialDareToEnter = new THREE.MeshBasicMaterial({
      map: textureDareToEnter,
      transparent: true,
    });
    DareToEnter = new THREE.Mesh(planeDareToEnter, materialDareToEnter);
    DareToEnter.position.set(-0.3, -1.8, 0.01);

    DareToEnter.cursor = 'pointer';
    DareToEnter.on('click', go);
    DareToEnter.on('touchstart', go);
  }

  let counter = 10;
  function update() {
    if (added) {
      if (flyAudio && !flyAudio.isPlaying) flyAudio.play();
      counter--;
      if (counter == 0) {
        counter = 10;
        actualBinTexture++;

        if (actualBinTexture > 9) {
          actualBinTexture = 1;
        }
        createBin();
      }
    }
  }

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default WelcomeScene;
