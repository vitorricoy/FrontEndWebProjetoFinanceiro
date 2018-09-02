import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LoginService } from './services/login-service.js';
import './common/shared-styles.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import './financial-components/financial-input/financial-input.js';
import { MD5 } from './common/md5-util.js';

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
              <financial-input id="userNameInput" financial-type="text" financial-placeholder="Usuario" financial-data="{{username}}"></financial-input>
              <financial-input id="passwordInput" financial-type="password" financial-placeholder="Senha" financial-data="{{password}}"></financial-input>
            </div>

            <div class="wrapper-btns">
              <paper-button raised class="primary" on-tap="postLogin">Entrar</paper-button>
              <paper-button class="link" on-tap="postRegister">Cadastrar</paper-button>
            </div>
        </div>
      </div>
      <paper-toast id="errorToast" text="[[errorText]]"></paper-toast>
    `;
  }

  static get properties() {
    return {
      username: {
        type: String,
        value: "",
        notify: true,
        reflectToAttribute: true
      },
      password: {
        type: String,
        value: "",
        notify: true,
        reflectToAttribute: true
      },
      errorText: String,
      isLoggedIn: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
      }
    }
  }

  postLogin() {
    if(this.username && this.password) {
      let loginData = {
        username: this.username,
        password: MD5(this.password)
      };
      const loginService = new LoginService();
      loginService.login(loginData)
        .then(() => {
          this.set('isLoggedIn', true);
          dispatchEvent(new CustomEvent('financial.navigate', { 'detail': 'home' }))
        })
        .catch(() => {
          this.errorText = "Usuario/Senha inválidos";
          this.$.errorToast.show();
        });
    } else {
      this.errorText = "Preencha o usuário e a senha";
      this.$.errorToast.show();
    }
    
  }
  
  postRegister() {
    if(this.username && this.password) {
      let loginData = {
        username: this.username,
        password: MD5(this.password)
      };
      const loginService = new LoginService();
      loginService.register(loginData)
        .then(() => {
          this.set('isLoggedIn', true);
          window.dispatchEvent(new CustomEvent('financial.navigate', { 'detail': 'home' }))
        })
        .catch(() => {
          this.errorText = "Usuário já existente";
          this.$.errorToast.show();
        });
    } else {
      this.errorText = "Preencha o usuário e a senha";
      this.$.errorToast.show();
    }
  }
}

window.customElements.define(FinancialLogin.is, FinancialLogin);
