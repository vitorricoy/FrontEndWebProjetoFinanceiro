import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class Financial404 extends PolymerElement {
  static get is() {
    return 'financial-404';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      Oops you hit a 404. <a href="[[rootPath]]">Head back to home.</a>
    `;
  }
}

window.customElements.define(Financial404.is, Financial404);
