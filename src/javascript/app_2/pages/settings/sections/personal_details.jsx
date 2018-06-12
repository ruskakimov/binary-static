import React, { PureComponent } from 'react';

class PersonalDetails extends PureComponent {
    render() {
        const { title, content } = this.props;
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

export default PersonalDetails;
