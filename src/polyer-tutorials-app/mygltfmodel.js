import { LitElement } from "lit-element";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class GLTFModel extends LitElement {

  // properties getter
  static get properties() {
    return { 
      controls: { type: Object },
      renderer: { type: Object },
      scene: { type: Object },
      camera: { type: Object }
  
    };
  }

  render() {

    var loader = new GLTFLoader();

    loader.load('assets/Duck.gltf', (gltf) => {
      this.scene.add( gltf.scene );
      const color = 0xFFFFFF;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-3, 2, 4);
          this.scene.add(light);

          this.renderer.render(this.scene, this.camera);
          this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    }, () => {

    }, (err) => {
      console.error(err);
    })      
   }


  constructor() {

    super();
    const canvas = document.querySelector('#c');
    this.renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.z = 2;
    this.scene = new THREE.Scene();
    
  }

}

window.customElements.define('my-gltfmodel', GLTFModel);