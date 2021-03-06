import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import { LocalStorage } from './common/financial-storage.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

setPassiveTouchGestures(true);

setRootPath(MyAppGlobals.rootPath);

class FinancialApp extends PolymerElement {
  static get is() {
    return 'financial-app';
  }

  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        .logout {
          float: right;
        }
        
        .title {
          padding-left: 10px;
        }
      </style>

      <app-location route="{{route}}"></app-location>
      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      
        <app-drawer-layout fullbleed force-narrow>

        <app-drawer id="drawer" slot="drawer">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="view1" href="[[rootPath]]view1">View One</a>
          </iron-selector>
        </app-drawer>

        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <template is="dom-if" if="[[isLoggedIn]]">
                <paper-icon-button src="../images/menu.svg" drawer-toggle=""></paper-icon-button>
              </template>
              <div class="title" main-title="">Aplicativo Financeiro</div>
              <template is="dom-if" if="[[isLoggedIn]]">
              <div class="logout">
                <paper-icon-button src="../images/logout.svg" on-tap="logout"></paper-icon-button>
              </div>
              </template>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main" fallback-selection="404">
            <financial-login name="login" is-logged-in="{{isLoggedIn}}"></financial-login>
            <financial-home name="home"></financial-home>
            <financial-404 name="404"></financial-404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      isLoggedIn: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false
      },
      routeData: Object,
      subroute: Object
    };
  }

  constructor() {
    super();
    addEventListener('financial.navigate', (e) => this._navigateTo(e));
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  logout() {
    LocalStorage.SaveToken(null);
    this.set('route.path', '/');
  }

  _navigateTo(e) {
    if(e.detail)
      this.set('route.path', '/' + e.detail);
  }

  _routePageChanged(page) {
    let token = LocalStorage.GetToken();
    if (!page) {
      this.set('route.path', '/' + (token == null ? 'login' : 'home'));
    } else {
      this.isLoggedIn = token != null;
      this.page = page;
    }

    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    switch (page) {
      case 'login':
        import('./financial-login.js');
        break;
      case 'home':
        import('./financial-home.js');
        break;
      default:
        import('./financial-404.js');
    }
  }
}

window.customElements.define(FinancialApp.is, FinancialApp);
