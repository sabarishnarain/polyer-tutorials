import { LitElement, html } from 'lit-element';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '@polymer/paper-button/paper-button.js';

class SnarainComponent extends LitElement {

    render() {
        return html`
        <style>
        :host {
          display: block;
        }
      </style>
          <p> Sabarish is here </p>
          <paper-button raised class="custom indigo">raised</paper-button>
          `;
      }

      constructor() {
        super();
      }

     
}

customElements.define('snarain-comp', SnarainComponent);