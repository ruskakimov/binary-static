import { observable, action } from 'mobx';
import WS from '../../../../data/ws_methods';

export default class PersonalDetailsModel {
    @observable is_loading = true;
    @observable data = {
        account_opening_reason: '',
        address_city          : '',
        address_line_1        : '',
        address_line_2        : '',
        address_postcode      : '',
        address_state         : 'NSW',
        country               : 'Australia',
        country_code          : 'au',
        date_of_birth         : 697420800,
        email                 : 'john.baek@regentmarkets.com',
        email_consent         : 0,
        first_name            : 'John',
        last_name             : 'Baek',
        phone                 : '+61 0267937381',
        place_of_birth        : 'au',
        salutation            : 'Mr',
        tax_identiation_number: {},
        tax_residence         : {},
    }

    @action.bound
    async getPersonalDetails() {
        const { get_settings } = await WS.getSettings();
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
