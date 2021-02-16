import * as THREE from 'three';
import { WEBGL } from './webgl'; // if browser is compatible to 3js
import { Interaction } from 'three.interaction'; // for clicks and stuff on 3js
import { initDatabase } from './firebase';

import HealthcareScene from './scenes/Healthcare.scene';
import impactScene from './scenes/Impact.scene';

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
    var firstScene = impactScene(setScene);
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
      setTimeout(() => {
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
        interaction = new Interaction(renderer, scene, camera);
        going = false;
      }, 250);
    }
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
