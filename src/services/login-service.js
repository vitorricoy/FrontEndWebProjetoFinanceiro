import { AppConstants } from '../common/financial-constants.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

export class ServicoLogin extends PolymerElement {
  static get template() {
    return html`
        <iron-ajax id="login" body="{{dadosRequest}}" url="{{url}}/Login/login" handle-as="json" method="POST" content-type="application/json"></iron-ajax>
        <iron-ajax id="register" body="{{dadosRequest}}" url="{{url}}/Login/register" handle-as="json" method="POST" content-type="application/json"></iron-ajax>
`;
  }

  static get is() {
      return 'servico-login';
  }

  static get properties() {
      return {
          dadosRequest: Object,
          url: String
      };
  }

  constructor() {
      super();
      this.ready();
      this.url = AppConstants.URL;
  }

}

customElements.define(ServicoLogin.is, ServicoLogin);