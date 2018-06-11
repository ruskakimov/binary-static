import React from 'react';

export const FormSubmitButton = ({value}) => {
    return (
        <button className="settings__content_form__submit">
            <span className="settings__content_form__submit_text">{value}</span>
        </button>
    );
}
