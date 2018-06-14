import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import Loading from '../../../../../templates/_common/components/loading.jsx';
import { connect } from '../../../store/connect';

class FinancialAssessment extends PureComponent {
    componentDidMount() {
        this.props.getFinancialAssessment();
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
    ({ main: { settings: { financial_assessment } } }) => ({
        is_loading            : financial_assessment.is_loading,
        data                  : financial_assessment.data,
        getFinancialAssessment: financial_assessment.getFinancialAssessment,
        onChange              : financial_assessment.onChange,
    })
)(FinancialAssessment);
