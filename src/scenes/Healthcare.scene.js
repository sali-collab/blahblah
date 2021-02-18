import * as THREE from 'three';

import VirtualJoystick from '../virtualjoystick';

import voteScene from './vote.scene';
import glimpsesScene from './glimpses.scene';

// Loaders
var textureLoader = new THREE.TextureLoader();
var audioLoader = new THREE.AudioLoader();
var fontLoader = new THREE.FontLoader();

const floorRadius = 40;
var Back;
var Vote;
var Message;
var readyToVote;
var Floor;

var tiltValues = {
  gamma: 0,
  beta: 0,
};
var tiltAvailable = false;
var joystick = false;
var htmlele;

function Healthcare(setScene) {
  var direction = new THREE.Vector3();
  var listener = new THREE.AudioListener();

  var cubeSound, coneSound, cylinderSound, torousSound, torousKnotSound;
  var cube, cone, cylinder, torous, torousKnot;

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  var ball;

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('deviceorientation', handleOrientation, true);
  setTimeout(() => addJoystick(), 1000);

  function addJoystick() {
    if (!tiltAvailable) {
      htmlele = document.getElementById('joycontainer');
      htmlele.style.display = 'contents';
      htmlele.style.position = 'absolute';
      joystick = new VirtualJoystick({
        container: htmlele,
        mouseSupport: true,
        stationaryBase: true,
        baseX: window.innerWidth / 2,
        baseY: window.innerHeight - 150,
        limitStickTravel: true,
        stickRadius: 50,
      });
    }
  }

  initLights();
  initObjects();
  loadAudios();

  var added = false; // objects not added before the mouse
  function overTheVote(envet) {
    // hover
    if (!added) {
      added = true;
      setTimeout(() => {
        scene.add(Message);
        scene.add(readyToVote);
      }, 250);
    }
  }

  function handleOrientation(event) {
    if (event.alpha || event.beta || event.gamma) {
      tiltAvailable = true;
      tiltValues.gamma = event.gamma / 90;
      tiltValues.beta = event.beta / 180;
      if (tiltValues.gamma > 1) tiltValues.gamma = 1;
      if (tiltValues.gamma < -1) tiltValues.gamma = -1;
      if (tiltValues.beta > 1) tiltValues.beta = 1;
      if (tiltValues.beta < -1) tiltValues.beta = -1;
    }
  }

  function onKeyDown(event) {
    var code = event.code;
    switch (code) {
      case 'ArrowLeft':
        direction.x = -1;
        break;
      case 'ArrowRight':
        direction.x = 1;
        break;
      case 'ArrowDown':
        direction.z = 1;
        break;
      case 'ArrowUp':
        direction.z = -1;
        break;
    }
  }

  function onKeyUp(event) {
    var code = event.code;
    switch (code) {
      case 'ArrowRight':
      case 'ArrowLeft':
        direction.x = 0;
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        direction.z = 0;
        break;
    }
  }

  function destroy() {
    window.removeEventListener('resize', onWindowResize);
    if (!tiltAvailable) {
      htmlele.style.display = 'none';
      joystick.destroy();
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  function initLights() {
    var spotLight = new THREE.SpotLight();
    scene.add(spotLight);
    spotLight.position.set(20, 20, 20);
    spotLight.lookAt(0, 0, 0);
    spotLight.castShadow = true;
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
  }

  function getPositionFromAngle(angle, yPos = 1) {
    const x = Math.sin(angle) * (floorRadius - 2);
    const y = Math.cos(angle) * (floorRadius - 2);
    return new THREE.Vector3(x, yPos, y);
  }

  function stopAll() {
    cubeSound.stop();
    coneSound.stop();
    cylinderSound.stop();
    torousSound.stop();
    torousKnotSound.stop();
  }

  function voteNow() {
    stopAll();
    var ns = voteScene(setScene);
    setScene(ns);
  }

  function clickBk() {
    stopAll();
    var bs = glimpsesScene(setScene);
    setScene(bs);
  }

  function loadAudios() {
    const refDistance = 0.5;
    // cube sound
    cubeSound = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/Healthcare/audio1.mp3', function (buffer) {
      cubeSound.setBuffer(buffer);
      cubeSound.setLoop(true);
      cubeSound.setRefDistance(refDistance);
      cubeSound.play();
      cube.add(cubeSound);
    });

    // cone sound
    coneSound = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/Healthcare/audio2.mp3', function (buffer) {
      coneSound.setBuffer(buffer);
      coneSound.setLoop(true);
      coneSound.setRefDistance(refDistance);
      coneSound.play();
      cone.add(coneSound);
    });

    // Cylinder sound
    cylinderSound = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/Healthcare/audio3.mp3', function (buffer) {
      cylinderSound.setBuffer(buffer);
      cylinderSound.setLoop(true);
      cylinderSound.setRefDistance(refDistance);
      cylinderSound.play();
      cylinder.add(cylinderSound);
    });

    // Torous sound
    torousSound = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/Healthcare/audio4.mp3', function (buffer) {
      torousSound.setBuffer(buffer);
      torousSound.setLoop(true);
      torousSound.setRefDistance(refDistance);
      torousSound.play();
      torous.add(torousSound);
    });

    // Torous sound
    torousKnotSound = new THREE.PositionalAudio(listener);
    audioLoader.load('static/audios/Healthcare/audio5.mp3', function (buffer) {
      torousKnotSound.setBuffer(buffer);
      torousKnotSound.setLoop(true);
      torousKnotSound.setRefDistance(refDistance);
      torousKnotSound.play();
      torousKnot.add(torousKnotSound);
    });
  }

  function initObjects() {
    var planeVote = new THREE.PlaneGeometry(113 / 15, 63 / 15);
    var textureVote = new THREE.TextureLoader().load(
      'static/imgs/Healthcare_page/Vote.png'
    );
    var materialVote = new THREE.MeshBasicMaterial({
      map: textureVote,
      transparent: true,
    });
    Vote = new THREE.Mesh(planeVote, materialVote);
    scene.add(Vote);
    Vote.on('click', overTheVote);
    Vote.on('touchstart', overTheVote);

    var planeMessage = new THREE.PlaneGeometry(152 / 20, 73 / 20);
    var textureMessage = new THREE.TextureLoader().load(
      'static/imgs/Healthcare_page/Message.png'
    );
    var materialMessage = new THREE.MeshBasicMaterial({
      map: textureMessage,
      transparent: true,
    });
    Message = new THREE.Mesh(planeMessage, materialMessage);

    var planereadyToVote = new THREE.PlaneGeometry(426 / 150, 191 / 150);
    var texturereadyToVote = new THREE.TextureLoader().load(
      'static/imgs/Healthcare_page/readyToVote.png'
    );
    var materialreadyToVote = new THREE.MeshBasicMaterial({
      map: texturereadyToVote,
      transparent: true,
    });
    readyToVote = new THREE.Mesh(planereadyToVote, materialreadyToVote);
    readyToVote.on('touchstart', voteNow);
    readyToVote.on('click', voteNow);

    var planeBack = new THREE.PlaneGeometry(116 / 15, 63 / 15);
    var textureBack = new THREE.TextureLoader().load(
      'static/imgs/Education_page/Back.png'
    );
    var materialBack = new THREE.MeshBasicMaterial({
      map: textureBack,
      transparent: true,
    });
    Back = new THREE.Mesh(planeBack, materialBack);
    scene.add(Back);
    Back.cursor = 'pointer';
    Back.on('click', clickBk);
    Back.on('touchstart', clickBk);

    // Floor code

    var planeFloor = new THREE.PlaneGeometry(512 / 1, 512 / 1);
    var textureFloor = new THREE.TextureLoader().load(
      'static/imgs/Healthcare_page/Floor.png'
    );
    var materialFloor = new THREE.MeshBasicMaterial({
      map: textureFloor,
      transparent: true,
    });
    Floor = new THREE.Mesh(planeFloor, materialFloor);

    Floor.rotateX(-Math.PI / 2);
    Floor.receiveShadow = true;
    scene.add(Floor);

    // Cube code
    var cubeGeometry = new THREE.BoxGeometry(7, 7, 7);
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(1, 0, 0),
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.copy(getPositionFromAngle(0));

    scene.add(cube);

    // Cone code
    var coneGeometry = new THREE.ConeGeometry(5, 20, 32);
    var coneMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(174, 120, 0),
    });
    cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.castShadow = true;
    cone.receiveShadow = true;
    cone.position.copy(getPositionFromAngle(Math.PI * 0.4));
    scene.add(cone);

    // Cynder code
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const cylinderMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(174, 120, 0),
    });
    cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.position.copy(getPositionFromAngle(Math.PI * 0.8));
    scene.add(cylinder);

    // Torous
    const torousGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
    const torousMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.5, 0.5, 0),
    });
    torous = new THREE.Mesh(torousGeometry, torousMaterial);
    torous.castShadow = true;
    torous.receiveShadow = true;
    torous.position.copy(getPositionFromAngle(Math.PI * 1.2));
    scene.add(torous);

    // Torousknot
    const torusKnotGeometry = new THREE.IcosahedronGeometry(1, 0);
    const torusKnotMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0.5, 0.5),
    });
    torousKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torousKnot.castShadow = true;
    torousKnot.receiveShadow = true;
    torousKnot.position.copy(getPositionFromAngle(Math.PI * 1.6));
    scene.add(torousKnot);

    // Ball code
    const ballGeometry = new THREE.BoxGeometry(2, 1, 1);
    const ballMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0, 0, 48),
    });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.castShadow = true;
    ball.receiveShadow = true;
    ball.position.set(0, 0.5, 0);
    ball.add(listener); // add the listener to the ball
    scene.add(ball);
  }

  function updateBasic(obj) {
    obj.position.copy(camera.position);
    obj.rotation.copy(camera.rotation);
    obj.updateMatrix();
    obj.translateZ(-80);
    obj.translateY(30);
  }

  function updatePositionUI() {
    updateBasic(Vote);
    Vote.translateX(12);

    updateBasic(Message);
    Message.translateX(12);
    Message.translateY(-4.5);

    updateBasic(readyToVote);
    readyToVote.translateX(12);
    readyToVote.translateY(-7.5);

    updateBasic(Back);
    Back.translateX(-12);
  }

  function updateCameraPosition() {
    var rotZ = Math.cos(ball.rotation.y);
    var rotX = Math.sin(ball.rotation.y);
    var distance = 15;
    camera.position.x = ball.position.x - distance * rotX;
    camera.position.y = ball.position.y + 5;
    camera.position.z = ball.position.z - distance * rotZ;
    camera.lookAt(ball.position);
  }

  function updatePlayerPosition() {
    ball.rotation.y += direction.x;
    if (direction.y > 0.1 || direction.y < -0.1) {
      const y = Math.cos(ball.rotation.y) * direction.y * 0.5;
      const x = Math.sin(ball.rotation.y) * direction.y * 0.5;
      ball.position.x += x;
      ball.position.z += y;
    }
  }

  function update() {
    if (ball) {
      direction.x = 0;
      direction.y = 0;
      if (joystick && joystick._pressed) {
        direction.x = -joystick.deltaX() / 1000;
        direction.y = -joystick.deltaY() / 100; // increase number to make it less sensitive
      }
      if (tiltAvailable) {
        direction.x = tiltValues.gamma * -0.1;
        direction.y = tiltValues.beta * -3;
      }
      updatePlayerPosition();
      updateCameraPosition();
      updatePositionUI();
    }
  }
  return {
    scene,
    camera,
    update,
    destroy,
  };
}

export default Healthcare;
