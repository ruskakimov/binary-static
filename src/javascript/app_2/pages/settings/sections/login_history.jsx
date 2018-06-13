import moment from 'moment';
import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import DataTable from '../../../components/elements/data_table.jsx';
import { localize } from '../../../../_common/localize';
import { connect } from '../../../store/connect';

const columns = [
    {
        title: localize('Date and Time'),
        data_index: 'time',
    },
    {
        title: localize('Action'),
        data_index: 'action',
    },
    {
        title: localize('Browser'),
        data_index: 'browser',
    },
    {
        title: localize('IP Address'),
        data_index: 'ip_addr',
    },
    {
        title: localize('Status'),
        data_index: 'success',
    },
];

class LoginHistory extends PureComponent {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        const { title, content, data, is_loading } = this.props;
        if (!data) {
            return <div>loading...</div>
        }
        return (
            <div className='settings__content_container settings__login_history'>
                <SettingContentHeader title={title} content={content}/>
                <DataTable data_source={data} columns={columns} />
            </div>
        );
    }
}

export default connect(
    ({ main: {settings: {login_history} } }) => ({
        data: login_history.data,
        getData: login_history.getData,
        is_loading: login_history.is_loading,
    })
)(LoginHistory);
