import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';

const MenuList = ({ items, getAbsolutePath }) => {
    return (
        <div>
            {
                items.map(({ title, content, img_src, path }, i) => (
                    <MenuItem
                        key={i}
                        title={title}
                        content={content}
                        img_src={img_src}
                        path={getAbsolutePath(path)}
                    />
                ))
            }
        </div>

    );
}


MenuList.propTypes = {
};

export default MenuList;
