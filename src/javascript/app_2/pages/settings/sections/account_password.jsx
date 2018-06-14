import React, { PureComponent } from 'react';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import { connect } from '../../../store/connect';

class AccountPassword extends PureComponent {

    render() {
        const { title, content, data, onChange } = this.props;

        return (
            <form  method="get">
                <div className='settings__content_container'>
                    <SettingContentHeader title={title} content={content}/>
                    <div className='settings__content_form__container'>
                        <FormFieldSetList data={data} onChange={onChange}/>
                        <div className='settings__content_form__submit_container'>
                            <FormSubmitButton value='Change Password'/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(
    ({ main: { settings: { account_password } } }) => ({
        data                  : account_password.data,
        onChange              : account_password.onChange,
    })
)(AccountPassword);
