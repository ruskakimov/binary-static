import React from 'react';

export const FormSubmitButton = ({value}) => {
    return (
        <button className="settings__content_form__submit" type="submit">
            <span className="settings__content_form__submit_text">{value}</span>
        </button>
    );
}
