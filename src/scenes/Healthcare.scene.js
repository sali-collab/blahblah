import * as THREE from 'three';

import VirtualJoystick from '../virtualjoystick';

import voteScene from './vote.scene';
import glimpsesScene from './glimpses.scene';

const floorRadius = 40;

var Back;
var Vote;
var Message;

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
  camera.position.set(0, 45, 45);
  camera.lookAt(0, 0, 0);
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  var ball;

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('deviceorientation', handleOrientation, true);

  var joystick = new VirtualJoystick({
    mouseSupport: true,
    stationaryBase: true,
    baseX: window.innerWidth / 2,
    baseY: window.innerHeight - 150,
    limitStickTravel: true,
    stickRadius: 50,
  });

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
      }, 1000);
    }
  }

  function handleOrientation(event) {}

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
    joystick.destroy();
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
   // cylinderSound.stop();
    //torousSound.stop();
    //torousKnotSound.stop();
  }

  function click() {
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
    const refDistance = 0.8;
    // cube sound
   
    const cubeAudioElement = document.getElementById('sound-healthcare-01');
    cubeAudioElement.play();
    cubeSound = new THREE.PositionalAudio(listener);
    cubeSound.setMediaElementSource(cubeAudioElement);
    cubeSound.setRefDistance(refDistance);
    cubeSound.loop = true;
    cube.add(cubeSound);


    // cone sound
    const coneAudioElement = document.getElementById('sound-healthcare-02');
    coneAudioElement.play();
    coneSound = new THREE.PositionalAudio(listener);
    coneSound.setMediaElementSource(coneAudioElement);
    coneSound.setRefDistance(refDistance);
    coneSound.loop = true;
    cone.add(coneSound);

    
  }



  function initObjects() {
    var planeVote = new THREE.PlaneGeometry(113 / 50, 63 / 50);
    var textureVote = new THREE.TextureLoader().load(
      'static/imgs/Education_page/Vote.png'
    );
    var materialVote = new THREE.MeshBasicMaterial({
      map: textureVote,
      transparent: true,
    });
    Vote = new THREE.Mesh(planeVote, materialVote);
    Vote.position.set(5, 23, 0);
    Vote.lookAt(camera.position);
    scene.add(Vote);
    Vote.cursor = 'pointer';
    Vote.on('click', click);
    Vote.on('touchstart', click);

   Vote.on('mouseover', overTheVote);
  Vote.on('touchstart', overTheVote);

    var planeMessage = new THREE.PlaneGeometry(2163 / 1200, 1459 / 1200);
    var textureMessage = new THREE.TextureLoader().load(
      'static/imgs/Healthcare_page/Message.png'
    );
    var materialMessage = new THREE.MeshBasicMaterial({
      map: textureMessage,
      transparent: true,
    });
    Message = new THREE.Mesh(planeMessage, materialMessage);
    Message.position.set(-0.3, -1.8, 0.01);


    var planeBack = new THREE.PlaneGeometry(116 / 50, 63 / 50);
    var textureBack = new THREE.TextureLoader().load(
      'static/imgs/Education_page/Back.png'
    );
    var materialBack = new THREE.MeshBasicMaterial({
      map: textureBack,
      transparent: true,
    });
    Back = new THREE.Mesh(planeBack, materialBack);
    Back.position.set(-5, 23, 0);
    Back.lookAt(camera.position);
    scene.add(Back);
    Back.cursor = 'pointer';
    Back.on('click', clickBk);
    Back.on('touchstart', clickBk);

    // Floor code
    var floorGeometry = new THREE.CircleGeometry(floorRadius, 32);
    var floorMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0.2, 0.2, 0.2),
    });
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotateX(-Math.PI / 2);
    scene.add(floor);

    // Cube code
    var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(1, 0, 0),
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.copy(getPositionFromAngle(0));

    scene.add(cube);

    // Cone code
    var coneGeometry = new THREE.ConeGeometry(1, 2, 32);
    var coneMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0, 1, 0),
    });
    cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.castShadow = true;
    cone.receiveShadow = true;
    cone.position.copy(getPositionFromAngle(Math.PI * 0.4));
    scene.add(cone);

    // Cynder code
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const cylinderMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0, 0, 1),
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.position.copy(getPositionFromAngle(Math.PI * 0.8));
    scene.add(cylinder);

    // Torous
    const torousGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
    const torousMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.5, 0.5, 0),
    });
    const torus = new THREE.Mesh(torousGeometry, torousMaterial);
    torus.castShadow = true;
    torus.receiveShadow = true;
    torus.position.copy(getPositionFromAngle(Math.PI * 1.2));
    scene.add(torus);

    // Torousknot
    const torusKnotGeometry = new THREE.IcosahedronGeometry(1, 0);
    const torusKnotMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0.5, 0.5),
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnot.castShadow = true;
    torusKnot.receiveShadow = true;
    torusKnot.position.copy(getPositionFromAngle(Math.PI * 1.6));
    scene.add(torusKnot);

    // Ball code
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
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

  function update() {
    if (ball) {
      if (joystick._pressed) {
        direction.x = joystick.deltaX() / 50;
        direction.z = joystick.deltaY() / 50;
      }
      const movement = direction.multiplyScalar(0.25);
      ball.position.add(movement);
      ball.position.clampLength(0, floorRadius - 1);
     camera.lookAt(ball.position);
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
