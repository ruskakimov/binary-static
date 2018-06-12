import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';

class CashierPassword extends PureComponent {
    state = {
        cashier_pw: { label_name: 'Current Password', value: ''},
        verified_cashier_pw: { label_name: 'New Password', value: ''},
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            [name]: { ...prevState[name], value }
        }))
    }

    render() {
        const { title, content } = this.props;
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <FormFieldSetList data={this.state} onChange={this.onChange}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='UPDATE'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CashierPassword;
