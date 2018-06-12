import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';

class FinancialAssessment extends PureComponent {
    state = {
        income_source: { label_name: 'Income Source', value: ''},
        employment_status: { label_name: 'Employment Status', value: ''},
        industry_of_employment: { label_name: 'Industry of Employment', value: ''},
        occupation: { label_name: 'Occupation', value: ''},
        source_of_wealth: { label_name: 'Source of Wealth', value: ''},
        level_of_education: { label_name: 'Level of Education', value: ''},
        net_annual_income: { label_name: 'Net Annual Income', value: ''},
        estimated_net_worth: { label_name: 'Estimated Net Worth', value: ''},
        anticipated_account_turnover: { label_name: 'Anticipated Account Turnover', value: ''},
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            [name]: { ...prevState[name], value }
        }))
    }

    render() {
        const { title, content } = this.props;
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <FormFieldSetList data={this.state} onChange={this.onChange}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='UPDATE'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FinancialAssessment;
