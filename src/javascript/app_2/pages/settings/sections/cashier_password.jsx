import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';

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
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <div className='settings__content_sub_title__container'>
                        <p className='settings__content_sub_title__text'>Lock Cashier</p>
                    </div>
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
