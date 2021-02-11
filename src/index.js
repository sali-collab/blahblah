import * as THREE from 'three';
import { WEBGL } from './webgl'; // if browser is compatible to 3js
import { Interaction } from 'three.interaction'; // for clicks and stuff on 3js
import {initDatabase} from "./firebase";

import WelcomeScene from './scenes/Welcome.scene';
import Safety from './scenes/Safety.scene';

if (WEBGL.isWebGLAvailable()) {
  var renderer;
  var scene;
  var camera;
  var update;
  var destroy;
  var interaction;

  init();
  render();

  function init() {
    initDatabase();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    var firstScene = Safety(setScene);
    setScene(firstScene);
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function render() {
    requestAnimationFrame(render);
    if (update) update();
    if (scene && camera) renderer.render(scene, camera);
  }

  function setScene(sceneObj) {
    setTimeout(() => {
      if (destroy != null) destroy();
      scene = sceneObj.scene;
      camera = sceneObj.camera;
      update = sceneObj.update;
      destroy = sceneObj.destroy;
      interaction = new Interaction(renderer, scene, camera);
    }, 250);
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
