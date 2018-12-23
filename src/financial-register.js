import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-button/paper-button.js';
import './common/shared-styles.js';
import './financial-components/financial-input/financial-input.js';
import { TransactionService } from './services/transaction-service.js';

class FinancialRegister extends PolymerElement {
  static get is() {
    return 'financial-register';
  }

  static get template() {
    return html`
      <style include="shared-styles">

        :host {
          --lumo-contrast-10pct: transparent;
          --lumo-error-color-10pct: transparent;
        }

        .transaction-form {
            padding: 15px 40px;
        }

        .date-picker {
          padding-top: 15px;
        }

        .button-container {
          width: 100%;
          padding: 20px 0;
        }

        .button {
          float: right;
        }

        .input {
          margin: 0.5em;
        }

      </style>
      <form class="transaction-form">
        <div class="input">
          <financial-input id="transactionName" financial-type="text" financial-placeholder="Nome da Transação" financial-data="{{nameTransaction}}"></financial-input>
          <financial-input id="transactionValue" financial-type="number" financial-placeholder="Valor da Transação" financial-data="{{valueTransaction}}"></financial-input>
        </div>
        <vaadin-date-picker id="datePicker" placeholder="Data da Transação" class="date-picker"></vaadin-date-picker>
        <div class="button-container">
          <paper-button raised class="primary" on-tap="saveTransaction" class="button">Salvar</paper-button>
        </div>
      </form>
    `;
    }
    
    static get properties() {
      return {
        nameTransaction: String,
        valueTransaction: Number,
        transactionDate: String
      }
    }
    
    ready() {
        super.ready();
        this.$.datePicker.i18n.formatDate = this.formatDate.bind(this);
        this.$.datePicker.i18n.parseDate = this.parseDate.bind(this);
    }

    parseDate(date) {
      let dateData = date.split('/');
      let day = dateData[0];
      let month = dateData[1];
      let year = dateData[2];
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    formatDate(date) {
      this.transactionDate = date.day + "/" + (date.month + 1) + "/" + date.year;
      return this.transactionDate;
    }

    saveTransaction() {
      const transactionService = new TransactionService();
      let month = this.transactionDate.split('/')[1];
      let year = this.transactionDate.split('/')[2];
      transactionService.saveTransaction(this.nameTransaction, this.valueTransaction, month, year, this.transactionDate)
        .then((response) => {
          if(response === true) {
            alert('Transação criada');
            dispatchEvent(new CustomEvent('financial.navigate', { 'detail': 'home' }));
          } else {
            alert("Erro: " + response);
          }

        })
        .catch((err) => {
          alert("Erro: " + err);
        });
    }

}

window.customElements.define(FinancialRegister.is, FinancialRegister);
