import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import CheckBox from '../components/check_box.jsx';
import { connect } from '../../../store/connect';

const scopes = ['Read', 'Trade', 'Payments', 'Admin'];

class ApiToken extends PureComponent {

    componentWillMount = () => {
        this.selectedCheckBoxes = new Set();
    }

    toggleCheckBox = label => {
        if (this.selectedCheckBoxes.has(label)) {
            this.selectedCheckBoxes.delete(label);
        } else {
            this.selectedCheckBoxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const CheckBox of this.selectedCheckBoxes) {
            console.log(CheckBox, 'is selected.');
        }
    }

    createCheckBox = label => (
        <CheckBox
            label={label}
            handleCheckBoxChange={this.toggleCheckBox}
            key={label}
        />
    )

    createCheckBoxes = () => (
        scopes.map(this.createCheckBox)
    )

    render() {
        const { title, content, data, onChange } = this.props;
        return (
            <div className='settings__content_container'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form__container'>
                    <div className='settings__content_sub_title__container'>
                        <p className='settings__content_sub_title__text'>Create New token</p>
                    </div>
                    <FormFieldSetList data={data} onChange={onChange}/>
                        <div>
                            <label className='settings__content_form__input_label'>Choose Scopes</label>
                        </div>
                        {this.createCheckBoxes()}
                    <div className='settings__content_form__submit_container'>
                        <FormSubmitButton value='CREATE'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ pages: { settings: { api_token } } }) => ({
        data                  : api_token.data,
        onChange              : api_token.onChange,
    })
)(ApiToken);
