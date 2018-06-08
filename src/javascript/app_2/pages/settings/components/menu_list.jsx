import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';

const MenuList = ({sections, match, title, data}) => {
    return (
        <div>
            {
                sections.map((section, i) => (
                    <MenuItem key={i} index={i} section={section} match={match} title={title} data={data}/>
                ))
            }
        </div>

    );
}


MenuList.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};

export default MenuList;
