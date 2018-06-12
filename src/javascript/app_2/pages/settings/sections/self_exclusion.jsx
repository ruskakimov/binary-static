import React, { PureComponent } from 'react';
import classNames       from 'classnames';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';

class SelfExclusion extends PureComponent {
    state = {
        maximum_account_cash_balance: {
            type: 'number', label_name: 'Maximum Account Cash Balance', value: '', helper: 'dollar',
        },
        daily_turnover_limit: {
            type: 'number', label_name: 'Daily turnover limit', value: '', helper: 'dollar',
        },
        daily_limit_on_loss: {
            type: 'number', label_name: 'Daily limit on losses', value: '', helper: 'dollar',
        },
        seven_day_turnover_limit: {
            type: 'number', label_name: '7-day turnover limit', value: '', helper: 'dollar',
        },
        seven_day_on_loss: {
            type: 'number', label_name: '7-day limit on losses', value: '', helper: 'dollar',
        },
        thiry_day_turnover_limit: {
            type: 'number', label_name: '30-day turnover limit', value: '', helper: 'dollar',
        },
        thiry_day_on_loss: {
            type: 'number', label_name: '30-day limit on losses', value: '', helper: 'dollar',
        },
        maximum_number_opern_positions: {
            type: 'number', label_name: 'Maximum number of open positions', value: '', helper: 'dollar',
        },
        session_duration_limit: {
            type: 'number', label_name: 'Session duration limit, in minutes', value: '', helper: 'dollar',
        },
        time_out_until: {
            type: 'number', label_name: 'Time out until', value: '', helper: 'dollar',
        },
        exclude_me_until: {
            type: 'number', label_name: 'Exclude me from the website until', value: '', helper: 'dollar',
        },
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
                        <FormSubmitButton value='Update Settings'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelfExclusion;
