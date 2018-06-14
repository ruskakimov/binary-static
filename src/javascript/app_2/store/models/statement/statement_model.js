import { observable, action }     from 'mobx';
import moment                     from 'moment';
import DAO                        from '../../../data/dao';
import { formatMoney }            from '../../../../_common/base/currency_base';
import Client                     from '../../../../_common/base/client_base';
import { localize }               from '../../../../_common/localize';
import { toTitleCase }            from '../../../../_common/string_util';

const batch_size = 100; // request response limit

export default class LoginHistoryModel {
    @observable data            = [];
    @observable pending_request = false;
    @observable has_loaded_all  = false;
    @observable date_from       = '';
    @observable date_to         = '';

    @action.bound
    clearTable() {
        this.data            = [];
        this.has_loaded_all  = false;
        this.pending_request = false;
    }

    @action.bound
    fetchNextBatch() {
        if (this.has_loaded_all || this.pending_request) return;

        this.pending_request = true;

        const currency = Client.get('currency');

        DAO.getStatement(
            batch_size,
            this.data.length,
            {
                ...this.date_from && {date_from: moment(this.date_from).unix()},
                ...this.date_to   && {date_to: moment(this.date_to).add(1, 'd').subtract(1, 's').unix()},
            }
        ).then((response) => {
            const formatted_transactions = response.statement.transactions
                .map(transaction => getStatementData(transaction, currency));

            this.data = [...this.data, ...formatted_transactions];
            this.has_loaded_all = formatted_transactions.length < batch_size;
            this.pending_request = false;
        });
    }

    @action.bound
    handleDateChange(e) {
        if (e.target.value !== this[e.target.name]) {
            this[e.target.name] = e.target.value;
            this.clearTable();
            this.fetchNextBatch();
        }
    }
}

/*
    RESPONSE PARSING FUNCTION
*/
const getStatementData = (statement, currency) => {
    const date_obj   = new Date(statement.transaction_time * 1000);
    const moment_obj = moment.utc(date_obj);
    const date_str   = moment_obj.format('YYYY-MM-DD');
    const time_str   = `${moment_obj.format('HH:mm:ss')} GMT`;
    const payout     = parseFloat(statement.payout);
    const amount     = parseFloat(statement.amount);
    const balance    = parseFloat(statement.balance_after);
    const should_exclude_currency = true;

    return {
        action : localize(toTitleCase(statement.action_type)),
        date   : `${date_str}\n${time_str}`,
        refid  : statement.transaction_id,
        payout : isNaN(payout)  ? '-' : formatMoney(currency, payout,  should_exclude_currency),
        amount : isNaN(amount)  ? '-' : formatMoney(currency, amount,  should_exclude_currency),
        balance: isNaN(balance) ? '-' : formatMoney(currency, balance, should_exclude_currency),
        desc   : localize(statement.longcode.replace(/\n/g, '<br />')),
        id     : statement.contract_id,
        app_id : statement.app_id,
    };
};
