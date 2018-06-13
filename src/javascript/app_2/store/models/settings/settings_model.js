import { observable } from 'mobx';
import LoginHistoryModel from './sections/login_history_model';

export default class SettingsModel {
    constructor() {
        this.login_history = new LoginHistoryModel();
    }
}