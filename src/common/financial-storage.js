import { AppConstants } from './financial-constants.js';

export class LocalStorage {
    static get is() {
        return 'financial-storage';
    }

    static SaveToken(token) {
        window.localStorage.setItem(AppConstants.STORAGE_TOKEN_KEY, JSON.stringify(token));
    }

    static GetToken() {
        return JSON.parse(window.localStorage.getItem(AppConstants.STORAGE_TOKEN_KEY));
    }

}

customElements.define(LocalStorage.is, LocalStorage);