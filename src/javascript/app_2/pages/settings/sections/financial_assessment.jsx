import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import DAO from '../../../data/dao';

class FinancialAssessment extends PureComponent {
    state = {
        income_source: {
            type: 'text', label_name: 'Income Source', value: '', helper: 'dropdown',
        },
        employment_status: {
            type: 'text', label_name: 'Employment Status', value: '', helper: 'dropdown',
        },
        industry_of_employment: {
            type: 'text', label_name: 'Industry of Employment', value: '', helper: 'dropdown',
        },
        occupation: {
            type: 'text', label_name: 'Occupation', value: '', helper: 'dropdown',
        },
        source_of_wealth: {
            type: 'text', label_name: 'Source of Wealth', value: '', helper: 'dropdown',
        },
        level_of_education: {
            type: 'text', label_name: 'Level of Education', value: '', helper: 'dropdown',
        },
        net_annual_income: {
            type: 'text', label_name: 'Net Annual Income', value: '', helper: 'dropdown',
        },
        estimated_net_worth: {
            type: 'text', label_name: 'Estimated Net Worth', value: '', helper: 'dropdown',
        },
        anticipated_account_turnover: {
            type: 'text', label_name: 'Anticipated Account Turnover', value: '', helper: 'dropdown',
        },
    }

    async componentDidMount() {
        let { get_financial_assessment } = await DAO.getFinancialAssessment()
        if( get_financial_assessment ) {
            const { account_turnover } = get_financial_assessment;
            this.setState(prevState => ({
                anticipated_account_turnover: {...prevState.anticipated_account_turnover, value: account_turnover}
            }));
        } else {
            console.log('nope');
        }
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
