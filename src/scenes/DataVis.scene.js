import * as THREE from 'three';

import { setCallback, getVotes } from '../firebase'; // setCall back incase someone makes a change, need to refresh page
import ImpactScene from './Impact.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
// Main scene objs
var camera;
var scene;
//assets

const maxVel = 0.025; // speed

const constrains = {
  NO_VOTE: { maxX: 1.5, minX: -1.25, maxY: 2.15, minY: 1.55 },
  EDUCATION: { maxX: 1.5, minX: -1.25, maxY: -0.75, minY: -1.5 },
  HEALTH: { maxX: 1.5, minX: -1.25, maxY: 1.3, minY: 0.55 },
  SAFETY: { maxX: 1.5, minX: -1.25, maxY: 0.25, minY: -0.5 },
};

var Background;
var Impact;
//var Highlight;

var objects = []; // 3D object, group that is icon + circle
var textures = []; // icons
var colors = [];

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
    // when change scene have to remove the listeners that you have
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

  function goImpact() {
    var is = ImpactScene(setScene);
    setScene(is);
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

   /*var planeHighlight = new THREE.PlaneGeometry(342 / 300, 91 / 300);
    var textureHighlight = textureLoader.load(
      'static/imgs/DataVis_page/Highlight.png'
    );
    var materialHighlight = new THREE.MeshBasicMaterial({
      map: textureHighlight,
      transparent: true,
    });
   Highlight= new THREE.Mesh(planeHighlight, materialHighlight);
   Highlight.position.set(0.2, 3.1, 0);
    scene.add(Highlight); */

    var planeImpact = new THREE.PlaneGeometry(342 / 300, 91 / 300);
    var textureImpact = textureLoader.load(
      'static/imgs/DataVis_page/Impact.png'
    );
    var materialImpact = new THREE.MeshBasicMaterial({
      map: textureImpact,
      transparent: true,
    });
    Impact = new THREE.Mesh(planeImpact, materialImpact);
    Impact.position.set(0.2, 3.1, 0.01);
    scene.add(Impact);
    Impact.cursor = 'pointer';
    Impact.on('click', goImpact);
    Impact.on('touchstart', goImpact);

    loadTexttures();
    loadColors();
    setCallback(refreshObjects); // everytime new person votes or if you make changes in database (firefox)
    refreshObjects(getVotes()); // showing or dosplaying the votes
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
    textures['OTHER'] = textureLoader.load(
      'static/imgs/DataVis_page/Other.png'
    );
  }

  function loadColors() {
    colors[0] = new THREE.Color(172 / 255, 238 / 255, 180 / 255);
    colors[1] = new THREE.Color(145/255, 233/255, 155/255);
    colors[2] = new THREE.Color(118 / 255, 228 / 255, 130 / 255);
    colors[3] = new THREE.Color(3 / 255, 216 / 255, 150 / 255);
    colors[4] = new THREE.Color(2/255, 186 / 255, 132 / 255);
    colors[5] = new THREE.Color(3 / 255, 160 / 255, 117 / 255);
  }

  function randomInRange(min, max) {
    const diff = max - min;
    return Math.random() * diff + min; // a formula
    // give me a random number between 2 numbers
  }

  function createVote(vote) {
    const from = vote.location;
    const age = vote.age;
    const option = vote.vote;
    try {
      var group = new THREE.Group(); // add different things to one object, we have grouped it

      var iconGeometry = new THREE.PlaneGeometry(372 / 1000, 321 / 1000);
      var iconMaterial = new THREE.MeshBasicMaterial({
        map: textures[from], // icon, grab icon from any of the 7 according to the location chosen
        transparent: true,
      });
      var icon = new THREE.Mesh(iconGeometry, iconMaterial);
      group.add(icon);

      var col = 0;
      if (age > 25) {
        col = 1;
      }
      if (age > 35) {
        col = 2;
      }

      if (age > 45) {
        col = 3;
      }
      if (age > 55) {
        col = 4;
      }
      if (age > 65) {
        col = 5;
      }

      var circleGeometry = new THREE.CircleGeometry(0.25, 15);
      var circleMaterial = new THREE.MeshBasicMaterial({
        color: colors[col], // vote, the colour changed according to the vote choice
      });
      var circle = new THREE.Mesh(circleGeometry, circleMaterial);
      group.add(circle);

      group.position.set(
        randomInRange(constrains[option].minX, constrains[option].maxX),
        randomInRange(constrains[option].minY, constrains[option].maxY),
        0
      );
      group.scale.setScalar(0.5);
      group.userData = {
        // variable in 3js to store info that you want
        xVel: randomInRange(-maxVel, maxVel),
        yVel: randomInRange(-maxVel, maxVel), // speed and random
        option,
      };
      objects.push(group);
      scene.add(group);
      //info added to the scene + the objects
    } catch (e) {
      console.error(e);
    }
  }

  function refreshObjects(votes) {
    console.log(votes);
    objects.forEach((obj) => {
      scene.remove(obj); // when someone adds a new vote, remove then add
    });
    votes.forEach((vote) => {
      createVote(vote);
    });
  }

  function update() {
    objects.forEach((obj) => {
      const option = obj.userData.option;
      if (obj.position.x > constrains[option].maxX) {
        obj.userData.xVel = randomInRange(-maxVel, 0);
      }
      if (obj.position.x < constrains[option].minX) {
        obj.userData.xVel = randomInRange(0, maxVel);
      }
      if (obj.position.y > constrains[option].maxY) {
        obj.userData.yVel = randomInRange(-maxVel, 0);
      }
      if (obj.position.y < constrains[option].minY) {
        obj.userData.yVel = randomInRange(0, maxVel);
      }
      obj.position.add(
        new THREE.Vector3(obj.userData.xVel, obj.userData.yVel, 0)
      );

      // votes move randomly, with the defined velocity in the space that you have (constrained space).
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
