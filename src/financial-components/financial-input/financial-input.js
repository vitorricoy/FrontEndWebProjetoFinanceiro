import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input.js';

class FinancialInput extends PolymerElement {
  static get is() {
    return 'financial-input';
  }

  static get template() {
    return html`
      <style>
        .input {
          width: 100%;
        }

        #ironInput {
          width: 100%;
        }
      </style>
      <div class="input">
        <iron-input id="ironInput" slot="input" bind-value="{{financialData}}">
            <paper-input id="financialInput" type="[[financialType]]" value="{{financialData}}" placeholder="[[financialPlaceholder]]"></paper-input>
        </iron-input>
      </div>
    `;
  }

  static get properties() {
    return {
      financialData: {
        type: String,
        value: "",
        reflectToAttribute: true,
        notify: true
      },
      financialType: String,
      financialPlaceholder: String
    }
  }
}

window.customElements.define(FinancialInput.is, FinancialInput);