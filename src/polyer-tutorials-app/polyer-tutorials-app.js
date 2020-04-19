import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "./snarain-comp"
import "./second-page"
/**
 * @customElement
 * @polymer
 */
class PolyerTutorialsApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <snarain-comp> </snarain-comp>
      <second-page> </second-page>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polyer-tutorials-app'
      }
    };
  }
}

window.customElements.define('polyer-tutorials-app', PolyerTutorialsApp);
