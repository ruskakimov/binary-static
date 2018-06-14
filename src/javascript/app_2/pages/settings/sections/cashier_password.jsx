import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import { connect } from '../../../store/connect';

class CashierPassword extends PureComponent {

    render() {
        const { title, content, handleSubmit, data, onChange } = this.props;
        return (
            <form className='settings__content_container' onSubmit={handleSubmit}>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <div className='settings__content_sub_title__container'>
                        <p className='settings__content_sub_title__text'>Lock Cashier</p>
                    </div>
                    <FormFieldSetList data={data} onChange={onChange}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='UPDATE'/>
                    </div>
                </div>
            </form>
        );
    }
}


export default connect(
    ({ pages: { settings: { cashier_password } } }) => ({
        data                  : cashier_password.data,
        handleSubmit          : cashier_password.handleSubmit,
        onChange              : cashier_password.onChange,
    })
)(CashierPassword);
