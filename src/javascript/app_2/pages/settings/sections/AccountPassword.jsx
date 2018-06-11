import React, { PureComponent } from 'react';
import { settings_menu_data }   from '../settings_menu_data';

class AccountPassword extends PureComponent {

    render() {
        const { title, content } = settings_menu_data(2);
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
