import * as THREE from 'three';

import TestScene from './Test.scene';

import RegistrationScene from './registration.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//Scene objs
var cube;
var logo;
var text;
var background;
var windowOfHouse;
var bin;
var DareToEnter;

function WelcomeScene(setScene) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 7);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  window.addEventListener('resize', onWindowResize, false);
  initLights();
  initObjects();

  var added = false; // objects not added before the mouse
  function overTheWindow(envet) {
    // hover
    if (!added) {
      scene.add(bin);
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
  }

  function initObjects() {
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
    var textureWindow = new THREE.TextureLoader().load('static/imgs/welcome_page/Window.png');
    var materialwindowOfHouse = new THREE.MeshBasicMaterial({ map: textureWindow, transparent: true });
    windowOfHouse = new THREE.Mesh(planeWindow, materialwindowOfHouse);
    windowOfHouse.position.set(0.1, 0.48, 0.01);
    scene.add(windowOfHouse);
    windowOfHouse.on("mouseover", overTheWindow);
    windowOfHouse.on("touchstart", overTheWindow);


    var planeBin = new THREE.PlaneGeometry(447 / 1400, 822 / 1400);
    var textureBin = new THREE.TextureLoader().load(
      'static/imgs/welcome_page/bin.png'
    );
    var materialBin = new THREE.MeshBasicMaterial({
      map: textureBin,
      transparent: true,
    });
    bin = new THREE.Mesh(planeBin, materialBin);
    bin.position.set(0.8, -0.5, 0);

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

  function update() {}

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default WelcomeScene;
