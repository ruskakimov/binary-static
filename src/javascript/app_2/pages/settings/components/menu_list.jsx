import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';

const MenuList = ({sections, match}) => (
    <div>
        {
            sections.map((section, i) => (
                <MenuItem key={i} section={section} match={match}/>
            ))
        }
    </div>
);

MenuList.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};

export default MenuList;
