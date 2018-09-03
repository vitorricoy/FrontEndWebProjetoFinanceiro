import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LocalStorage } from './common/financial-storage.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';

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

        .month-container {
          display: inline-block;
          width: 100%;
          padding-bottom: 10px;
        }

        .month-selector {
          display: inline;
          float: right;
          padding: 0px 10px 0px 10px;
        }

        .year-selector {
          display: inline;
          float: right;
          padding: 0px 10px 0px 10px;
        }

        .month-name {
          display: inline;
          font-size: 30px;
        }

      </style>
      <div class="month-container">
        <div class="month-name">{{selectedMonthName}}</div>
        
        <div class="year-selector">
          <vaadin-dropdown-menu placeholder="Ano" value="{{selectedYear}}">
            <template>
              <vaadin-list-box>
                <template is="dom-repeat" items="{{_getAllYears()}}">
                  <vaadin-item value="{{item}}">{{item}}</vaadin-item>
                </template>
              </vaadin-list-box>
            </template>
          </vaadin-dropdown-menu>
        </div>

        <div class="month-selector">
          <vaadin-dropdown-menu placeholder="Mês" value="{{selectedMonthName}}">
            <template>
              <vaadin-list-box>
                <template is="dom-repeat" items="[[_getAllMonths()]]">
                  <vaadin-item value="{{item}}">{{item}}</vaadin-item>
                </template>
              </vaadin-list-box>
            </template>
          </vaadin-dropdown-menu>
        </div>

      </div>

      <vaadin-grid items='{{transactions}}'>
        <vaadin-grid-column>
          <template class="header">Nome da Transação</template>
          <template>[[item.name]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Valor</template>
          <template>[[item.surname]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Data</template>
          <template>[[item.role]]</template>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
    }

    static get properties() {
        return {
            userId: String,
            selectedMonth: {
              type: Number
            },
            selectedYear: Number,
            monthNames: {
              type: Array,
              value: [
                'Janeiro', 'Fevereiro', 'Março', 
                'Abril', 'Maio', 'Junho', 'Julho', 
                'Agosto', 'Setembro', 'Outubro', 
                'Novembro', 'Dezembro'
              ]
            },
            selectedMonthName: {
              type: String,
              observer: '_monthChanged'
            }
        }
    }

    ready() {
        super.ready();
        this.selectedMonth = new Date().getMonth();
        this.selectedMonthName = this._getMonthName();
        this.selectedYear = new Date().getFullYear();
    }

    _monthChanged() {
      this.selectedMonth = this.monthNames.indexOf(this.selectedMonthName);
    }

    _getMonthName() {
      return this.monthNames[this.selectedMonth];
    }

    _getAllYears() {
      let yearsArray = [];
      for(let i=new Date().getFullYear(); i >= 1970 ; i--) {
        yearsArray.push(i);
      }

      return yearsArray;
    }

    _getAllMonths() {
      let monthsArray = [];
      for(let i=0; i<=11; i++) {
        monthsArray.push(this.monthNames[i]);
      }
      return monthsArray;
    }

}

window.customElements.define(FinancialHome.is, FinancialHome);
