import { observable } from 'mobx';
import moment         from 'moment';

import SettingsModel from './models/settings/settings_model';

export default class MainStore {
    @observable server_time = moment.utc();

    constructor() {
        this.settings = new SettingsModel();
    }
};
