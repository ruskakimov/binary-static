import { observable } from 'mobx';
import moment         from 'moment';

import SettingsModel from './models/settings/settings_model';
import StatementModel from './models/statement/statement_model';

export default class MainStore {
    @observable server_time = moment.utc();

    constructor() {
        this.settings = new SettingsModel();
        this.statement = new StatementModel();
    }
};
