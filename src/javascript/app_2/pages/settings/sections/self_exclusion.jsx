import React, { PureComponent } from 'react';
import classNames       from 'classnames';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import DAO from '../../../data/dao';

class SelfExclusion extends PureComponent {
    state = {
        max_balance: '',
        max_turnover: '',
        max_losses: '',
        max_7day_turnover: '',
        max_7day_losses: '',
        max_30day_turnover: '',
        max_30day_losses: '',
        max_open_bets: '',
        session_duration_limit: '',
        time_out_until: '',
        exclude_until: '',
    }

    async componentDidMount() {
        let { get_self_exclusion } = await DAO.getSelfExclusion()
        if( get_self_exclusion ) {
            this.setState(get_self_exclusion);
        } else {
            // To-Do: Show the error page.
            console.log('nope');
        }
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
