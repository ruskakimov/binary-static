import { observable, action } from 'mobx';
import DAO from '../../../../data/dao';

export default class SelfExclusionModel {
    @observable is_loading = true;

    @observable data = {
        max_balance           : '',
        max_turnover          : '',
        max_losses            : '',
        max_7day_turnover     : '',
        max_7day_losses       : '',
        max_30day_turnover    : '',
        max_30day_losses      : '',
        max_open_bets         : '',
        session_duration_limit: '',
        timeout_until         : '',
        exclude_until         : '',
    }

    @action.bound
    async getSelfExclusion() {
        const { get_self_exclusion } = await DAO.getSelfExclusion();
        if ( get_self_exclusion ) {
            Object.entries(this.data).forEach(
                ([k,v]) =>
                    this.data[k] = get_self_exclusion[k] ?
                    get_self_exclusion[k] :
                    v);
            this.is_loading = false;
        } else {
            // To-Do: Show the error page.
            console.log('You must login to see this page');
        }
    }

    @action.bound
    handleSubmit = (e) => {
        e.preventDefault();
        DAO.setSelfExclusion(
            this.data,
            ()=> {
                // To-Do: Show Success page.
                console.log('successfully self-excluted!');
            },
            (message) => {
                // To-Do: Show the error page.
                // To-DO: Validation: timeout_until.
                console.log(message);
            },
        );
    }

    @action.bound
    onChange = (e) => {
        const { name, value } = e.target;
        this.data[name] = value;
    }
}
