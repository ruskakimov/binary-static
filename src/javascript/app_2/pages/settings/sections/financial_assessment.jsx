import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import DAO from '../../../data/dao';

class FinancialAssessment extends PureComponent {
    state = {
        income_source: '',
        employment_status: '',
        employment_industry: '',
        occupation: '',
        source_of_wealth: '',
        education_level: '',
        net_income: '',
        estimated_worth: '',
        account_turnover: '',
    }

    async componentDidMount() {
        let { get_financial_assessment } = await DAO.getFinancialAssessment()
        if( get_financial_assessment ) {
            this.setState(get_financial_assessment);
        } else {
            // To-Do: Show the error page.
            console.log('nope');
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        // this.setState(prevState => ({
        //     [name]: value
        // }))
        this.setState({[name]: value})
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
