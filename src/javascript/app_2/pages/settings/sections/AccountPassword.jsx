import React, { PureComponent } from 'react';
import { FormFieldSet } from '../components/form_field_set.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { settings_menu_data }   from '../settings_menu_data';

class AccountPassword extends PureComponent {
    state = {
        current_password: '',
        new_password: '',
        verified_password: '',
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    // To-Do: OnClick -> change the PasswordVisibility.
    onPasswordVisibilityClick = (e) => {
        const { type } = e.target;
        if (type == 'password') {
            e.target.type = 'text';
        } else {
            e.target.type = 'password';
        }
    }

    render() {
        const { title, content } = settings_menu_data(2);
        const { current_password, new_password, verified_password } = this.state;
        return (
            <div className='settings__content_container'>
                <div className='settings__content_header_container'>
                    <div className='settings__content_header_title'>{title}</div>
                    <div className='settings__content_header_description'>{content}</div>
                </div>
                <div className='settings__content_form__container'>
                    <FormFieldSet
                        label_name='Current Password'
                        value={current_password}
                        onChange={this.onChange}
                        onPasswordVisibilityClick={this.onPasswordVisibilityClick}
                        name={'current_password'}/>
                    <FormFieldSet label_name='New Password' value={new_password} onChange={this.onChange} name={'new_password'}/>
                    <FormFieldSet label_name='Verify Password' value={verified_password} onChange={this.onChange} name={'verified_password'}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='Change Password'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountPassword;
