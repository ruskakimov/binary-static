import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormFieldSet } from '../components/form_field_set.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';

class CashierPassword extends PureComponent {
    state = {
            cashier_pw: '',
            verified_cashier_pw: '',
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    render() {
        const { title, content } = this.props;
        const { cashier_pw, verified_cashier_pw } = this.state;
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <FormFieldSet
                        label_name='Current Password'
                        value={cashier_pw}
                        onChange={this.onChange}
                        onPasswordVisibilityClick={this.onPasswordVisibilityClick}
                        name={'current_password'}/>
                    <FormFieldSet
                        label_name='New Password'
                        value={verified_cashier_pw}
                        onChange={this.onChange}
                        name={'new_password'}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='UPDATE'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CashierPassword;
