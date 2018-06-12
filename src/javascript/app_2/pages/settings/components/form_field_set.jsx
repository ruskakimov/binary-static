import React, { PureComponent } from 'react';

export class FormFieldSet extends PureComponent {
    state = { visibilty: false }

    // To-Do: OnClick -> change the PasswordVisibility.
    onPasswordVisibilityClick = (e) => {
        this.setState({visibilty: !this.state.visibility});
    }

    renderSymbol = () => {
        const { helper } = this.props;
        if (helper=='dollar') {
            return (<i className='settings__dollar'/>);
        } else if (helper=='dropdown') {
            return (<i className='settings__dropdown'/>);
        } else if (helper=='pw') {
            if (this.state.visibility) {
                return (<i className='settings__pw_unhide' onClick={this.onPasswordVisibilityClick}/>);
            } else {
                return (<i className='settings__pw_hide' onClick={this.onPasswordVisibilityClick}/>);
            }
        } else {
            return <i/>;
        }
    }

    render() {
        const {
            label_name,
            value,
            onChange,
            name,
            type,
            helper,
        } = this.props;
        const inputClassName = `${helper=='dollar' ?
            'settings__content_form__dollar_input' :
            'settings__content_form__input'}`;
        return (
            <fieldset className='settings__content_form__input_container'>
                <label className='settings__content_form__input_label'>{ label_name }</label>
                    <div className='settings__content_form__input_box'>
                        { this.renderSymbol() }
                        <input
                            type={type}
                            className={inputClassName}
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
