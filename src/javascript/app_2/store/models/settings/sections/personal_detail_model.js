import { observable, action } from 'mobx';
import DAO from '../../../../data/dao';

export default class PersonalDetailsModel {
    @observable is_loading = true;
    @observable data = {
        account_opening_reason: '',
        address_city          : '',
        address_line_1        : '',
        address_line_2        : '',
        address_postcode      : '',
        address_state         : '',
        country               : '',
        country_code          : '',
        date_of_birth         : 697420800,
        email                 : '',
        email_consent         : 0,
        first_name            : '',
        last_name             : '',
        phone                 : '',
        place_of_birth        : '',
        salutation            : '',
        tax_identiation_number: {},
        tax_residence         : {},
    }

    @action.bound
    async getPersonalDetails() {
        const { get_settings } = await DAO.getSettings();
        if ( get_settings ) {
            Object.entries(this.data).forEach(
                ([k,v]) =>
                    this.data[k] = get_settings[k] ?
                    get_settings[k] :
                    v);
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
