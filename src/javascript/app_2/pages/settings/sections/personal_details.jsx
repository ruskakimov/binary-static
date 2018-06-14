import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { connect } from '../../../store/connect';
import Loading from '../../../../../templates/_common/components/loading.jsx';

class PersonalDetails extends PureComponent {
    componentDidMount() {
        this.props.getPersonalDetails();
    }

    render() {
        const { title, content, is_loading, onChange, data } = this.props;
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                {
                    is_loading ?
                    <Loading /> :
                    <div className='settings__content_form__container'>
                        <FormFieldSetList data={data} onChange={onChange}/>
                        <div className='settings__content_form__submit_container'>
                            <FormSubmitButton value='UPDATE'/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


export default connect(
    ({ pages: { settings: { personal_details } } }) => ({
        is_loading            : personal_details.is_loading,
        data                  : personal_details.data,
        getPersonalDetails    : personal_details.getPersonalDetails,
        onChange              : personal_details.onChange,
    })
)(PersonalDetails);
