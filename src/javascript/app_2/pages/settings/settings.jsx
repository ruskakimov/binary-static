import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from './components/menu_list.jsx';
import { settings_menu_data } from './settings_menu_data';

const Settings = ({match, routes}) => {
    return (
        <div className='settings'>
            <div className='settings__sidebar'>
                <MenuList sections={routes} match={match} data={settings_menu_data}/>
            </div>
            <div className='settings__content'>
                {
                    routes.map((section, i) =>  (
                            <Route
                                key={i}
                                path={match.url + section.path}
                                render={section.render.data}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

Settings.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};

export default Settings;
