import { observable } from 'mobx';
import LoginHistoryModel from './sections/login_history_model';
import SelfExclusionModel from './sections/self_exclusion_model';

export default class SettingsModel {
    constructor() {
        this.login_history = new LoginHistoryModel();
        this.self_exclusion = new SelfExclusionModel();
    }
}
