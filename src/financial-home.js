import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LocalStorage } from './common/financial-storage.js';

class FinancialHome extends PolymerElement {
  static get is() {
    return 'financial-home';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      Usuario Id = [[userId]]
    `;
    }

    static get properties() {
        return {
            userId: String
        }
    }

    ready() {
        super.ready();
        this.userId = LocalStorage.GetToken().user_id;
    }

}

window.customElements.define(FinancialHome.is, FinancialHome);
