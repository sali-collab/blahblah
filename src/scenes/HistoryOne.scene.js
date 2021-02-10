import * as THREE from 'three';


function HistoryOne(setScene) {
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
        window.removeEventListener('resize', onWindowResize);
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

    function update() {

    }

    return {
        scene,
        camera,
        update,
        destroy,
    };
}


export default HistoryOne;