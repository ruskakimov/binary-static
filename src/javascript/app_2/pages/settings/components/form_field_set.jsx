import React from 'react';

export const FormFieldSet = ({ label_name, value, onChange, name }) => {
    return (
        <fieldset className='settings__content_form__input_container'>
            <label className='settings__content_form__input_label'>{ label_name }</label>
            <input
                type="text"
                className='settings__content_form__input'
                name={name}
                placeholder="Text Here"
                value={value}
                onChange={onChange}
                />
        </fieldset>
    );
}
