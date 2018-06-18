import { observable, action, computed } from 'mobx';
import WS from '../../../../data/ws_methods';

export default class PersonalDetailsModel {
    @observable is_loading = true;
    @observable details_data = {
        account_opening_reason: '',
        address_city          : '',
        address_line_1        : '',
        address_line_2        : '',
        address_postcode      : '',
        address_state         : '',
        date_of_birth         : 697420800,
        email                 : '',
        first_name            : '',
        last_name             : '',
        place_of_birth        : '',
        salutation            : '',
    }
    @observable tax_data = {
        tax_identification_number: {},
        tax_residence            : {},
    }
    @observable address_data = {
        country     : '',
        country_code: '',
        phone       : '',
    }
    @observable email_consent = 0;

    @computed get fullName() {
        const { salutation, first_name, last_name } = this.details_data;
        return `${ salutation } ${ first_name } ${ last_name }`;
    }

    set fullName(fullName) {
        this.details_data.first_name = fullName;
    }

    // To-Do: Optimize this algorithm
    @action.bound
    async getPersonalDetails() {
        const { get_settings } = await WS.getSettings();
        if ( get_settings ) {
            Object.entries(this.details_data).forEach(
                ([k,v]) => {
                    this.details_data[k] = get_settings[k] ? get_settings[k] : v;
                }
            );
            Object.entries(this.tax_data).forEach(
                ([k,v]) => {
                    this.tax_data[k] = get_settings[k] ? get_settings[k] : v;
                }
            );
            Object.entries(this.address_data).forEach(
                ([k,v]) => {
                    this.address_data[k] = get_settings[k] ? get_settings[k] : v;
                }
            );
            this.is_loading = false;
        } else {
            // To-Do: Show the error page.
            console.log('You must login to see this page');
        }
    }

    @action.bound
    onChange = (e) => {
        const { name, value } = e.target;
        this.data[name] = value;
    }
}
