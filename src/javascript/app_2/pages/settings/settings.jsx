import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

import PersonalDetails from './sections/PersonalDetails.jsx';

const sections = [
    {
        title: 'Personal Details',
        component: PersonalDetails,
        path: '/personal'
    }
];

const Settings = ({ match }) => (
    <div className='settings container'>
        <div className='settings__sidebar'>
            {
                sections.map((section, i) => (
                    <NavLink
                        key={i}
                        to={match.url + section.path}
                    >
                        {section.title}
                    </NavLink>
                ))
            }
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

export default Settings;
