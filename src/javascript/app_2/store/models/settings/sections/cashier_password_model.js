import { observable, action } from 'mobx';
import DAO from '../../../../data/dao';

export default class CashierPasswordModel {
    @observable data = {
        cashier_pw         : '',
        verified_cashier_pw: '',
    }

    @action.bound
    handleSubmit = (e) => {
        e.preventDefault();
        DAO.sendCashierPassword(
            this.cashier_pw,
            () => {
                // To-Do: Render Success Msg
                console.log('Success!')
            },
            (error) => {
                // To-Do: Render Error Msg
                console.log(error)
            },
        );
    }

    @action.bound
    onChange = (e) => {
        const { name, value } = e.target;
        this.data[name] = value;
    }
}
