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
        timeout_until: '',
        exclude_until: '',
    }

    async componentDidMount() {
        const { get_self_exclusion } = await DAO.getSelfExclusion();
        if( get_self_exclusion ) {
            Object.entries(this.state).forEach(
                ([k,v]) =>
                    this.state[k] = get_self_exclusion[k] ?
                    get_self_exclusion[k] :
                    v);
            this.setState(get_self_exclusion);
        } else {
            // To-Do: Show the error page.
            console.log('You must login to see this page');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        DAO.setSelfExclusion(
            this.state,
            ()=> {
                // To-Do: Show Success page.
                console.log('successfully self-excluted!');
            },
            (message) => {
                // To-Do: Show the error page.
                // To-DO: Validation: timeout_until. 
                console.log(message);
            },
        );
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    render() {
        const { title, content } = this.props;
        return (
            <form className='settings__content_container' onSubmit={this.handleSubmit}>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <FormFieldSetList data={this.state} onChange={this.onChange}/>
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='Update Settings'/>
                    </div>
                </div>
            </form>
        );
    }
}

export default SelfExclusion;
