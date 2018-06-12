import React, { PureComponent } from 'react';

export class FormFieldSet extends PureComponent {
    state = { visibilty: false }

    // To-Do: OnClick -> change the PasswordVisibility.
    onPasswordVisibilityClick = (e) => {
        this.setState({visibilty: !this.state.visibility});
    }

    render() {
        const {
            label_name,
            value,
            onChange,
            name,
        } = this.props;
        return (
            <fieldset className='settings__content_form__input_container'>
                <label className='settings__content_form__input_label'>{ label_name }</label>
                    <div className='settings__content_form__input_box'>
                        <i className='settings__pw_hide' onClick={this.onPasswordVisibilityClick}/>
                        <input
                            type='text'
                            className='settings__content_form__input'
                            name={name}
                            placeholder="Text Here"
                            value={value}
                            onChange={onChange}
                            />
                    </div>
            </fieldset>
        );
    }
}
