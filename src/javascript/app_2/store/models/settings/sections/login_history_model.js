import { observable, action } from 'mobx';
import DAO from '../../../../data/dao';

export default class LoginHistoryModel {
    @observable data       = null;
    @observable limit      = 50;
    @observable is_loading = false;

    @action.bound
    getData() {
        this.is_loading = true;

        DAO.getLoginHistory(this.limit).then(response => {
            this.data = response;
            console.log(this.data);
            this.is_loading = false;
        });
    }
}