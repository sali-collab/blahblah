import * as THREE from 'three';
import { Color, Vector3 } from 'three';

import { setCallback, getVotes } from '../firebase';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets

const constrains = {
  xMax: 1.25,
  xMin: -1,
  yMax: 2.5,
  yMin: -1,
};
const maxVel = 0.05;

var Background;
var Impact;

var objects = [];
var textures = [];
var colors = [];
var sizes = [];

function DataVisScene(setScene) {
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
    camera.position.set(0, 10, 0);
  }
  function initLights() {
    // spotlight, and spotLight helper
    var spotLight = new THREE.SpotLight();
    scene.add(spotLight);
    spotLight.position.set(10, 10, 10);
  }

  function initObjects() {
    var planeBackground = new THREE.PlaneGeometry(1080 / 300, 1920 / 300);
    var textureBackground = textureLoader.load(
      'static/imgs/DataVis_page/Background.png'
    );
    var materialBackground = new THREE.MeshBasicMaterial({
      map: textureBackground,
      transparent: true,
    });
    Background = new THREE.Mesh(planeBackground, materialBackground);
    Background.position.set(0, 0, 0);
    scene.add(Background);

    var planeImpact = new THREE.PlaneGeometry(75 / 300, 268 / 300);
    var textureImpact = textureLoader.load(
      'static/imgs/DataVis_page/Impact.png'
    );
    var materialImpact = new THREE.MeshBasicMaterial({
      map: textureImpact,
      transparent: true,
    });
    Impact = new THREE.Mesh(planeImpact, materialImpact);
    Impact.position.set(1.6, 0, 0);
    scene.add(Impact);
    loadTexttures();
    loadColors();
    loadSize();
    setCallback(refreshObjects);
    refreshObjects(getVotes());
  }

  function loadTexttures() {
    textures['ALAJUELA'] = textureLoader.load(
      'static/imgs/DataVis_page/Alajuela.png'
    );
    textures['CARTAGO'] = textureLoader.load(
      'static/imgs/DataVis_page/Cartago.png'
    );
    textures['GUANACASTE'] = textureLoader.load(
      'static/imgs/DataVis_page/Guanacaste.png'
    );
    textures['HEREDIA'] = textureLoader.load(
      'static/imgs/DataVis_page/Heredia.png'
    );
    textures['LIMON'] = textureLoader.load(
      'static/imgs/DataVis_page/Limon.png'
    );
    textures['PUNTARENAS'] = textureLoader.load(
      'static/imgs/DataVis_page/Puntarenas.png'
    );
    textures['SAN JOSE'] = textureLoader.load(
      'static/imgs/DataVis_page/SanJose.png'
    );
  }

  function loadColors() {
    colors['NO_VOTE'] = new Color(25, 0, 0);
    colors['EDUCATION'] = new Color(0, 25, 0);
    colors['HEALTH'] = new Color(0, 0, 25);
    colors['SAFETY'] = new Color(0, 25, 25);
  }

  function loadSize() {
    sizes[18] = 0.4;
    sizes[25] = 0.5;
    sizes[35] = 0.6;
    sizes[45] = 0.7;
    sizes[55] = 0.8;
    sizes[65] = 1;
  }

  function randomInRange(min, max) {
    const diff = max - min;
    return Math.random() * diff + min;
  }

  function createVote(vote) {
    const from = vote.location;
    const age = vote.age;
    const option = vote.vote;
    try {
      var group = new THREE.Group();

      var iconGeometry = new THREE.PlaneGeometry(372 / 1000, 321 / 1000);
      var iconMaterial = new THREE.MeshBasicMaterial({
        map: textures[from],
        transparent: true,
      });
      var icon = new THREE.Mesh(iconGeometry, iconMaterial);
      group.add(icon);

      var circleGeometry = new THREE.CircleGeometry(0.25, 15);
      var circleMaterial = new THREE.MeshBasicMaterial({
        color: colors[option],
      });
      var circle = new THREE.Mesh(circleGeometry, circleMaterial);
      group.add(circle);
      group.scale.setScalar(sizes[age]);

      group.position.set(
        randomInRange(constrains.xMin, constrains.xMax),
        randomInRange(constrains.yMin, constrains.yMax),
        0
      );

      group.userData = {
        xVel: randomInRange(-maxVel,maxVel),
        yVel: randomInRange(-maxVel, maxVel),
      };
      objects.push(group);
      scene.add(group);
    } catch (e) {
      console.error(e);
    }
  }

  function refreshObjects(votes) {
    objects.forEach((obj) => {
      scene.remove(obj);
    });
    votes.forEach((vote) => {
      createVote(vote);
    });
  }

  function update() {
    objects.forEach((obj) => {
      if(obj.position.x>constrains.xMax){
        obj.userData.xVel = randomInRange(-maxVel,0);
      }
      if(obj.position.x<constrains.xMin){
        obj.userData.xVel = randomInRange(0,maxVel);
      }
      if(obj.position.y>constrains.yMax){
        obj.userData.yVel = randomInRange(-maxVel,0);
      }
      if(obj.position.y<constrains.yMin){
        obj.userData.yVel = randomInRange(0,maxVel);
      }
      obj.position.add(new Vector3(obj.userData.xVel,obj.userData.yVel,0));
    });
  }

  return {
    scene,
    camera,
    update,
    destroy,
  };
}
export default DataVisScene;
