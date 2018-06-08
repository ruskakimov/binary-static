import React, { PureComponent } from 'react';

class AccountPassword extends PureComponent {
    state = {
        currentPassword: '',
        newPassword: '',
        newPasswordVerified: '',
    }

    render() {
        const { title, content } = this.props.data;

        return (
            <div className='settings__content_container'>
                <div className='settings__content_header_container'>
                    <div className='settings__content_header_title'>{title}</div>
                    <div className='settings__content_header_description'>{content}</div>
                </div>
                <div className='settings__content_form_container'></div>
            </div>
        );
    }
}

export default AccountPassword;
