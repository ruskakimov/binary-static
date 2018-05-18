const moment           = require('moment');
const isJPClient       = require('./client').isJPClient;
const ServerTime       = require('../../_common/base/server_time');
const elementInnerHtml = require('../../_common/common_functions').elementInnerHtml;
const getElementById   = require('../../_common/common_functions').getElementById;

const Clock = (() => {
    let el_clock,
        fncViewPopupTimer;

    const startClock = () => {
        if (!el_clock) {
            el_clock = getElementById('gmt-clock');
        }

        ServerTime.init(onTimeUpdated);
    };

    const onTimeUpdated = () => {
        const server_time = ServerTime.get();
        window.time = server_time;

        const time_str = `${server_time.format('YYYY-MM-DD HH:mm:ss')} GMT`;
        if (isJPClient()) {
            elementInnerHtml(el_clock, toJapanTimeIfNeeded(time_str, 1, 1));
        } else {
            elementInnerHtml(el_clock, time_str);
            showLocalTimeOnHover('#gmt-clock');
        }

        if (typeof fncViewPopupTimer === 'function') {
            fncViewPopupTimer();
        }
    };

    const showLocalTimeOnHover = (selector) => {
        if (isJPClient()) return;
        document.querySelectorAll(selector || '.date').forEach((el) => {
            const gmt_time_str = el.textContent.replace('\n', ' ');
            const local_time   = moment.utc(gmt_time_str, 'YYYY-MM-DD HH:mm:ss').local();
            if (local_time.isValid()) {
                el.setAttribute('data-balloon', local_time.format('YYYY-MM-DD HH:mm:ss Z'));
            }
        });
    };

    const toJapanTimeIfNeeded = (gmt_time_str, show_time_zone, hide_seconds) => {
        let time;

        if (typeof gmt_time_str === 'number') {
            time = moment.utc(gmt_time_str * 1000);
        } else if (gmt_time_str) {
            time = moment.utc(gmt_time_str, 'YYYY-MM-DD HH:mm:ss');
        }

        if (!time || !time.isValid()) {
            return null;
        }

        let offset    = '+00:00';
        let time_zone = 'Z';
        if (isJPClient()) {
            offset    = '+09:00';
            time_zone = 'zZ';
        }

        return time.utcOffset(offset).format(`YYYY-MM-DD HH:mm${hide_seconds ? '' : ':ss'}${show_time_zone ? ` ${time_zone}` : ''}`);
    };

    return {
        startClock,
        showLocalTimeOnHover,
        toJapanTimeIfNeeded,

        setViewPopupTimer: (func) => { fncViewPopupTimer = func; },
    };
})();

module.exports = Clock;
