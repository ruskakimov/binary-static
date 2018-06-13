import { observable, action } from 'mobx';
import moment from 'moment';
import DAO from '../../../../data/dao';
import { localize } from '../../../../../_common/localize';

export default class LoginHistoryModel {
    @observable data       = null;
    @observable limit      = 50;
    @observable is_loading = false;

    @action.bound
    getData() {
        this.is_loading = true;

        DAO.getLoginHistory(this.limit).then(response => {
            this.data = response.login_history.map(parse);
            this.is_loading = false;
        });
    }
}

/*
    RESPONSE PARSING FUNCTIONS
    (copied from iphistory.data.js)
*/
const parseUserAgent = (user_agent) => {
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
    success: activity.status === 1 ? localize('Successful') : localize('Failed'),
    browser: (() => {
        const browser = parseUserAgent(activity.environment.match('User_AGENT=(.+) LANG')[1]);
        return `${browser.name} v${browser.version}`;
    })(),
    ip_addr: activity.environment.split(' ')[2].split('=')[1],
});
