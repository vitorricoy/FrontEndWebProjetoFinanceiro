import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './common/shared-styles.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import './financial-components/financial-input/financial-input.js';

class FinancialLogin extends PolymerElement {
  static get is() {
    return 'financial-login';
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        .wrapper-btns {
          margin-top: 15px;
        }

        paper-button.link {
            color: #757575;
        }

        .inputs {
          display: flex;
          flex-direction: column;
          padding: 10px;
          width: 90%;
        }

        .instructions {
          padding: 10px;
        }
      </style>

      <div class="card">
        <div id="unauthenticated">
            <div class="instructions">
              <h1>Entrar</h1>
              <p><strong>Entre</strong> ou <strong>cadastre</strong> para acessar o sistema.</p>
            </div>

            <div class="inputs">
              <financial-input id="userNameInput" financial-type="text" financial-placeholder="Usuario" financial-data="{{loginData.username}}"></financial-input>
              <financial-input id="passwordInput" financial-type="text" financial-placeholder="Senha" financial-data="{{loginData.password}}"></financial-input>
            </div>

            <div class="wrapper-btns">
              <paper-button raised class="primary" on-tap="postLogin">Entrar</paper-button>
              <paper-button class="link" on-tap="postRegister">Cadastrar</paper-button>
            </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      loginData: {
        type: Object,
        value: {}
      }
    }
  }

  postLogin() {
    this.$.registerLoginAjax.url = 'http://localhost:3001/sessions/create';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }
  
  postRegister() {
    this.$.registerLoginAjax.url = 'http://localhost:3001/users';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }
}

window.customElements.define(FinancialLogin.is, FinancialLogin);
