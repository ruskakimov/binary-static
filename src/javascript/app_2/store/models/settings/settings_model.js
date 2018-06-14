import { observable } from 'mobx';
import LoginHistoryModel from './sections/login_history_model';
import SelfExclusionModel from './sections/self_exclusion_model';
import FinancialAssessmentModel from './sections/financial_assessment_model';
import CashierPasswordModel from './sections/cashier_password_model';
import AccountPasswordModel from './sections/account_password_model';

export default class SettingsModel {
    constructor() {
        this.login_history = new LoginHistoryModel();
        this.self_exclusion = new SelfExclusionModel();
        this.financial_assessment = new FinancialAssessmentModel();
        this.cashier_password = new CashierPasswordModel();
        this.account_password = new AccountPasswordModel();
    }
}
