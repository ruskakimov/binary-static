import React, { PureComponent } from 'react';
import classNames       from 'classnames';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';

class SelfExclusion extends PureComponent {
    state = {
        maximum_account_cash_balance: '',
        daily_turnover_limit: '',
        daily_limit_on_loss: '',
        seven_day_turnover_limit: '',
        seven_day_on_loss: '',
        thiry_day_turnover_limit: '',
        thiry_day_on_loss: '',
        maximum_number_opern_positions: '',
        session_duration_limit: '',
        time_out_until: '',
        exclude_me_until: '',
    }

    onChange = (e) => {
        const { name, value } = e.target;
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
                        <FormSubmitButton value='Update Settings'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelfExclusion;
