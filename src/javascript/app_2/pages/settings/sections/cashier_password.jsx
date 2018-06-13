import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import DAO from '../../../data/dao';

class CashierPassword extends PureComponent {
    state = {
        cashier_pw: '',
        verified_cashier_pw: '',
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        const { cashier_pw } = this.state;
        e.preventDefault();
        DAO.sendCashierPassword(
            cashier_pw,
            () => {
                // To-Do: Render Success Msg
                console.log('Success!')
            },
            (error) => {
                // To-Do: Render Error Msg
                console.log(error)
            },
        );
    }

    render() {
        const { title, content } = this.props;
        return (
            <form className='settings__content_container' onSubmit={this.handleSubmit}>
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
            </form>
        );
    }
}

export default CashierPassword;
