import SubscriptionManager from './subscription_manager';
import BinarySocket        from '../../_common/base/socket_base';
import { isEmptyObject }   from '../../_common/utility';

const WS = (() => {
    const activeSymbols = () =>
        BinarySocket.send({ active_symbols: 'brief' });

    const buy = (proposal_id, price) =>
        BinarySocket.send({ buy: proposal_id, price });

    const contractsFor = (symbol) =>
        BinarySocket.send({ contracts_for: symbol });

    const getAccountStatus = () =>
        BinarySocket.send({ get_account_status: 1 });

    const getSelfExclusion = () =>
        BinarySocket.send({ get_self_exclusion: 1 });

    const getSettings = () =>
        BinarySocket.send({ get_settings: 1 });

    const landingCompany = (residence) =>
        BinarySocket.send({ landing_company: residence });

    const logout = () =>
        BinarySocket.send({ logout: 1 });

    // TODO: rename to stay consistent
    const getFinancialAssessment = () =>
        BinarySocket.send({ get_financial_assessment: 1});

    const getLoginHistory = (limit) =>
        BinarySocket.send({ login_history: 1, limit });

    // TODO: can we return a promise instead, like in others
    const sendCashierPassword = async (cashier_pw, callback, errorCallback) => {
        const response = await BinarySocket.send({
            cashier_password: 1, lock_password   : cashier_pw,
        });
        if (!response.error) {
            callback();
        } else {
            errorCallback(response.error.message);
        }
    };

    const setSelfExclusion = async(data, callback, errorCallback) => {
        data.set_self_exclusion = 1;
        const response = await BinarySocket.send(data);
        if (!response.error) {
            callback();
        } else {
            errorCallback(response.error.message);
        }
    };

    const mt5LoginList = () =>
        BinarySocket.send({ mt5_login_list: 1 });

    const oauthApps = () =>
        BinarySocket.send({ oauth_apps: 1 });

    const payoutCurrencies = () =>
        BinarySocket.send({ payout_currencies: 1 });

    const portfolio = () =>
        BinarySocket.send({ portfolio: 1 });

    const sellExpired = () =>
        BinarySocket.send({ sell_expired: 1 });

    const sendRequest = (request_object) =>
        Promise.resolve(!isEmptyObject(request_object) ? BinarySocket.send(request_object) : {});

    const statement = (limit, offset, date_boundaries) =>
        BinarySocket.send({ statement: 1, description: 1, limit, offset, ...date_boundaries });

    // ----- Streaming calls -----
    const forget = (msg_type, cb, match_values) =>
        SubscriptionManager.forget(msg_type, cb, match_values);

    const forgetAll = (...msg_types) =>
        SubscriptionManager.forgetAll(...msg_types);

    const subscribeBalance = (cb) =>
        SubscriptionManager.subscribe('balance', { balance: 1, subscribe: 1 }, cb);

    const subscribeProposal = (req, cb, should_forget_first) =>
        SubscriptionManager.subscribe('proposal', req, cb, should_forget_first);

    const subscribeProposalOpenContract = (cb, should_forget_first) =>
        SubscriptionManager.subscribe('proposal_open_contract', { proposal_open_contract: 1, subscribe: 1 }, cb, should_forget_first);

    const subscribeTicks = (symbol, cb, should_forget_first) =>
        SubscriptionManager.subscribe('ticks', { ticks: symbol, subscribe: 1 }, cb, should_forget_first);

    const subscribeTicksHistory = (request_object, cb, should_forget_first) =>
        SubscriptionManager.subscribe('ticks_history', request_object, cb, should_forget_first);

    const subscribeTransaction = (cb, should_forget_first) =>
        SubscriptionManager.subscribe('transaction', { transaction: 1, subscribe: 1 }, cb, should_forget_first);

    const subscribeWebsiteStatus = (cb) =>
        SubscriptionManager.subscribe('website_status', { website_status: 1, subscribe: 1 }, cb);

    return {
        activeSymbols,
        buy,
        contractsFor,
        getAccountStatus,
        getFinancialAssessment,
        getLoginHistory,
        getSelfExclusion,
        getSettings,
        landingCompany,
        logout,
        mt5LoginList,
        oauthApps,
        payoutCurrencies,
        portfolio,
        sellExpired,
        sendCashierPassword,
        sendRequest,
        setSelfExclusion,
        statement,

        // streams
        forget,
        forgetAll,
        subscribeBalance,
        subscribeProposal,
        subscribeProposalOpenContract,
        subscribeTicks,
        subscribeTicksHistory,
        subscribeTransaction,
        subscribeWebsiteStatus,
    };
})();

export default WS;
