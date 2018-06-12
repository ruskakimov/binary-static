import moment from 'moment';
import React, { PureComponent } from 'react';
import { SettingContentHeader } from '../components/setting_content_header.jsx';
import DataTable from '../../../components/elements/data_table.jsx';
import { localize } from '../../../../_common/localize';

// TODO: move it?
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
        renderCell: (isSuccessful, data_index) => (
            <td key={data_index} className={data_index}>
                {isSuccessful ? localize('Successful') : localize('Failed')}
            </td>
        ),
    },
];

class LoginHistory extends PureComponent {
    render() {
        const { title, content, data_source } = this.props;
        console.log(data_source, columns);
        return (
            <div className='settings__content_container settings__login_history'>
                <SettingContentHeader title={title} content={content}/>
                <div className='settings__content_form_container'>
                    <DataTable data_source={data_source} columns={columns} />
                </div>
            </div>
        );
    }
}

// TODO: remove this later
const dummy_response = [
    {
      "action": "login",
      "environment": "23-Apr-18 02:49:34GMT IP=61.6.9.56 IP_COUNTRY=MY User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=EN",
      "status": 1,
      "time": 1524451775
    },
    {
      "action": "login",
      "environment": "18-Apr-18 03:16:25GMT IP=61.6.9.56 IP_COUNTRY=MY User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=EN",
      "status": 1,
      "time": 1524021386
    },
    {
      "action": "login",
      "environment": "12-Apr-18 07:28:01GMT IP=61.6.9.56 IP_COUNTRY=MY User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=EN",
      "status": 1,
      "time": 1523518081
    },
    {
      "action": "logout",
      "environment": "4-Apr-18 09:58:16GMT IP=61.6.9.56 IP_COUNTRY=KZ User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=EN",
      "status": 1,
      "time": 1522835897
    },
    {
      "action": "login",
      "environment": "4-Apr-18 09:56:58GMT IP=61.6.9.56 IP_COUNTRY=MY User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=EN",
      "status": 1,
      "time": 1522835818
    },
    {
      "action": "logout",
      "environment": "4-Apr-18 08:05:42GMT IP=61.6.9.56 IP_COUNTRY=KZ User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=RU",
      "status": 1,
      "time": 1522829143
    },
    {
      "action": "login",
      "environment": "4-Apr-18 08:03:41GMT IP=61.6.9.56 IP_COUNTRY=MY User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=RU",
      "status": 1,
      "time": 1522829021
    },
    {
      "action": "logout",
      "environment": "4-Apr-18 08:01:38GMT IP=61.6.9.56 IP_COUNTRY=KZ User_AGENT=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 LANG=RU",
      "status": 1,
      "time": 1522828898
    }
];


// TODO: move parsing functions somewhere else
// (copied from iphistory.data.js)

const parseUA = (user_agent) => {
    // Table of UA-values (and precedences) from:
    //  https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
    // Regexes stolen from:
    //  https://github.com/biggora/express-useragent/blob/master/lib/express-useragent.js
    const lookup = [
        { name: 'Edge',      regex: /Edge\/([\d\w.-]+)/i },
        { name: 'SeaMonkey', regex: /seamonkey\/([\d\w.-]+)/i },
        { name: 'Opera',     regex: /(?:opera|opr)\/([\d\w.-]+)/i },
        { name: 'Chromium',  regex: /(?:chromium|crios)\/([\d\w.-]+)/i },
        { name: 'Chrome',    regex: /chrome\/([\d\w.-]+)/i },
        { name: 'Safari',    regex: /version\/([\d\w.-]+)/i },
        { name: 'IE',        regex: /msie\s([\d.]+[\d])/i },
        { name: 'IE',        regex: /trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i },
        { name: 'Firefox',   regex: /firefox\/([\d\w.-]+)/i },
    ];
    for (let i = 0; i < lookup.length; i++) {
        const info  = lookup[i];
        const match = user_agent.match(info.regex);
        if (match !== null) {
            return {
                name   : info.name,
                version: match[1],
            };
        }
    }
    return null;
};

const parse = (activity) => ({
    time   : `${moment.unix(activity.time).utc().format('YYYY-MM-DD HH:mm:ss')} GMT`,
    action : localize(activity.action),
    success: activity.status === 1,
    browser: (() => {
        const browser = parseUA(activity.environment.match('User_AGENT=(.+) LANG')[1]);
        return `${browser.name} v${browser.version}`;
    })(),
    ip_addr: activity.environment.split(' ')[2].split('=')[1],
});

LoginHistory.defaultProps = {
    data_source: dummy_response.map(parse),
};

export default LoginHistory;
