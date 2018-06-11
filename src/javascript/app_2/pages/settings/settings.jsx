import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from './components/menu_list.jsx';

const Settings = ({match, routes}) => {
    return (
        <div className='settings'>
            <div className='settings__sidebar'>
                <MenuList routes={routes} match={match}/>
            </div>
            <div className='settings__content'>
                {
                    routes.map((route, i) =>  (
                            <Route
                                key={i}
                                path={match.url + route.path}
                                component={route.component}
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
