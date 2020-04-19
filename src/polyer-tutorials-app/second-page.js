import { LitElement, html } from 'lit-element';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '@polymer/paper-button/paper-button.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

class SecondComponent extends LitElement {

  // properties getter
static get properties() {
  return { 
    controls: { type: Object },
    renderer: { type: Object },
    scene: { type: Object },
    camera: { type: Object }

  };
}

  
        animate() {
        //const cb = this.animate;
        requestAnimationFrame(this.animate.bind(this));
    
        this.controls.update();

        this.renderer.render( this.scene, this.camera );
      }

      render() {
       
        this.animate();
      
      }

      async loadTextGeometry(text) {
        const loader = new THREE.FontLoader();
        return new Promise( (resolve, reject) => {
          return loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            var geometry = new THREE.TextGeometry( text, {
              font: font,
              size: 0.2,
              height: 0.02,
              curveSegments: 0.2,
              bevelEnabled: true,
              bevelThickness: 0.02,
              bevelSize: 0.01,
              bevelOffset: 0,
              bevelSegments: 1
            });
            return resolve(geometry);
          }, () => {},
          (err) => { console.log(err);
            return reject(err)})
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
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshPhongMaterial({color: "yellow"});  // greenish blue

        const cube = new THREE.Mesh(geometry, material);

        const obj = new THREE.Object3D();

        //obj.add(cube)
        const textGeom = this.loadTextGeometry('Sensor 1');

        textGeom.then( (geom) => {
          const textObject = new THREE.Mesh(geom, material);

          obj.add(textObject);

          //obj.rotateY(2.4)
          //obj.rotateZ(1.2)
          this.scene.add(obj);
  
          const color = 0xFFFFFF;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-3, 2, 4);
          this.scene.add(light);
  
          this.renderer.render(this.scene, this.camera);
          this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        })
      


      }


     
}

customElements.define('second-page', SecondComponent);