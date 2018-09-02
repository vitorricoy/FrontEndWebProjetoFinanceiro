export class AppConstants {
    static get is() {
        return 'financial-constants';
    }

    static get URL() {
        //return "http://localhost:8080/api/";
        return "https://damp-ravine-37856.herokuapp.com/api/";
    }

    static get STORAGE_TOKEN_KEY() {
        return "FINANCIAL_TOKEN";
    }

}

customElements.define(AppConstants.is, AppConstants);