import { AppConstants } from '../common/financial-constants.js';
import { LocalStorage } from '../common/financial-storage.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { LoginService } from './login-service.js';

export class TransactionService extends PolymerElement {
  static get template() {
    return html`
       <iron-ajax id="saveTransaction" body="{{requestData}}" url="{{url}}Transaction" handle-as="json" method="POST" content-type="application/json" headers="{{headers}}"></iron-ajax>
       <iron-ajax id="getTransaction" params="{{requestData}}" url="{{url}}Transaction" handle-as="json" method="GET" content-type="application/json" headers="{{headers}}"></iron-ajax>
`;
  }
  static get is() {
      return 'transaction-service';
  }

  static get properties() {
      return {
          requestData: Object,
          url: String,
          headers: Object
      };
  }

  constructor() {
      super();
      this.ready();
      this.url = AppConstants.URL;
      this.headers= {
          Authorization: '',
          'grant-type': 'password'
      }
  }

  getTransactions(month, year) {
    return new Promise((resolve, reject) => {
        this.requestData = {
            month: month,
            year: year
        };

        this.headers.Authorization = 'Bearer ' + LocalStorage.GetToken().token;
        this._sendGetTransactionRequest(true)
          .then((response) => {
              if(response) {
                  return resolve(response);
              } else {
                  return reject(false);
              }
          })
          .catch((err) => reject(err));;
    });
  }

  _sendGetTransactionRequest(retry) {
    return new Promise((resolve, reject) => {
        this.$.getTransaction.generateRequest().completes
            .then((response) => {
                if(response.status === 200) {
                    return resolve(response.response);
                } else {
                    if(response.status === 401 && retry) {
                        this.refreshToken(LocalStorage.GetToken().refresh_token).then((result) => {
                            this.headers.Authorization = 'Bearer ' + LocalStorage.GetToken().token;
                            return this._sendSaveTransactionRequest(false);
                        });
                    }
                    return reject(response.response);
                }
            })
            .catch((err) => reject(err));;
    });
  }

  saveTransaction(name, value, month, year, date) {
      return new Promise((resolve, reject) => {
          this.requestData = {
              month: month,
              year: year,
              new_transaction: {
                  name: name,
                  value: value,
                  date: date
              }
          };

          this.headers.Authorization = 'Bearer ' + LocalStorage.GetToken().token;
          this._sendSaveTransactionRequest(true)
            .then((response) => {
                if(response) {
                    return resolve(true);
                } else {
                    return reject(false);
                }
            })
            .catch((err) => reject(err));;
      });
      
    }

    _sendSaveTransactionRequest(retry) {
        return new Promise((resolve, reject) => {
            this.$.saveTransaction.generateRequest().completes
                .then((response) => {
                    if(response.status === 200) {
                        return resolve(true);
                    } else {
                        if(response.status === 401 && retry) {
                            this.refreshToken(LocalStorage.GetToken().refresh_token).then((result) => {
                                this.headers.Authorization = 'Bearer ' + LocalStorage.GetToken().token;
                                return this._sendSaveTransactionRequest(false);
                            });
                        }
                        return reject(response.response);
                    }
                })
                .catch((err) => reject(err));;
        });
    }

    refreshToken(refresh_token) {
        const loginService = new LoginService();
        return loginService.refreshToken(refresh_token);
    }
}

customElements.define(TransactionService.is, TransactionService);