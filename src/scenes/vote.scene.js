import * as THREE from 'three';

import { pushVote } from '../firebase';
import { getData } from '../Data';

import DataVisScene from './DataVis.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets

var Background;
var voteNo;
var voteEdu;
var voteHealth;
var voteSaf;

function voteScene(setScene, color) {
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

  function voteFor(option) {
    const age = getData('age');
    const location = getData('from');
    pushVote(age, location, option);
    const ns = DataVisScene(setScene);
    setScene(ns);
  }

  function initObjects() {
    var planeBackground = new THREE.PlaneGeometry(1080 / 270, 1920 / 270);
    var textureBackground = textureLoader.load(
      'static/imgs/vote_page/Background.png'
    );
    var materialBackground = new THREE.MeshBasicMaterial({
      map: textureBackground,
      transparent: true,
    });
    Background = new THREE.Mesh(planeBackground, materialBackground);
    Background.position.set(0, -0.2, 0);
    scene.add(Background);

    var planevoteEdu = new THREE.PlaneGeometry(430 / 1350, 381 / 1350);
    var texturevoteEdu = textureLoader.load(
      'static/imgs/vote_page/voteEdu.png'
    );
    var materialvoteEdu = new THREE.MeshBasicMaterial({
      map: texturevoteEdu,
      transparent: true,
    });
    voteEdu = new THREE.Mesh(planevoteEdu, materialvoteEdu);
    voteEdu.position.set(-1.1, 0.47, 0.01);
    voteEdu.pointer = "pointer";
    voteEdu.on("click",()=>voteFor("EDUCATION"));
    voteEdu.on("touchstart",()=>voteFor("EDUCATION"));
    scene.add(voteEdu);

    var planevoteSaf = new THREE.PlaneGeometry(430 / 1350, 381 / 1350);
    var texturevoteSaf = textureLoader.load(
      'static/imgs/vote_page/voteSaf.png'
    );
    var materialvoteSaf = new THREE.MeshBasicMaterial({
      map: texturevoteSaf,
      transparent: true,
    });
    voteSaf = new THREE.Mesh(planevoteSaf, materialvoteSaf);
    voteSaf.position.set(-1.1, 0, 0.01);
    voteSaf.pointer = "pointer";
    voteSaf.on("click",()=>voteFor("SAFETY"));
    voteSaf.on("touchstart",()=>voteFor("SAFETY"));
    scene.add(voteSaf);

    var planevoteHealth = new THREE.PlaneGeometry(430 / 1350, 381 / 1350);
    var texturevoteHealth = textureLoader.load(
      'static/imgs/vote_page/voteHealth.png'
    );
    var materialvoteHealth = new THREE.MeshBasicMaterial({
      map: texturevoteHealth,
      transparent: true,
    });
    voteHealth = new THREE.Mesh(planevoteHealth, materialvoteHealth);
    voteHealth.position.set(-1.1, -0.5, 0.01);
    voteHealth.pointer = "pointer";
    voteHealth.on("click",()=>voteFor("HEALTH"));
    voteHealth.on("touchstart",()=>voteFor("HEALT"));
    scene.add(voteHealth);

    var planevoteNo = new THREE.PlaneGeometry(430 / 1350, 381 / 1350);
    var texturevoteNo = textureLoader.load('static/imgs/vote_page/voteNo.png');
    var materialvoteNo = new THREE.MeshBasicMaterial({
      map: texturevoteNo,
      transparent: true,
    });
    voteNo = new THREE.Mesh(planevoteNo, materialvoteNo);
    voteNo.position.set(-1.1, -1, 0.01);
    voteNo.pointer = "pointer";
    voteNo.on("click",()=>voteFor("NO_VOTE"));
    voteNo.on("touchstart",()=>voteFor("NO_VOTE"));
    scene.add(voteNo);
  }

  function update() {}

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default voteScene;
