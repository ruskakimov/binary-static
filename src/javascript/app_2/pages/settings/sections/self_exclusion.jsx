import React, { PureComponent } from 'react';
import classNames       from 'classnames';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import { FormSubmitButton } from '../components/form_submit_button.jsx';
import { FormFieldSetList } from '../components/form_field_set_list.jsx';
import Loading from '../../../../../templates/_common/components/loading.jsx';
import { connect } from '../../../store/connect';

class SelfExclusion extends PureComponent {
    componentDidMount() {
        this.props.getSelfExclusion();
    }

    render() {
        const { title, content, is_loading, data, handleSubmit, onChange } = this.props;
        return (
            <form className='settings__content_container' onSubmit={handleSubmit}>
                <SettingContentHeader title={title} content={content}/>
                {
                    is_loading ?
                    <Loading /> :
                    <div className='settings__content_form__container'>
                        <FormFieldSetList data={data} onChange={onChange}/>
                        <div className='settings__content_form__submit_container'>
                            <FormSubmitButton value='Update Settings'/>
                        </div>
                    </div>
                }
            </form>
        );
    }
}

export default connect(
    ({ pages: { settings: { self_exclusion } } }) => ({
        is_loading      : self_exclusion.is_loading,
        data            : self_exclusion.data,
        getSelfExclusion: self_exclusion.getSelfExclusion,
        handleSubmit    : self_exclusion.handleSubmit,
        onChange        : self_exclusion.onChange,
    })
)(SelfExclusion);
