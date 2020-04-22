import { LitElement, html } from 'lit-element';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '@polymer/paper-button/paper-button.js';
//import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
              size: 0.3,
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
        this.renderer = new THREE.WebGLRenderer({canvas, antialias: false});
        this.renderer.setPixelRatio( window.devicePixelRatio );
				this.renderer.setSize( window.innerWidth, window.innerHeight );
				this.renderer.shadowMap.enabled = true;

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 1;
        const far = 10000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.camera.position.z = 5;
        this.camera.position.y = 2;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xf0f0f0  );

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshPhongMaterial({color: "yellow"});  // greenish blue

        const cube = new THREE.Mesh(geometry, material);
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );


        //obj.add(cube)
        const textGeom = this.loadTextGeometry('Sensor 1');

        textGeom.then( (geom) => {
          const textObject1 = new THREE.Mesh(geom, material);
          const textObject2 = new THREE.Mesh(geom, material);

          this.scene.add(textObject1);

          textObject2.translateX(4);
          this.scene.add(textObject2);
  
          const color = 0xFFFFFF;
          const intensity = 0.5;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-3, 2, 4);
          this.scene.add(light);

  
          var geometry = new THREE.PlaneBufferGeometry( 2000, 2000);
          var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.5 } );
          var plane = new THREE.Mesh( geometry, planeMaterial );
          plane.rotateX(- Math.PI / 2 );

          this.scene.add( plane );

        
          var helper = new THREE.GridHelper( 20, 90 );
          helper.position.y = 0;
          helper.material.opacity = 0.25;
          helper.material.transparent = false;
          this.scene.add( helper );
       

          const axesHelper = new THREE.AxesHelper(1);
          this.scene.add(axesHelper);

          this.renderer.render(this.scene, this.camera);
        })
      


      }


     
}

customElements.define('second-page', SecondComponent);