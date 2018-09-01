class AppConstants {
    static get is() {
        return 'financial-constants';
    }

    static get URL() {
        return "https://damp-ravine-37856.herokuapp.com/api/";
    }

}

customElements.define(AppConstants.is, AppConstants);