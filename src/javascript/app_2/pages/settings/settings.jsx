import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from './components/menu_list.jsx';

const Settings = ({match, sections}) => (
    <div className='settings container'>
        <div className='settings__sidebar'>
            <MenuList sections={sections} match={match}/>
        </div>
        <div className='settings__content'>
            {
                sections.map((section, i) => (
                    <Route
                        key={i}
                        path={match.url + section.path}
                        component={section.component}
                    />
                ))
            }
        </div>
    </div>
);

Settings.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};

export default Settings;
