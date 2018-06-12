import React from 'react';
import { FormFieldSet } from '../components/form_field_set.jsx';

export const FormFieldSetList = ({ data, onChange }) => {
    return (
        <div>
            {
                Object.keys(data).map((key, i) => {
                    const { label_name, value } = data[key]
                    return (
                        <FormFieldSet
                            key={i}
                            label_name={label_name}
                            onChange={onChange}
                            value={value}
                            name={key}
                        />
                    );
                })
            }
        </div>
    );
}
