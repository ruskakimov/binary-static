import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';
import { settings_menu } from '../settings_menu_data';


const MenuList = ({routes, match, title}) => {
    return (
        <div>
            {
                routes.map((route, i) => (
                    <MenuItem key={i} index={i} route={route} match={match} data={settings_menu[i]}/>
                ))
            }
        </div>

    );
}


MenuList.propTypes = {
    match : PropTypes.object,
    routes: PropTypes.array,
};

export default MenuList;
