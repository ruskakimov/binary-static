import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from './components/menu_list.jsx';

import data from './settings_data';

const Settings = ({ match }) => {
    const all_items = data.reduce((all, section) => [...all, ...section.items], []);

    const getAbsolutePath = (path) => {
        const base = match.url[match.url.length - 1] === '/'
            ? match.url.slice(0, -1)
            : match.url;
        return `${base}${path}`;
    }

    return (
        <div className='settings'>
            <div className='settings__sidebar'>
                {
                    data.map(section => {
                        return (
                            <div key={section.title}>
                                <div className='menuitem_header__container1'>{section.title}</div>
                                <hr className='menuitem_header__hr'/>
                                <MenuList items={section.items} getAbsolutePath={getAbsolutePath} />
                            </div>
                        );
                    })
                }
            </div>
            <div className='settings__content'>
                <Switch>
                    {
                        all_items.map(({ path, Component, title, content }, i) => (
                            <Route
                                key={i}
                                path={getAbsolutePath(path)}
                                render={() => <Component title={title} content={content} />}
                            />
                        ))
                    }
                    <Redirect from={match.url} to={getAbsolutePath(all_items[0].path)} />
                </Switch>
            </div>
        </div>
    );
}

Settings.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};

export default Settings;
