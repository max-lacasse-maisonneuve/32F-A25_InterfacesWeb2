import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// const loader = new GLTFLoader();
class Three {
    #application;
    constructor(application) {
        this.#application = application;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.render();
    }

    render() {
        this.#application.conteneurHTML.innerHTML = "";

        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        this.renderer.setAnimationLoop(this.animate.bind(this));
        this.#application.conteneurHTML.appendChild(this.renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;
    }

    animate() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}
export default Three;
