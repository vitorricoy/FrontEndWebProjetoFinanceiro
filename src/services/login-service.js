import { AppConstants } from '../common/financial-constants.js';
import { LocalStorage } from '../common/financial-storage.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

export class LoginService extends PolymerElement {
  static get template() {
    return html`
        <iron-ajax id="login" body="{{requestData}}" url="{{url}}Login/login" handle-as="json" method="POST" content-type="application/json"></iron-ajax>
        <iron-ajax id="register" body="{{requestData}}" url="{{url}}Login/register" handle-as="json" method="POST" content-type="application/json"></iron-ajax>
`;
  }

  static get is() {
      return 'login-service';
  }

  static get properties() {
      return {
          requestData: Object,
          url: String
      };
  }

  constructor() {
      super();
      this.ready();
      this.url = AppConstants.URL;
  }

  login(userData) {
      return new Promise((resolve, reject) => {
          this.requestData = userData;
          this.$.login.generateRequest().completes
            .then((response) => {
                if(response.status === 200) {
                    let token = response.response;
                    LocalStorage.SaveToken(token);
                    return resolve(true);
                } else {
                    return reject(response.response);
                }
            })
            .catch((err) => reject(err));;
      });
    }

    register(userData) {
        return new Promise((resolve, reject) => {
            this.requestData = userData;
            this.$.register.generateRequest().completes
                .then((response) => {
                    if(response.status === 200) {
                        let token = response.response;
                        LocalStorage.SaveToken(token);
                        return resolve(true);
                    } else {
                        return reject(response);
                    }
                })
                .catch((err) => reject(err));
        });
    }

    

}

customElements.define(LoginService.is, LoginService);