import * as THREE from 'three';
import { WEBGL } from './webgl'; // if browser is compatible to 3js
import { Interaction } from 'three.interaction'; // for clicks and stuff on 3js
import { initDatabase } from './firebase';

import registration2Scene from './scenes/registration2.scene';

if (WEBGL.isWebGLAvailable()) {
  var renderer;
  var scene;
  var camera;
  var update;
  var destroy;
  var interaction;

  init();
  render();

  function preventBehavior(e) {
    e.preventDefault();
  }

  function init() {
    initDatabase();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('touchmove', preventBehavior, { passive: false });
    var firstScene = registration2Scene(setScene);
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
  var going = false;
  function setScene(sceneObj) {
    if (!going) {
      going = true;
      if (destroy != null) destroy();
      if (scene) {
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
      }
      scene = sceneObj.scene;
      camera = sceneObj.camera;
      update = sceneObj.update;
      destroy = sceneObj.destroy;
      setTimeout(() => {
        interaction = new Interaction(renderer, scene, camera);
        going = false;
      }, 1000);
    }
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
