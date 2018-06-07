import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sections } from './routes';

const Settings = ({ match }) => (
    <div className='settings container'>
        <div className='settings__sidebar'>
            <ul>
            {
                sections.map((section, i) => (
                    <li className='settings__listlink' key={i}>
                        <NavLink
                            to={match.url + section.path}
                        >
                            {section.title}
                        </NavLink>
                    </li>
                ))
            }
            </ul>
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
    match: PropTypes.object,
}

export default Settings;
