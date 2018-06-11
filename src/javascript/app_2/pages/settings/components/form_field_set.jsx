import React from 'react';

export const FormFieldSet = ({ label_name, value, onChange, name, onPasswordVisibilityClick }) => {
    return (
        <fieldset className='settings__content_form__input_container'>
            <label className='settings__content_form__input_label'>{ label_name }</label>
                <div className='settings__content_form__input_box'>
                    <i className='settings__pw_hide' onClick={onPasswordVisibilityClick}/>
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
